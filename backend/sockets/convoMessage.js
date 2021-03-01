module.exports = (io, socket, Notification, roomMap, liveUsers, user, convo) => content => {
  const { id: conversationId } = convo;
  // assume all messages coming in from authenticated socket are
  // created by the user to whom that authentication belongs;
  // anything else would require cracking JWT secret which is
  // particularly unlikely.
  user.createSentMessage({ conversationId, content })
  // only emit new message event after message has been created
  // in database.
    .then(({ content }) => {
      socket.to(conversationId).emit(`convo-${conversationId}`, content, user);
    });
  convo.getChattingUsers()
    .then(users => {
      const toNotify = [];
      Notification.destroy({
        where: { conversationId }
      }).then(() => {
        users.forEach(chattingUser => {
          // If a user is not currently viewing a room, create a notif
          // in the database regardless of whether they're online.
          if (
            roomMap[conversationId] &&
              (!roomMap[conversationId].has(chattingUser.id))
          ) {
            toNotify.push(chattingUser.id);
            chattingUser.createNotification({ conversationId });
          }
        });
        toNotify.forEach(userId => {
          // If and only if a user is actively online, also emit a live
          // notification event letting them know they've received a
          // message.
          if (liveUsers.has(userId)) {
            io.to(`notif-${userId}`)
              .emit('chat', { sender: user.firstName, content, conversationId });
          }
        });
      });
    });
};
