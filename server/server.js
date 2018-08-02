const path = require('path');
const http = require('http')
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const socketIO = require('socket.io')

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected!');

    socket.emit('newMessage', {
        from: 'alex',
        text: 'Hey loosers',
        createdAt: 123
    });

    socket.on('createMessage', (message) => {
        console.log('Message: ', message);
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected!');
    });
});

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});