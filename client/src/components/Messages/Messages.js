import React from 'react';
import Message from '../Message/Message.js';
import ScrollToBottom from 'react-scroll-to-bottom';


import './Messages.css';

const Messages = ({ messages, name }) => (
<ScrollToBottom className="messages">
{/* Loop through all of the messages by sending the messages from Chat component as a property */}
 {/* Include name a parameter to differentiate from the other users in the room */}
 {messages.map(( message , i) => <div key={i}> <Message message={message} name={name}/> </div>)}
</ScrollToBottom>
)

export default Messages;