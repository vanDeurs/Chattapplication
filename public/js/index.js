let socket = io();

socket.on('connect', function () {
    console.log('Connected from index.js');
    
});

socket.on('updateOpenRooms', function (roomsArrayWithUsers) {
    jQuery('#rooms').empty();
    console.log('Updating rooms...');
    console.log('rams', roomsArrayWithUsers);

    const template = jQuery('#rooms-available-template').html();
    let room = [];

    for (let i in roomsArrayWithUsers) {
        console.log('Room: ', roomsArrayWithUsers[i].room);
        room.push({room: roomsArrayWithUsers[i].room, users: []});

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

// socket.on('updateOpenRooms', function (roomsArrayWithUsers) {
//     console.log(`${'Rooms with users'}: ${JSON.stringify(roomsArrayWithUsers)}`);

//     const ol = jQuery('<ol></ol>');
//     const ul = jQuery('<ul></ul>');

//     for (let i in roomsArrayWithUsers) {
//         ol.append(jQuery('<li><h1><h1></li>').text([roomsArrayWithUsers[i].room]));
//         console.log('Room: ', roomsArrayWithUsers[i].room);

//         for (let j in roomsArrayWithUsers[i].users) {
//             console.log('Users: ', roomsArrayWithUsers[i].users[j]);
//             ul.append(jQuery('<li></li>').text(([roomsArrayWithUsers[i].users[j].name])));
//         }
//     }



//     jQuery('#rooms').html(ol);
//     jQuery('#users_in_room').html(ul);


// });