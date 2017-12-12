import io from "socket.io-client";
import { port } from 'config.js';

let socket;

const initSocket = () => {
  if(!socket) socket = io.connect(`http://localhost:${port}`);
}

export const getSocket = () => {
  if(!socket) socket = io.connect(`http://localhost:${port}`);
  return socket;
}

export const init = () => {
  initSocket();

  return dispatch => {
    socket.on('initialList', res => {
      dispatch({type: 'INIT_TODO', payload: res});
    });

    socket.on('itemAdded', item => {
      dispatch({type: 'ADD_TODO', payload: item});
    });

    socket.on('toggleItem', item => {
      dispatch({type: 'TOGGLE_TODO', payload: item});
    });
  }
}

export const addTodo = (text) => {
  initSocket();
  return dispatch => {
    socket.emit('addItem', text);
  }
}

export const toggleTodo = (item) => {
  initSocket();
  return dispatch => {
    socket.emit('toggleItem', item);
  }
}

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
});
