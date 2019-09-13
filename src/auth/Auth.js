import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../app/MyProvider';
import { Notification } from '../commonComponents/commonComponents';
import { signUp, signIn } from '../services/firebase-auth';
import { FaEnvelope, FaLock } from 'react-icons/lib/fa';
import './Auth.css';

export default function Auth({ match, history }) {
  const isSignUp = match.url === '/sign-up';
  const [email, handleEmail] = useState('');
  const [password, handlePassword] = useState('');
  const [notificationText, setNotificationText] = useState('');
  const { user, handleUser } = useContext(Context);
  function handleSignUp(event) {
    event.preventDefault();
    signUp(email, password)
      .then(uid => {
        handleUser(uid);
        history.push('/');
      })
      .catch(err => {
        setNotificationText(err.message);
      });
  }

  function handleSignIn(event) {
    event.preventDefault();
    signIn(email, password)
      .then(uid => {
        handleUser(uid);
        history.push('/');
      })
      .catch(err => {
        setNotificationText(err.message);
      });
  }

  return (
    <React.Fragment>
      <form
        className="box auth-box"
        onSubmit={isSignUp ? handleSignUp : handleSignIn}
      >
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input
              className="input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={event => handleEmail(event.target.value)}
            />
            <span className="icon is-small is-left">
              <FaEnvelope className="fas" />
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input
              className="input"
              type="password"
              placeholder="Password"
              required
              minLength="6"
              value={password}
              onChange={event => handlePassword(event.target.value)}
            />
            <span className="icon is-small is-left">
              <FaLock className="fas" />
            </span>
          </p>
        </div>
        <div className="field">
          <button className="button is-success">
            {isSignUp ? 'Sign up' : 'Sign in'}
          </button>
        </div>
        {isSignUp ? (
          <p>
            Already have an accout?<Link to="./sign-in"> Sign in here</Link>
          </p>
        ) : (
          <p>
            Don't Have an account yet?
            <Link to="/sign-up"> Sign up here</Link>
          </p>
        )}
      </form>
      {notificationText && (
        <Notification
          timeout={5000}
          handleClose={() => setNotificationText('')}
          text={notificationText}
          type="is-danger"
        />
      )}
    </React.Fragment>
  );
}
