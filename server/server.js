const path = require('path');
const http = require('http')
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString, isOriginal} = require('./utils/validation');
const {Users} = require('./utils/users');
const {Rooms} = require('./utils/rooms');

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const users = new Users();
const rooms = new Rooms();

app.use(express.static(publicPath));

io.on('connection', (socket) => {

    console.log(socket.id, 'id')

    io.emit('updateOpenRooms', users.getAllUsers(rooms.getRooms()));

    socket.on('validation', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and Room are required.');
        }

        if (!isOriginal(params.name, users.getUserList(params.room))) {
            return callback('Name has already been taken.');
        }

        callback();
    });
    
    socket.on('join', (params, callback) => {
        console.log('Join just ran!');

        rooms.addRoom(params.room); // Add room to rooms array

        socket.join(params.room); // Create the room
        users.removeUser(socket.id); // Remove from any other rooms

        users.addUser(socket.id, params.name, params.room); // Add user to users array

        io.to(params.room).emit('updateUserList', users.getUserList(params.room)); // Update the user list
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!')); // Welcome message to user
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`)); // Emit that a user has joined
        
        io.emit('updateOpenRooms', users.getAllUsers(rooms.getRooms())); // Update the list of open rooms with users on the home page
        callback();
    });

    socket.on('createMessage', (message, callback) => {
        const user = users.getUser(socket.id);
        console.log(socket.id)
        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        const user = users.getUser(socket.id);

        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on('disconnect', () => {
        const user = users.removeUser(socket.id);   

        if (typeof user !== 'undefined') {
            console.log('User is defined.');
            
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
            io.emit('updateOpenRooms', users.getAllUsers(rooms.getRooms())); // Update the list of open rooms with users on the home page
            return;
        }

        console.log('User is undefined. Not in a chat.');
    });
});

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});