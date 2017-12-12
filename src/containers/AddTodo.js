import React, {Component} from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';

import { init, addTodo } from 'actions';

class AddTodo extends Component {
  constructor(props){
    super(props);
    this.state = {
      item:''
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleChange = this._handleChange.bind(this);

    props.dispatch(init());
  }
  _handleSubmit(e) {
    e.preventDefault()
    if (!this.state.item.trim()) {
      return
    }
    this.props.dispatch(addTodo(this.state.item))

    this.setState({item: ''});
  }
  _handleChange(event) {
    this.setState({item: event.target.value})
  }
  render() {
    return (
      <div>
        <form onSubmit={this._handleSubmit}>
          <TextField
            value={this.state.item}
            onChange={this._handleChange.bind(this)}
            label="Whats need to be done?"
            fullWidth
            margin="normal"
          />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    categories: store.categories
  }
}

export default connect(mapStateToProps)(AddTodo);
