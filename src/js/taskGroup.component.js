import React from 'react';

/**
 * Component to display a task group.
 * Usage:
 *   <TaskGroup
 *     groupSummary={[group summary data]}
 *     groupClickCallback={[function to call on click]}>
 *   </TaskGroup>
 */
export default class TaskGroup extends React.Component {
  getStatusMessage(groupSummary) {
    return groupSummary.completedTasks +
        ' of ' +
        groupSummary.totalTasks +
        ' tasks complete';
  }

  handleClick() {
    this.props.groupClickCallback(this.props.groupSummary);
  }

  render() {
    if (this.props) {
      let groupSummary = this.props.groupSummary;
      let callback = this.handleClick.bind(this);
      if (groupSummary && callback) {
        return <li
            className="groupDisplay"
            onClick={callback}>
          <div className="groupName">
            {groupSummary.group}
          </div>
          <div className="groupStatus">
            {this.getStatusMessage(groupSummary)}
          </div>
        </li>;
      }
    }
    return null;
  }
}
