import React from 'react';
import ReactDOM from 'react-dom';
import PatchBookmark from './PatchBookmark';

it.skip('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PatchBookmark />, div);
  ReactDOM.unmountComponentAtNode(div);
});