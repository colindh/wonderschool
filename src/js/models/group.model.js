/**
 * Models data on groups of tasks
 */
export default class Group {
  // copy constructor
  constructor(data) {
    this.group = data.group;
    this.totalTasks = data.totalTasks;
    this.completedTasks = data.completedTasks;
  }

  /**
   * Helper function to update this group with completion data for a task
   * @param {task} task - the task to check for completion
   * @return {void}
   */
  updateCompletion(task) {
    this.totalTasks++;
    if (task.completedAt) {
      this.completedTasks++;
    }
  }

  /**
   * Calculates completion message for this group
   * @return {string} the task completion message
   */
  getStatusMessage() {
    return this.completedTasks +
        ' of ' +
        this.totalTasks +
        ' tasks complete';
  }
}
