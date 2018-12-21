import React from 'react';

/**
 * Component to display a task.
 * Usage:
 *   <Task
 *     task={[task to display]}
 *     tasks={[list af all tasks to determine dependencies]}
 *     toggleCallback={[function to call on click]}>
 *   </Task>
 */
export default class Task extends React.Component {
  /**
   * Calculates the correct classes to add to task based on task state.
   * @param {object} task - the task to get the class names for
   * @return {string} the string of class names
   */
  getClassName(task) {
    let classes = 'taskDisplay';
    if (this.isLocked(task)) {
      return classes + ' locked';
    } else if (task.completedAt) {
      return classes + ' completed';
    } else {
      return classes + ' incomplete';
    }
  }

  /**
   * Calculates if a task is locked
   * @param {object} task - the task to check locked status on
   * @return {boolean} true if locked false if open for toggling
   */
  isLocked(task) {
    let tasks = this.props.tasks;
    let dependencies = task.dependencyIds;
    let isLocked = false;
    if (dependencies.length === 0) {
      return false;
    }
    dependencies.forEach((dependencyId) =>{
      let requiredTask = tasks.filter((task) => task.id === dependencyId)[0];
      if (!requiredTask.completedAt) {
        isLocked = true;
      }
    });
    return isLocked;
  }

  /**
   * Wrapper around callback to ensure locked tasks aren't toggled
   */
  toggleHandler() {
    let currentTask = this.props.task;
    if (!this.isLocked(currentTask))
    this.props.toggleCallback(currentTask);
  }

  render() {
    if (this.props) {
      let task = this.props.task;
      let callback = this.toggleHandler.bind(this);
      if (task && callback) {
        return <li
            className={this.getClassName(task)}
            onClick={callback}>
          <span className="taskName">{task.task}</span>
        </li>;
      }
    }
    return null;
  }
}
