import React, { useState } from 'react';
import { LogIn } from '../../store/session';
import { useDispatch } from 'react-redux';
import './LoginForm.css';

function LoginForm () {
  const dispatch = useDispatch();
  const [identification, setIdentification] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(LogIn(identification, password))
      .catch(res => setErrors(res.data?.errors || []));
  };

  const demoLogin = (e) => {
    e.preventDefault();
    dispatch(LogIn('demo@user.io', 'password'));
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Username or Email
          <input
            type='text'
            value={identification}
            onChange={({ target: { value } }) => setIdentification(value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type='password'
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
            required
          />
        </label>
        <button type='submit'>Log In</button>
        <button
          type='button'
          onClick={demoLogin}
        >
          Demo Log In
        </button>
      </form>
    </>
  );
}

export default LoginForm;
