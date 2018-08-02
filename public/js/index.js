let socket = io();

socket.on('connect', function (){
    console.log('Connected to server!');

});

socket.on('newMessage', function (message) {
    console.log('Message: ', message);
});

socket.emit('createMessage', {
    from: 'alex',
    text: 'lolllll',
});

socket.on('disconnect', function (){
    console.log('Disconnected from server!');
});
