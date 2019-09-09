import React, { useState, useEffect } from 'react';
import { listenForAuthChange } from '../services/firebase-auth';

export const Context = React.createContext();

function MyProvider(props) {
  const [user, handleUser] = useState();
  const [isUserChecked, handleIsUserChecked] = useState(false);

  useEffect(() => {
    listenForAuthChange(user => {
      user ? handleUser({ uid: user.uid, email: user.uid }) : handleUser('');
      handleIsUserChecked(true);
    });
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        handleUser,
        isUserChecked
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default MyProvider;
