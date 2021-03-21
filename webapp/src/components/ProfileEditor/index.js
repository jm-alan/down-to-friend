import { useDispatch, useSelector } from 'react-redux';

import HotSwap from './HotSwap';
import { HideProfileEditor } from '../../store/profileEditor';
import { SetFirstName, SetEmail } from '../../store/user';

import './ProfileEditor.css';

export default function EditProfile () {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const display = useSelector(state => state.profileEditor.display);

  const onClose = () => {
    dispatch(HideProfileEditor());
  };

  return user && (
    display
      ? (
        <div id='modal-background'>
          <div
            id='modal'
            onClick={onClose}
          >
            <div
              className='profile-editor-modal-content-container'
              onClick={click => click.stopPropagation()}
            >
              <div className='profile-editor content-inner-container'>
                <div className='profile-editor inner-divider left'>
                  <div className='profile-editor avatar-container'>
                    {user.Avatar
                      ? <img src={user.Avatar.url} alt='' />
                      : <i className='profile-editor avatar-placeholder fas fa-user-alt' />}
                  </div>
                </div>
                <div className='profile-editor inner-divider right'>
                  <HotSwap
                    placeholder='Display Name'
                    label='Display Name:'
                    updater={SetFirstName}
                    original={user.firstName}
                  />
                  <HotSwap
                    placeholder='Email'
                    label='Email:'
                    updater={SetEmail}
                    original={user.email}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        )
      : null
  );
}
