const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const { port } = require('./src/config.js');
const server = require('./server');

let window1 = null;
let window2 = null;
let window3 = null;

// Wait until the app is ready
app.once('ready', () => {
  function createWindow(x, y, width, height){
    // Create a new window
    return new BrowserWindow({
      // Set the initial width to 500px
      width: width || 500,
      // Set the initial height to 600px
      height: height || 600,
      x: x || 0,
      y: y || 0,
      // set the title bar style
      titleBarStyle: 'hidden-inset',
      // set the background color to black
      backgroundColor: "#3f51b5",
      // Don't show the window until it's ready, this prevents any white flickering
      show: false
    });
  }

  window1 = createWindow(10, 10);
  window2 = createWindow(200, 100);
  window3 = createWindow(400, 10);

  server.init(port).then((port)=> {
    let location = url.format({
      pathname: `localhost:${port}`,
      protocol: 'http:',
      slashes: true
    })

    window1.loadURL(location);
    window2.loadURL(location);
    window3.loadURL(location);
  }).catch(err => {
    console.error(err);
  });


  window1.once('ready-to-show', () => {
    window1.show();
  })
  window2.once('ready-to-show', () => {
    window2.show();
  })
  window3.once('ready-to-show', () => {
    window3.show();
  })
})
