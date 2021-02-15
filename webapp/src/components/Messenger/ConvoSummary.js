export default function ConvoSummary ({ convo, remainingUsers, onSelectConvo, unread }) {
  return (
    <div
      className={`convo-summary-container${
        unread
          ? ' unread'
          : ''
      }`}
      onClick={onSelectConvo}
    >
      {convo.name ||
      remainingUsers.map(({ firstName }, idx) => (
        <span
          key={idx}
          className={`chatting-user-name ${
            idx === remainingUsers.length - 1
              ? 'last'
              : ''
          }`}
        >
          {firstName}
        </span>
      ))}
    </div>
  );
}
