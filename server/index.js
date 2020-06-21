const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js')

const PORT = process.env.PORT || 5000;

const router = require('./router');
const app = express();
const server = http.createServer(app);

//Basic runtime to make Socket.io work
const io = socketio(server);

//Run when we have a client connection and disconnection on our instance
//Socket connected as a client-side socket
io.on('connection', (socket) => {
    // console.log('a user connected!!!!!');
    
    //Call for name and room
    //Pass in a callback
    socket.on('join', ({ name, room}, callback)=> {
      // console.log(name, room);
      //Destrucure properties that come from the function
      const { error, user } = addUser( { id: socket.id, name, room });
      //Immediately trigger a response with the callback (errorHandling)
      if (error) return callback(error);
      
      //Admin generated messages when join and leave. Payload with template literals
      socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` });
      //Send message to everyone except that user
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined`});
      //If there are no errors, callback another socket.io method join
      socket.join(user.room)
      console.log('user connected')

      //Logic to identify users in the chat room
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)})
      //Callback so callback on frontend is called
      callback();
    })
    
    //Expect the message on the backend
    socket.on('sendMessage', (message, callback) => {
      const user = getUser(socket.id);

      io.to(user.room).emit('message', { user: user.name , text: message });
      io.to(user.room).emit('roomData', { room: user.rooom , users: getUsersInRoom(user.room)});
      callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        console.log('user disconnected!!!!!!')
        if (user){
          io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has logged off`})
        }
      })
  });

//Call router as middleware
app.use(router);

//Run server
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
