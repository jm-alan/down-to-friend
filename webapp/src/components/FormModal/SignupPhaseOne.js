import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from './LoginForm';
import { SignUp } from '../../store/session';
import { SetPhase, SetCurrent } from '../../store/modal';

export default function SignupPhaseOne () {
  const dispatch = useDispatch();

  const phase = useSelector(state => state.modal.phase);

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(SignUp({ email, firstName, password }))
        .then(() => dispatch(SetPhase(2)))
        .catch(res => {
          if (res.data && res.data.errors) {
            const errors = res.data.errors.map(err => {
              return err.toString().match('email must be unique')
                ? 'Sorry, that email is already in use.'
                : err;
            });
            setErrors(errors);
          }
          dispatch(SetPhase(1));
        });
    }
    return setErrors(['Passwords do not match.']);
  };

  const switchForm = () => {
    dispatch(SetCurrent(LoginForm));
  };

  return phase === 1 && (
    <div className='form-container signup1'>
      <h1>Get With It</h1>
      <form
        onSubmit={handleSubmit}
        className='signup-form modal'
      >
        <ul className='errors'>
          {errors.map(error => <li key={error.toString()}>{error}</li>)}
        </ul>
        <input
          placeholder='first name'
          type='text'
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          required
        />
        <input
          placeholder='email'
          type='text'
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          placeholder='password'
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <input
          placeholder='confirm password'
          type='password'
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
        <div className='form-button-container'>
          <button
            type='submit'
            className='form-submit signup'
          >
            Next
            <i className='fas fa-chevron-right nextarrow' />
          </button>
          <button
            type='button'
            onClick={switchForm}
          >
            Already have an account?
          </button>
        </div>
      </form>
    </div>
  );
}
