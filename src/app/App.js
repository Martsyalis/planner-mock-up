import React from 'react';
import MyProvider from './MyProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import Navbar from '../navbar/Navbar';
import registerServiceWorker from './registerServiceWorker';
import { Notification } from '../commonComponents/commonComponents';
import './App.css';

function App() {
  return (
    <Router>
      <MyProvider>
        <Navbar />
        <Notification
          timeout={10000}
          text="This expirience has been designed for Mobile View, Desktop compatability us comming"
          type="desktop-only is-warning"
        />
        <Routes />
      </MyProvider>
    </Router>
  );
}
registerServiceWorker();
export default App;
