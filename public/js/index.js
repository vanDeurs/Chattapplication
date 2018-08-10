let socket = io();

socket.on('connect', function () {
    console.log('Connected from index.js');
    
});

socket.on('updateOpenRooms', function (roomsArrayWithUsers) {
    console.log(`${'Rooms with users'}: ${JSON.stringify(roomsArrayWithUsers)}`);

    const ol = jQuery('<ol></ol>');
    const ul = jQuery('<ul></ul>');

    for (let i = 0; i < roomsArrayWithUsers.length; i++) {
        ol.append(jQuery('<li></li>').text(roomsArrayWithUsers[i].room));

        for (let j = 0; j < roomsArrayWithUsers.length; j++) {
            console.log('yup', roomsArrayWithUsers[j].users);
            for (let k = 0; k < roomsArrayWithUsers[j].users.length; k++) {
                ul.append(jQuery('<li></li>').text(JSON.stringify(roomsArrayWithUsers[j].users[k].name)));
            }
        }
    }


    jQuery('#rooms').html(ol);
    jQuery('#users_in_room').html(ul);


});