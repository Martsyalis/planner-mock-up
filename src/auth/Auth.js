import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../app/MyProvider';
import { SignUp } from '../services/firebase-auth';

export default function Auth() {
  const [email, handleEmail] = useState('');
  const [password, handlePassword] = useState('');
  const {user, handleUser} = useContext(Context);

async function handleSubmit() {
    try{
        console.log('handle submit');
        const uid = await SignUp(email, password)
        handleUser(uid);
    }
    catch (err){
        console.log('error in handle submit is: ', err);
    }
   
  }
  return (
    <div className="box">
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
            <i className="fas fa-envelope"></i>
          </span>
          <span className="icon is-small is-right">
            <i className="fas fa-check"></i>
          </span>
        </p>
      </div>
      <div className="field">
        <p className="control has-icons-left">
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={event => handlePassword(event.target.value)}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-lock"></i>
          </span>
        </p>
      </div>
      <div className="field">
        <p className="control">
          <button
            className="button is-success"
            onClick={handleSubmit}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
