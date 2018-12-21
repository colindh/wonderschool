import React from 'react';
import ReactDOM from 'react-dom';
import TaskList from './components/taskList.component';

window.addEventListener(
  'DOMContentLoaded',
  function() {
    ReactDOM.render(
      <TaskList></TaskList>,
      document.getElementById('app'));
  }
);
