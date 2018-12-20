import React from 'react';
import Task from './task.component';
import TaskGroup from './taskGroup.component';

const groupView = 'group';
const todoView = 'todo';
const defaultMode = {
  view: todoView, // todo or group
  group: null
};
/**
 * Task list component that shows either a list of task groups or
 * the tasks in a group if drilled down.
**/
export default class TaskList extends React.Component {
  constructor() {
    super();
    this.state = {
      mode: defaultMode,
      tasks: [
        {
          id: 1,
          group: "Purchases",
          task: "Go to the bank",
          dependencyIds: [],
          completedAt: null,
        },
        {
          id: 2,
          group: "Purchases",
          task: "Buy hammer",
          dependencyIds: [1],
          completedAt: null,
        },
        {
          id: 3,
          group: "Purchases",
          task: "Buy wood",
          dependencyIds: [1],
          completedAt: null,
        },
        {
          id: 4,
          group: "Purchases",
          task: "Buy nails",
          dependencyIds: [1],
          completedAt: null,
        },
        {
          id: 5,
          group: "Purchases",
          task: "Buy paint",
          dependencyIds: [1],
          completedAt: null,
        },
        {
          id: 6,
          group: "Build Airplane",
          task: "Hammer nails into wood",
          dependencyIds: [2, 3, 4],
          completedAt: null,
        },
        {
          id: 7,
          group: "Build Airplane",
          task: "Paint wings",
          dependencyIds: [5, 6],
          completedAt: null,
        },
        {
          id: 8,
          group: "Build Airplane",
          task: "Have a snack",
          dependencyIds: [],
          completedAt: null,
        }
      ]
    };
  }

  /**
   * Updates state when a group is clicked
   * @param {string} groupName - the name of the group clicked
   * @return {void}
   */
  groupClickCallback(groupName) {
    this.setState({
      mode: {
        view: groupView,
        group: groupName
      },
      tasks: this.state.tasks
    });
  }

  /**
   * Function to reset to the main mode of showing all groups.
   * @return {void}
  **/
  switchToAllGroups() {
    this.setState({
      mode: defaultMode,
      tasks: this.state.tasks
    });
  }

  /**
   * Handles when a task is clicked for completion/incomplete
   * @param {object} task - the task to toggleTask
   * @return {void}
   */
  toggleTask(task) {}


  /**
   * Gets the data needed for the task groups from the top level tasks.
   *
   * @param {array} tasks - an array af all the tasks to parse
   * @return {array} an array of data for each group
  **/
  _getGroupData(tasks) {
    let groupData = [];
    tasks.forEach((task) => {
      let existingGroupSummary = groupData.filter(
        (groupData) => groupData.group === task.group)[0];
      if (existingGroupSummary) {
        this._updateGroupCompletion(existingGroupSummary, task);
      } else {
        let groupSummary = {
          group: task.group,
          totalTasks: 0,
          completedTasks: 0
        }
        groupData.push(groupSummary);
        this._updateGroupCompletion(groupSummary, task);
      }
    });
    return groupData;
  }

  /**
   * Helper function to update group with completion data for a task
   * @param {object} groupSummary - the current summary for the group
   *                                (will be mutated)
   * @param {task} task - the task to check for completion
   * @return {void}
   */
  _updateGroupCompletion(groupSummary, task) {
    groupSummary.totalTasks += 1;
    if (task.completedAt) {
      groupSummary.completedTasks += 1;
    }
  }

  /**
   * Renders the header for the passed in mode
   */
  _renderHeader(mode) {
    if (mode.view === groupView) {
      let callback = this.switchToAllGroups.bind(this);
      return <h1 className="todoHeader">
        {mode.group.group}
        <span className="allGroupsLink" onClick={callback}>
          All Groups
        </span>
      </h1>;
    } else {
      return <h1 className="todoHeader">Things To Do</h1>
    }
  }

  /**
   * Renders the body for the passed in mode and tasks.
  **/
  _renderBody(mode, tasks) {
    if (mode.view === groupView) {
      let group = mode.group.group;
      return this._renderTasksForGroup(tasks.filter(task =>  task.group === group));
    } else {
      return this._renderGroups(tasks);
    }
  }

/**
 * Renderer for when the user has clicked a group
 **/
  _renderTasksForGroup(tasks) {
    let toggleTask = this.toggleTask.bind(this);
    let elementMap = tasks.map((task, i) => {
      return <Task
          task={task}
          toggleCallback={toggleTask}
          key={i}>
      </Task>;
    });
    return elementMap;
  }

  /**
   * Renderer for showing the groups in the todo list
   */
  _renderGroups(tasks) {
    const callback = this.groupClickCallback.bind(this);
    let groupData = this._getGroupData(tasks);
    return groupData.map((groupSummary, i) => {
      return <TaskGroup
          groupSummary={groupSummary}
          groupClickCallback={callback}
          key={i}>
      </TaskGroup>;
    });
  }

  render() {
    return <section className="todoPanel">
      {this._renderHeader(this.state.mode)}
      <ul className="taskList">
        {this._renderBody(this.state.mode, this.state.tasks)}
      </ul>
    </section>;
  }
}
