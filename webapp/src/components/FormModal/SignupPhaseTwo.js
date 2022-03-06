import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { SetPhase } from '../../store/modal';
import { SetProfilePhoto } from '../../store/user';

export default function SignupPhaseTwo () {
  const dispatch = useDispatch();

  const fileInputRef = useRef(null);

  const [image, setImage] = useState(null);

  const uploadAvatar = () => {
    dispatch(SetProfilePhoto(image))
      .then(({ success, reason }) => {
        if (success) return dispatch(SetPhase(3));
        return console.error(reason);
      });
  };

  return (
    <div className='form-container signup2'>
      <h1>Upload a profile photo</h1>
      <div className='form-button-container'>
        {image && (
          <div className='avatar-preview-container'>
            <img
              className='avatar-preview'
              src={URL.createObjectURL(image)}
              alt=''
            />
          </div>
        )}
        <button
          className='avatar-upload'
          onClick={() => {
            fileInputRef.current.click();
          }}
        >
          Choose file
        </button>
        <input
          ref={fileInputRef}
          className='avatar-upload'
          type='file'
          style={{ display: 'none' }}
          onChange={({ target: { files: [file] } }) => file && setImage(file)}
        />
        {(
          image && (
            <button
              className='avatar-upload confirm'
              onClick={uploadAvatar}
            >
              Next <i className='fas fa-chevron-right nextarrow' />
            </button>
          )
        ) || (
          <button
            className='avatar-upload skip'
            onClick={() => dispatch(SetPhase(3))}
          >
            Skip <i className='fas fa-chevron-right nextarrow' />
          </button>
        )}
      </div>
    </div>
  );
}
