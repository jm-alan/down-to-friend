module.exports = (io, socket, Notification, Conversation, roomMap, liveUsers, user) => (conversationId, content) => {
  (async () => {
    const { id: userId } = user;
    const newMessage = await user.createSentMessage({
      conversationId,
      content
    });
    socket.to(conversationId).emit(`convo-${conversationId}`, newMessage.content, user);
    const convo = await Conversation.findByPk(conversationId);
    const users = convo.getChattingUsers();
    const toNotify = [];
    await Notification.destroy({
      where: {
        conversationId
      }
    });
    users.forEach(chattingUser => {
      if (
        roomMap[convo.id] &&
        !roomMap[convo.id].has(chattingUser.id) &&
        chattingUser.id !== userId
      ) {
        toNotify.push(chattingUser.id);
        chattingUser.createNotification({ conversationId });
      }
    });
    toNotify.forEach(userId => {
      if (liveUsers.has(userId)) {
        io
          .to(`notif-${userId}`)
          .emit('chat', { sender: user.firstName, content, conversationId });
      }
    });
  })();
};
