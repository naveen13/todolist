import io from "socket.io-client";
import * as actions from './index'

describe('todo actions', () => {
  const socket = actions.getSocket();
  const items = [
    {
      text: 'Run the tests',
      completed: false,
      id: 0
    }, {
      text: 'Use Redux',
      completed: false,
      id: 1
    }
  ];

  it('test ADD and UPDATE list', (done) => {
    actions.init()(function(action){
      switch(action.type) {
        case 'INIT_TODO':
          expect(action.payload).toEqual([]); break;
        case 'ADD_TODO':
          expect(action.payload).toEqual(items[0]); break;
        case 'TOGGLE_TODO':
          expect(action.payload).toEqual({...items[0], completed: !items[0].completed}); break;
        default: break;
      }
    })

    actions.addTodo(items[0].text);
    actions.toggleTodo(items[0]);
    setTimeout(() => {
      done();
    }, 100);
  });

  it('setVisibilityFilter should create SET_VISIBILITY_FILTER action', () => {
    expect(actions.setVisibilityFilter('active')).toEqual({
      type: 'SET_VISIBILITY_FILTER',
      filter: 'active'
    })
  })
});
