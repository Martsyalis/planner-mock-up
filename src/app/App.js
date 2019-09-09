import React from 'react';
import MyProvider from './MyProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import Navbar from '../navbar/Navbar';
import registerServiceWorker from './registerServiceWorker';
import './App.css';

function App() {
  return (
    <Router>
      <MyProvider>
        <Navbar />
        <Routes />
      </MyProvider>
    </Router>
  );
}
registerServiceWorker();
export default App;
