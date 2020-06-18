import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

//Styling for component
import './Chat.css';

let socket;

//Important logic for socket.io will be stored in this file
const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState(''); //Way to store one message 
    const [messages, setMessages] = useState([]); //Array to store all message
    const EndPoint = 'localhost:5000';

/*UseEffect and Cleanup instead of the class based components ComponentDidMount() and ComponentWillUnmount() 
to update when users log in and out*/
    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(EndPoint);

        setName(name);
        setRoom(room);
        //Emit (send and receive different events using the instance of socket with socket.emit
        //We have access to the server side callback apart of the emit function
        socket.emit( 'join' , { name, room }, () => {
           
        });
        //Action when leaving the chat -> Unmounting of components
        return () => {
            socket.emit('disconnect')
            //Turn off the instance of socket.emit
            socket.off()
        }
        //Specify when the useeffect is being called by using array
    }, [EndPoint, location.search]);

//UseEfect to manage messages
 useEffect(() => {
     socket.on('message', (message) => {
        //Adding new message to messages array
        setMessages([...messages, message]);
     })
 }, [messages]);

 //Function for sending messages
 const sendMessage = (event) => {
     //Prevent full refresh of the keypress
     event.preventDefault();

    //Clear message field after text message has been sent
    if(message) {
         socket.emit('sendMessage', message, () => setMessage(''));
     }
 }

 console.log(message, messages)

    return (
        <div className="outerContainer">
        <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name}/>
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
        </div>
        
      </div>
    )
}

export default Chat;