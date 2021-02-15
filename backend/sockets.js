const io = require('socket.io')();

const db = require('./db/models');
const { socketRequireAuth } = require('./utils/auth');

const roomMap = {};
const liveUsers = new Set();

io.use(socketRequireAuth)
  .on('connection', socket => {
    const { user, handshake: { query: { type, conversation: conversationId } } } = socket;
    switch (type) {
      case 'chat':
        if (!conversationId) return socket.disconnect(true);
        db.Conversation.findByPk(conversationId)
          .then(convo => {
            if (!convo) throw new Error();
            return convo.hasChattingUser(user);
          })
          .then(authorized => {
            if (!authorized) throw new Error();
            else {
              const { user } = socket;
              socket.join(conversationId);
              if (!roomMap[conversationId]) {
                roomMap[conversationId] = new Set();
              }
              roomMap[conversationId].add(user.id);
              socket.on('message', content => {
                if (!content || !content.length) return;
                user.createSentMessage({
                  conversationId,
                  content
                })
                  .then(() => {
                    socket.to(conversationId).emit('message');
                    db.Conversation.findByPk(conversationId, {
                      include: ['ChattingUsers']
                    })
                      .then(convo => {
                        return convo.ChattingUsers.asyncForEach(async notifyingUser => {
                          if (!roomMap[conversationId].has(notifyingUser.id)) {
                            await notifyingUser.createNotification({ conversationId });
                            if (liveUsers.has(notifyingUser.id)) {
                              io.to(`notif-${notifyingUser.id}`).emit('notif', conversationId);
                            }
                          }
                        });
                      });
                    io.to(socket.id).emit('delivered');
                  });
              });
              socket.on('disconnect', () => {
                roomMap[conversationId].delete(user.id);
              });
            }
          })
          .catch(() => {
            socket.disconnect(true);
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
