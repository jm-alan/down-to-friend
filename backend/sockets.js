const io = require('socket.io')();

const { socketRequireAuth } = require('./utils/auth');

const roomMap = {};
const liveUsers = new Set();

io.use(socketRequireAuth)
  .on('connection', (socket) => {
    const { user, handshake: { query: { type } } } = socket;
    switch (type) {
      case 'chat':
        user.getChats()
          .then(convos => {
            if (!convos.length) {
              socket.disconnect(true);
            }
            convos.forEach(convo => {
              if (!roomMap[convo.id]) roomMap[convo.id] = new Set();
              roomMap[convo.id].add(user.id);
              socket.join(convo.id);
              socket.on(`convo-${convo.id}`, (content) => {
                user.createSentMessage({
                  conversationId: convo.id,
                  content
                })
                  .then(({ content }) => {
                    socket.to(convo.id).emit(`convo-${convo.id}`, content, user);
                  });
              });
              convo.getChattingUsers()
                .then(users => {
                  const toNotify = [];
                  users.forEach(chattingUser => {
                    if (!roomMap[convo.id].has(chattingUser.id)) {
                      toNotify.push(chattingUser.id);
                      chattingUser.createNotification({
                        conversationId: convo.id
                      });
                    }
                  });
                  toNotify.forEach(userId => {
                    if (liveUsers.has(userId)) {
                      io.to(`notif-${userId}`).emit(`convo-notif-${convo.id}`);
                    }
                  });
                });
              socket.on('disconnect', () => {
                roomMap[convo.id].delete(user.id);
              });
            });
          });
        break;
      case 'notif':
        socket.join(`notif-${user.id}`);
        if (!liveUsers.has(user.id)) {
          liveUsers.add(user.id);
        }
        socket.on('disconnect', () => {
          liveUsers.delete(user.id);
        });
        break;
      default:
        return socket.disconnect(true);
    }
  });

module.exports = io;
