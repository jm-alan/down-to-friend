import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AddedPeople from './AddedPeople';
import NewChatForm from './NewChatForm';
import { EnumerateChatEvents, HideNewChat } from '../../store/newchat';

export default function NewChatModal () {
  const dispatch = useDispatch();
  const [addedPeople, addPeople] = useState([]);

  const onClose = () => {
    dispatch(HideNewChat());
  };

  useEffect(() => {
    dispatch(EnumerateChatEvents());
  }, [dispatch]);

  return (
    <div id='modal'>
      <div
        id='modal-background'
        onClick={onClose}
      />
      <div id='modal-content'>
        <div className='form-container newchat'>
          <h1>Start a Chat</h1>
          <NewChatForm
            addPeople={addPeople}
            addedPeople={addedPeople}
          />
          <AddedPeople
            people={addedPeople}
          />
        </div>
      </div>
    </div>
  );
}
