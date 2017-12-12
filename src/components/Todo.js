import React from 'react'
import PropTypes from 'prop-types'
import { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

const Todo = ({ classes, onClick, completed, text }) => (
  <ListItem
    key={text}
    dense
    button
    onClick={onClick}
    divider={true}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    <Checkbox
      checked={completed}
      tabIndex={-1}
      disableRipple
    />
    <ListItemText primary={text} />
  </ListItem>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo
