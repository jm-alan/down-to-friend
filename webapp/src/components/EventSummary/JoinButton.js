import { useEffect } from 'react';

export default function JoinButton ({ state, setState }) {
  useEffect(() => {
    if (state === 1) {
      setTimeout(() => {
        setState(2);
      }, 1000);
    }
  }, [state, setState]);

  switch (state) {
    case 0:
      return (
        <>
          <i className='fas fa-plus' />
          <span className='join-text'>
            Join
          </span>
        </>
      );
    case 1:
      return (
        <>
          <i className='fas fa-check' />
          <span className='join-text'>
            Joined!
          </span>
        </>
      );
    case 2:
      return (
        <>
          <i className='fas fa-times' />
          <span className='join-text'>
            Leave
          </span>
        </>
      );
    case 3:
      return (
        <>
          <i className='fas fa-circle' />
          <span className='join-text'>
            Full
          </span>
        </>
      );
    default:
      return null;
  }
}
