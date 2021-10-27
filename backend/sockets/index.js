const io = require('socket.io')();

const { Conversation, Notification } = require('../db/models');
const { socketRequireAuth } = require('../utils/auth');
const convoLogicConstructor = require('./onConvo');
const quickReplyLogicConstructor = require('./quickReply');

const roomMap = {};
const liveUsers = new Set();

io.use(socketRequireAuth)
  .on('connection', (socket) => {
    // socketRequireAuth guarantees we will have both socket.user and
    // socket.handshake.query.type
    const {
      user, handshake: {
        query: {
          type
        }
      }
    } = socket;
    const { id: userId } = user;
    const onQuickReply = quickReplyLogicConstructor(io, socket, Notification, Conversation, roomMap, liveUsers, user);
    switch (type) {
      case 'chat':
        (async () => {
          // lookup all conversations in which socket.user is a participant
          const convos = await user.getChats();
          const onConvo = convoLogicConstructor(io, socket, Notification, roomMap, liveUsers, user, convos);
          // this will always be an array, just sometimes it will be empty.
          // This convoLogic function was abstracted to enable easily adding
          // new conversations
          convos.forEach(onConvo);
          socket.on('new', (convoId) => {
            (async () => {
              onConvo(await Conversation.findByPk(convoId, { include: ['ChattingUsers'] }));
            })();
          });
        })();
        break;
      case 'notif':
        // Manually emit handshake event so socket is not idle; vastly improves
        // socket connection reliability in cases where notifications are not
        // actively being emitted when a user logs in.
        io.to(socket.id).emit('handshake');
        // Wait for socket to confirm handshake before instantiating logic
        socket.on('handshake', () => {
          // Notification contains inline reply functionality
          socket.on('quickReply', onQuickReply);
          // Create a room just for this user's notifications to be received.
          socket.join(`notif-${userId}`);
          // Add the user to the running list of all connected users.
          liveUsers.add(userId);
        });
        // On disconnect, remove them from the runing list of connected users.
        // Keep this outisde the handshake logic to be 100% certain liveUsers
        // does not contain userIds that don't have notification sockets listening,
        // even if something goes wrong with the handshake process. Better safe than
        // sorry.
        socket.on('disconnect', () => {
          liveUsers.delete(userId);
        });
        break;
      default:
        // If a correct type is not supplied by the socket query, it is rogue;
        // force disconnect and close the underlying connection.
        return socket.disconnect(true);
    }
  });

module.exports = io;
