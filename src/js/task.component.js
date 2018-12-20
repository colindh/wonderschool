import React from 'react';

/**
 * Component to display a task.
 * Usage:
 *   <Task
 *     task={[task data]}
 *     toggleCallback={[function to call on click]}>
 *   </Task>
 */
export default class Task extends React.Component {
  toggleHandler() {
    this.props.toggleCallback(this.props.task);
  }

  render() {
    if (this.props) {
      let task = this.props.task;
      let callback = this.toggleHandler.bind(this);
      if (task && callback) {
        return <li
            className="taskDisplay"
            onClick={callback}>
          <span className="statusIcon"></span>
          <span className="taskName">{task.task}</span>
        </li>;
      }
    }
    return null;
  }
}
