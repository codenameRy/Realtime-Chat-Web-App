//Helper functions to manage users and use in --> index.js file
//Sign in, log off, manage users in chat rooms

const users = [];

const addUser = ( { id, name, room } ) => {
//Change case of user room from input to lower --> Main Room to main room

    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    //Prevent new user to sign the same room with another users active name
    const existingUser = users.find((users) => users.room === room && users.name === name);
    if(existingUser) {
        return {error: 'Username is already in use'};
    }
    //Function for new user to push to users array
    const user = { id, name, room };
    users.push(user);
    return { user } //Identify exactly which user was pushed
}

const removeUser = ( { id } ) => {
    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id ) => users.find((user) => user.id === id);

const getUserinRoom = (room) => users.filter((user) => user.room === room)
    
module.exports = { addUser, removeUser, getUser, getUserinRoom }