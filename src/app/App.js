import React, { PureComponent } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import Navbar from '../navbar/Navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes />
      </div>
    </Router>
  );
}

export default App;
