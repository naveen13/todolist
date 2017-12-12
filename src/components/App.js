import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

import Header from './Header'
import Footer from 'containers/Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    flex: 'initial',
    flexDirection: 'column',
    alignItems: 'center'
  },
  content: {
    minWidth: 300,
    width: 'calc(100% - 40px)',
    padding: 20
  }
};

const App = (props) => (
  <div className={props.classes.container}>
    <Header />
    <Paper elevation={4} className={props.classes.content}>
      <AddTodo />
      <VisibleTodoList />
      <Footer />
    </Paper>
  </div>
)

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
