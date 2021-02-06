import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { SignUp } from '../../store/session';
import { ModalDisplay, ModalForm } from '../../store/modal';

function SignupFormPage () {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(SignUp({ email, username, password }))
        .then(dispatch(ModalDisplay(false)))
        .catch(res => {
          if (res.data && res.data.errors) setErrors(res.data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  const switchForm = () => {
    dispatch(ModalForm('login'));
  };

  return (
    <div className='form-container signup'>
      <h1>Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className='signup-form modal'
      >
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <input
          placeholder='username'
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          placeholder='email'
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder='password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          placeholder='confirm password'
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <div className='form-button-container'>
          <button
            type='submit'
            className='form-submit signup'
          >
            Sign Up
          </button>
          <label>
            {'Already have an account? '}
            <button
              type='button'
              onClick={switchForm}
            >
              Log In
            </button>
          </label>
        </div>
      </form>
    </div>
  );
}

export default SignupFormPage;
