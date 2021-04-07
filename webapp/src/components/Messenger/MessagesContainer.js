/* eslint-disable no-tabs */
import { useEffect, useRef } from 'react';

import Message from './Message';

export default function MessagesContainer ({ rollingMessages, showTyping }) {
  const messageContainer = useRef(null);

  const svgContents = `
  <svg id="typing_bubble" data-name="typing bubble" xmlns="http://www.w3.org/2000/svg" width="24" height="6" viewBox="0 0 24 6">
	<defs>
		<style>
			.dot {fill: rgba(0, 0, 0, .7); transform-origin: 50% 50%; animation: ball-beat 1.1s 0s infinite cubic-bezier(0.445, 0.050, 0.550, 0.950);}
			.dot:nth-child(2) {animation-delay: 0.3s !important;}
			.dot:nth-child(3) {animation-delay: 0.6s !important;}
			@keyframes ball-beat {
				0% 			{opacity: 0.7;}
				33.33% 	{opacity: 0.55;}
				66.67% 	{opacity: 0.4;}
				100% 		{opacity: 1;}
			}
		</style>
	</defs>
	<g>
		<circle class="dot" cx="3" cy="3" r="3" />
		<circle class="dot" cx="12" cy="3" r="3" />
		<circle class="dot" cx="21" cy="3" r="3" />
	</g>
</svg>
  `;

  useEffect(() => {
    if (messageContainer.current) {
      const scroll = messageContainer.current.scrollHeight - messageContainer.current.clientHeight;
      messageContainer.current.scrollTo(0, scroll);
    }
  });

  return (
    <>
      <div
        className='messages-container'
        ref={messageContainer}
      >
        {rollingMessages.map((msg, idx) => (
          <Message
            key={idx}
            msg={msg}
          />
        ))}
      </div>
      {showTyping
        ? (
          <div
            className='isTyping-container'
            dangerouslySetInnerHTML={{ __html: svgContents }}
            style={{
              left: messageContainer.current.getBoundingClientRect().x + 10
            }}
          />
          )
        : null}
    </>
  );
}
