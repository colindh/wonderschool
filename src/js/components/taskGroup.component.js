import Group from '../models/group.model';
import React from 'react';

/**
 * Component to display a task group.
 * Usage:
 *   <TaskGroup
 *     groupSummary={[list af Group objects]}
 *     groupClickCallback={[function to call on click]}>
 *   </TaskGroup>
 */
export default class TaskGroup extends React.Component {
  /**
   * Wrapper around callback to allow binding of this
   */
  handleClick() {
    this.props.groupClickCallback(this.props.groupSummary.group);
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
            {groupSummary.getStatusMessage()}
          </div>
        </li>;
      }
    }
    return null;
  }
}
