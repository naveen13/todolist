import React, { Component } from 'react'
import { connect } from 'react-redux'

import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import CounterIcon from 'material-ui-icons/FormatListNumbered';
import DoneAllIcon from 'material-ui-icons/DoneAll';
import ActiveIcon from 'material-ui-icons/CropSquare';
import CheckCircleIcon from 'material-ui-icons/Check';

import { setVisibilityFilter } from 'actions';

class Footer extends Component{
  render() {
    const { onClick, visibilityFilter, todos } = this.props;

    // let countAll = 0;
    let countLeft = 0;
    if(Array.isArray(todos)) {
      // countAll = todos.length;
      countLeft = todos.reduce((a, b) => !b.completed ? a + 1 : a, 0);
    }

    const filters = {
      'SHOW_ALL': 1,
      'SHOW_ACTIVE': 2,
      'SHOW_COMPLETED': 3,
    };

    return (
      <BottomNavigation
        value={filters[visibilityFilter] || 1}
        onChange={this.handleChange}
        showLabels
      >
        <BottomNavigationButton label={`${countLeft} Items Left`} disabled icon={<CounterIcon />} />
        <BottomNavigationButton onClick={() => onClick('SHOW_ALL')} label="All" icon={<DoneAllIcon />} />
        <BottomNavigationButton onClick={() => onClick('SHOW_ACTIVE')} label="Active" icon={<ActiveIcon />} />
        <BottomNavigationButton onClick={() => onClick('SHOW_COMPLETED')} label="Completed" icon={<CheckCircleIcon />} />
      </BottomNavigation>
    )
  }
}

const mapStateToProps = (store) => ({
  visibilityFilter: store.visibilityFilter,
  todos: store.todos
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: (filter) => {
    dispatch(setVisibilityFilter(filter))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
