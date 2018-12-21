import React from 'react';
import ReactDOM from 'react-dom';
import TaskList from './components/tasklist.component';

window.addEventListener(
  'DOMContentLoaded',
  function() {
    ReactDOM.render(
      <TaskList></TaskList>,
      document.getElementById('app'));
  }
);
