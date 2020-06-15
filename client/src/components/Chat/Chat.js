import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client'

//Styling for component
import './Chat.css';

let socket;

//Important logic for socket.io will be stored in this file
const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const EndPoint = 'localhost:5000';

//UseEffect and Cleanup instead of the class based components ComponentDidMount() and ComponentWillUnmount() 
//to update when users log in and out
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
    }, [EndPoint, location.search])


    return (
        <h1>Chat</h1>
    )
}

export default Chat;