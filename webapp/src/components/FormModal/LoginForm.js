import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { LogIn } from '../../store/session';
import { ModalDisplay, ModalForm } from '../../store/modal';

function LoginForm () {
  const dispatch = useDispatch();
  const [identification, setIdentification] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(LogIn(identification, password))
      .then(() => dispatch(ModalDisplay(false)))
      .catch(res => setErrors(res.data?.errors || []));
  };

  const demoLogin = (e) => {
    e.preventDefault();
    dispatch(LogIn('demo@user.io', 'password'))
      .then(dispatch(ModalDisplay(false)));
  };

  const switchForm = () => {
    dispatch(ModalForm('signup'));
  };

  return (
    <div className='form-container login'>
      <h1>Log In</h1>
      <form
        className='login-form modal'
        onSubmit={handleSubmit}
      >
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <input
          placeholder='username'
          type='text'
          value={identification}
          onChange={({ target: { value } }) => setIdentification(value)}
          required
        />
        <input
          placeholder='password'
          type='password'
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
          required
        />
        <div className='form-button-container'>
          <button type='submit'>Log In</button>
          <button
            type='button'
            onClick={demoLogin}
          >
            Demo Log In
          </button>
          <button
            type='button'
            onClick={switchForm}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
