import React, { useState, useEffect } from 'react';

export const Context = React.createContext();

function MyProvider(props) {
  const [user, handleUser] = useState({
    user: 'Maryus',
    budgetId: 'Yp8RFwZgIHrbRrHf0mIs'
  });

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
