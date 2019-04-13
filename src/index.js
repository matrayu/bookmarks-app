import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import { BrowserRouter as Router } from 'react-router-dom';
=======
import { BrowserRouter } from 'react-router-dom';
>>>>>>> context-startingpoint
import './index.css';
import App from './App';

ReactDOM.render(
<<<<<<< HEAD
    <Router>
        <App />
    </Router>, 
    document.getElementById('root')
=======
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
>>>>>>> context-startingpoint
);
