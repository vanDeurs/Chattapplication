let socket = io();

socket.on('connect', function () {
    console.log('Connected from index.js');
    
});

socket.on('updateOpenRooms', function (roomsArrayWithUsers) {
    jQuery('#rooms').empty();
    console.log('Updating rooms...');

    if (roomsArrayWithUsers.length < 1) {
        return jQuery('#rooms').append('<p>No rooms are currently open.</p>');
    }

    const template = jQuery('#rooms-available-template').html();
    let room = [];

    for (let i in roomsArrayWithUsers) {
        console.log('Rooms length: ', roomsArrayWithUsers[i].room);
        room.push({room: roomsArrayWithUsers[i].room, users: []});

        console.log('room: ', room)
        for (let j in roomsArrayWithUsers[i].users) {
            console.log('Users: ', roomsArrayWithUsers[i].users[j]);
            
            room[i].users.push(roomsArrayWithUsers[i].users[j].name);
        }
    }

    for (let i in room) {
        const html = Mustache.render(template, {
            room: room[i].room,
            users: room[i].users
            // url: message.url
        });
        jQuery('#rooms').append(html);
    }
});


jQuery('#enter-form').on('submit', function (e) {
    console.log('Here we go!');
    e.preventDefault();
    const nameTextBox = jQuery('[name=name]');
    const roomTextBox = jQuery('[name=room]');
    const params = {name: nameTextBox.val(), room: roomTextBox.val()};
    const errorMessage = jQuery('#errorMessage');

    socket.emit('validation', params, function (err) {
        console.log('validation');
        if (err) {
            errorMessage.text(err);
            return;
        } 
        console.log('No error.');
        window.location.href=`/chat.html?name=${nameTextBox.val()}&room=${roomTextBox.val()}`;
    });
});