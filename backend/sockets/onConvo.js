const viewingLogicConstructor = require('./viewing');
const onMessageLogicConstructor = require('./convoMessage');

module.exports = (io, socket, Notification, roomMap, liveUsers, user, convos) => convo => {
  const { id: conversationId } = convo;
  const { id: userId } = user;
  const viewing = viewingLogicConstructor(Notification, roomMap, convos, userId, conversationId);
  const onMessage = onMessageLogicConstructor(io, socket, Notification, roomMap, liveUsers, user, convo);
  // Join the socket room! Socket.IO will automatically create it
  // if it doesn't exist. Magic!
  socket.join(conversationId);
  // Frontend emits 'viewing-#' event when an individual
  // conversation is selected.
  socket.on(`viewing-${conversationId}`, viewing);
  // Frontend emits conversation-specific events on message
  socket.on(`convo-${conversationId}`, onMessage);
  // Frontend emits debounced 'isTyping' event from chat input onChange
  socket.on('isTyping', (conversationId) => {
    socket.to(conversationId).emit('isTyping');
  });
  // If a socket disconnects, it's physically impossible for that user
  // to be actively viewing the room; remove them from the viewing user
  // list.
  socket.on('disconnect', () => {
    roomMap[convo.id] && roomMap[convo.id].delete(userId);
  });
};
