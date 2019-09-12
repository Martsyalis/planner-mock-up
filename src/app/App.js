import React, { useState } from 'react';
import MyProvider from './MyProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import Navbar from '../navbar/Navbar';
import registerServiceWorker from './registerServiceWorker';
import { Notification } from '../commonComponents/commonComponents';
import './App.css';

function App() {
  const [showNotification, handleShowNotification] = useState(true);
  return (
    <Router>
      <MyProvider>
        <Navbar />
        {showNotification && (
          <Notification
            handleClose={() => handleShowNotification(false)}
            text="This expirience has been designed for Mobile View, Desktop compatability is comming"
            type="desktop-only is-warning"
          />
        )}
        <Routes />
      </MyProvider>
    </Router>
  );
}
registerServiceWorker();
export default App;
