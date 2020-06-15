const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

const router = require('./router');
const app = express();
const server = http.createServer(app);

//Basic runtime to make Socket.io work
const io = socketio(server);

//Run when we have a client connection and disconnection on our instance
//Socket connected as a client-side socket
io.on('connection', (socket) => {
    console.log('a user connected!!!!!');
    
    //Call for name and room
    //Pass in a callback
    socket.on('join', ({ name, room}, callback)=> {
      console.log(name, room);

      //Immediately trigger a response with the callback (errorHandling)
      callback();
    })
    
    socket.on('disconnect', () => {
        console.log('user disconnected!!!!!!');
      });
  });

//Call router as middleware
app.use(router);

//Run server
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));




