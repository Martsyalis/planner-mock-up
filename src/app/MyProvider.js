import React, { useState, useEffect } from 'react';
import { listenForAuthChange } from '../services/firebase-auth';

export const Context = React.createContext();

function MyProvider(props) {
  const [user, handleUser] = useState('');
  useEffect(() => {
    listenForAuthChange(user => {
      user ? handleUser({ uid: user.uid, email: user.email }) : handleUser('');
    });
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        handleUser
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default MyProvider;
