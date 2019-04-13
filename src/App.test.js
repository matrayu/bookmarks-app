import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <App />
<<<<<<< HEAD
<<<<<<< HEAD
    </BrowserRouter>,
=======
    </BrowserRouter>, 
>>>>>>> b3878d5a0cf7b7277fa3cdf10e2af717380c1753
=======
    </BrowserRouter>,
>>>>>>> context-startingpoint
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
