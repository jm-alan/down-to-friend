import { useState } from 'react';
import { AiOutlineGithub, AiOutlineLinkedin, AiOutlineInfoCircle } from 'react-icons/ai';

export default function AboutMe () {
  const [display, setDisplay] = useState(false);

  return (
    <>
      <button
        id='about-me-display'
        onClick={() => setDisplay(true)}
      >
        <AiOutlineInfoCircle />
      </button>
      {display
        ? (
          <div
            id='modal-background'
          >
            <div
              id='modal'
              onClick={() => setDisplay(false)}
            >
              <div
                id='modal-content'
                className='about'
                onClick={click => click.stopPropagation()}
              >
                <div className='about-description-container'>
                  <h1>
                    Welcome to Down to Friend,
                    "the undo button for 2020."
                    Feel free to poke around,
                    find some fun events to join,
                    find some great people to hang out with,
                    and find the next member of your dev team below.
                  </h1>
                </div>
                <div className='about-links-container'>
                  <div className='about-icon-container linkedin'>
                    <a
                      href='https://www.linkedin.com/in/j-alan'
                      target='_blank'
                      rel='noreferrer'
                    >
                      <AiOutlineLinkedin />
                    </a>
                  </div>
                  <div className='about-icon-container github'>
                    <a
                      href='https://github.com/jm-alan/down-to-friend'
                      target='_blank'
                      rel='noreferrer'
                    >
                      <AiOutlineGithub />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )
        : null}
    </>
  );
}
