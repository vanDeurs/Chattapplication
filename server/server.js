const path = require('path');
const http = require('http')
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected!');

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and Room name are required.');
        }
        socket.join(params.room); // Create the room
        users.removeUser(socket.id); // Remove from any other rooms
        users.addUser(socket.id, params.name, params.room); // Add user to array of users

        io.to(params.room).emit('updateUserList', users.getUserList(params.room)); // Update the user list
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!')); // Welcome message to user
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`)); // Emit that a user has joined
        callback();
        
    });

    socket.on('createMessage', (message, callback) => {
        console.log('Message: ', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        const user = users.removeUser(socket.id);

        io.to(user.room).emit('updateUserList', users.getUserList(user.room));
        io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    });
});

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});