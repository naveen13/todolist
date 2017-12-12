const todos = (state = [], action) => {
  switch (action.type) {
    case 'INIT_TODO':
      return action.payload;
    case 'ADD_TODO':
      let item = { ...action.payload, completed: action.payload.completed || false};
      return [ ...state, item ]
    case 'TOGGLE_TODO':
      return state.map(todo => (todo.id === action.payload.id) ? action.payload : todo)
    default:
      return state
  }
}

export default todos
