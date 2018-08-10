const {Users} = require('./users');
const {removeDuplicates} = require('../utils/validation');

const users = new Users();

class Rooms {
    constructor () {
        this.rooms = [];
        this.usersInRoom = [];
    }
    addRoom (name) {
        console.log('Adding..')
        const room = {
            name, 
        };
        this.rooms.push(room);

        return room;
    }
    getRooms () {
        const uniqueArray = removeDuplicates(this.rooms, "name");
        console.log("uniqueArray is: " + JSON.stringify(uniqueArray));

        return JSON.stringify(uniqueArray);
    } 


    deleteRoom (name) {
        const room = this.rooms.filter((room) => room.name === name);
        if (room) {
            this.rooms = this.rooms.filter((room) => room.name !== name);
        }
        return room;
    }

    getUsersFromRoom (name) {
        const rooms = this.getRooms();
        rooms.filter((room) => room === name);



    }

    addUserToRoom (id, name, room) {
        const user = users.addUser(id, name, room);
        this.usersInRoom.push({user, room});

        console.log(`${JSON.stringify(this.usersInRoom)}`);
        // console.log(`Users in ${room}: ${JSON.stringify(this.usersInRoom)}`)
        // console.log(`Users in ${JSON.stringify(this.usersInRoom)}: ${JSON.stringify(this.usersInRoom)}`)
        return user;
    }

    removeUserFromRoom (id) {

    }
    
}

module.exports = {
    Rooms
}