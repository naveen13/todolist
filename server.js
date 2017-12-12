const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketServer = require('socket.io');
const LocalStorage = require('node-localstorage').LocalStorage;

const app = express();
const connections = [];
let localStorage;

app.use(bodyParser.urlencoded({extended:true}));
app.use('/', express.static('build'));
app.use(bodyParser.json())

let serve = http.createServer(app);
let io = socketServer(serve);


if (typeof localStorage === "undefined" || localStorage === null) {
  localStorage = new LocalStorage('./db');
}

io.on('connection', function (socket) {
  console.log("Connected to Socket!!"+ socket.id)
  connections.push(socket)
  socket.on('disconnect', function(){
    console.log('Disconnected - '+ socket.id);
  });

  let todolistdb = JSON.parse(localStorage.getItem('mylocaltodolist') || '[]');

  io.emit('initialList', todolistdb);

  socket.on('addItem', (text)=>{
    let item = {text, completed: false, id: todolistdb.length};
    console.log('addItem', item)
    todolistdb = [...todolistdb, item];

    localStorage.setItem('mylocaltodolist', JSON.stringify(todolistdb));
    io.emit('itemAdded',item);
  })

  socket.on('toggleItem',(markedItem)=>{
    markedItem.completed = !markedItem.completed;
    todolistdb.forEach(i=> {
      if(i.id === markedItem.id) i.completed = markedItem.completed;
    });
    localStorage.setItem('mylocaltodolist', JSON.stringify(todolistdb));
    io.emit('toggleItem', markedItem);
  })

});

function init(port) {
  port = port || 8080;
  return new Promise((resolve, reject) => {
    serve.listen(port, ()=> {
      resolve(port);
    });
  });
}

module.exports = {init};
