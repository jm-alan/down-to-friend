module.exports = (Notification, roomMap, convos, userId, conversationId) => () => {
  // iterate over the previously enumerated conversations,
  // looking up their rooms in the room map and deleting this
  // user from their viewers, enabling this user to be notified
  // of new messages in that conversation.
  Notification.destroy({
    where: { userId, conversationId }
  });
  convos.forEach(({ id }) => {
    roomMap[id] && roomMap[id].delete(userId);
  });
  // if this room has never been viewed before (either it's a
  // new conversation, or the server has restarted since the last
  // time anyone viewed it), create a new room participant tracker
  roomMap[conversationId] ?? (roomMap[conversationId] = new Set());
  roomMap[conversationId].add(userId);
};
