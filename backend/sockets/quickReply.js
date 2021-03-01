module.exports = (io, socket, Notification, Conversation, roomMap, liveUsers, user) => (conversationId, content) => {
  const { id: userId } = user;
  user.createSentMessage({
    conversationId,
    content
  })
    .then(({ content }) => {
      socket.to(conversationId).emit(`convo-${conversationId}`, content, user);
    });
  Conversation.findByPk(conversationId)
    .then(convo => {
      const { id: conversationId } = convo;
      convo.getChattingUsers()
        .then(users => {
          const toNotify = [];
          Notification.destroy({
            where: {
              conversationId
            }
          }).then(() => {
            users.forEach(chattingUser => {
              if (
                roomMap[convo.id] &&
                (!roomMap[convo.id].has(chattingUser.id)) &&
                chattingUser.id !== userId
              ) {
                toNotify.push(chattingUser.id);
                chattingUser.createNotification({
                  conversationId
                });
              }
            });
            toNotify.forEach(userId => {
              if (liveUsers.has(userId)) {
                io.to(`notif-${userId}`).emit('chat', { sender: user.firstName, content, conversationId });
              }
            });
          });
        });
    });
};
