const path = require('path');
const http = require('http')
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
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

    socket.emit('updateOpenRooms', users.getAllUsers(rooms.getRooms()))
    users.getAllUsers(rooms.getRooms());

    
    socket.on('join', (params, callback) => {
        
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and Room are required.');
        }
        rooms.addRoom(params.room); // Add room to array of rooms
        socket.emit('updateUsersPerRoom', users.getUserList(params.room)) // Update the list of users per room

        socket.join(params.room); // Create the room
        users.removeUser(socket.id); // Remove from any other rooms
        users.addUser(socket.id, params.name, params.room); // Add user to array of users

        io.to(params.room).emit('updateUserList', users.getUserList(params.room)); // Update the user list
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!')); // Welcome message to user
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`)); // Emit that a user has joined
        callback();
        
    });

    socket.on('createMessage', (message, callback) => {
        const user = users.getUser(socket.id);
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
        socket.emit('updateOpenRooms', users.getAllUsers(rooms.getRooms()))

        const user = users.removeUser(socket.id);   

        if (typeof user !== 'undefined') {
            console.log('User is defined.');
            
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
            return;
        }

        console.log('User is undefined. Not in a chat.');
        socket.emit('updateOpenRooms', users.getAllUsers(rooms.getRooms()))

    });
});

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});