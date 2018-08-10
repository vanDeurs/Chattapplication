let socket = io();

socket.on('connect', function () {
    console.log('Connected from index.js');
    
});
 
socket.on('updateRoomsList', function (rooms) {
    console.log('Rooms: ', rooms[0]);
    const ol = jQuery('<ol></ol>');

    for (let i = 0; i < rooms.length; i++) {
        console.log('ROOM', rooms[i].name)
        ol.append(jQuery('<li></li>').text(rooms[i].name));
    }

    // rooms.forEach(function (room) {
    //     ol.append(jQuery('<li></li>').text(room));
    // });

    jQuery('#rooms').html(ol);
});

socket.on('updateUsersPerRoom', function (users) {
    console.log(`${'room'}: ${users}`);
});