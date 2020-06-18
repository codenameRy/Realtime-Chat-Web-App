import React from 'react';
import ReactEmoji from 'react-emoji';

import './Message.css';

const Message = ({ message: { user, text }, name }) => {
    let isSentByCurrentUser = false;

    const trimName = name.trim().toLowerCase();
// Check if user is equal to trim name
    if (user === trimName) {
        isSentByCurrentUser = true;
    }

    //Ternary statement to differentiate between messages sent by current user and other users
    return (
        isSentByCurrentUser
        ? (
            <div className="messageContainer justifyEnd">
            <p className="sentText pr-10">{trimName}</p>
            <div className="messageBox backgroundBlue">
              <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
            </div>
          </div>
        )
        : (
            <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
            </div>
            <p className="sentText pl-10 ">{user}</p>
          </div>
        )
    )   

}

    


export default Message;