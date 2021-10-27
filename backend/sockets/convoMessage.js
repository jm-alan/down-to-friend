module.exports = (io, socket, Notification, roomMap, liveUsers, user, convo) => content => {
  (async () => {
    const { id: conversationId } = convo;
    // assume all messages coming in from authenticated socket are
    // created by the user to whom that authentication belongs;
    // anything else would require cracking JWT secret which is
    // particularly unlikely.
    const newMessage = await user.createSentMessage({ conversationId, content });
    socket.to(conversationId).emit(`convo-${conversationId}`, newMessage.content, user);
    const users = await convo.getChattingUsers();
    const toNotify = [];
    await Notification.destroy({
      where: { conversationId }
    });
    // If the roommap does not exist, then no users are viewing this
    // conversation, and we can simply notify every user.
    if (!roomMap[conversationId]) {
      toNotify.push(...users.map(({ id }) => id));
    } else {
      users.forEach(chattingUser => {
      // If a user is not currently viewing a room, create a notif
      // in the database regardless of whether they're online.
        if (!roomMap[conversationId].has(chattingUser.id)) {
          toNotify.push(chattingUser.id);
          chattingUser.createNotification({ conversationId });
        }
      });
    }
    toNotify.forEach(userId => {
      // If and only if a user is actively online, also emit a live
      // notification event letting them know they've received a
      // message.
      if (liveUsers.has(userId)) {
        io.to(`notif-${userId}`)
          .emit('chat', { sender: user.firstName, content, conversationId });
      }
    });
  })();
};
