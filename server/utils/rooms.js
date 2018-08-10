// const {Users} = require('./users');
const {removeDuplicates} = require('../utils/validation');

// const users = new Users();

class Rooms {
    constructor () {
        this.rooms = [];
    }
    addRoom (name) {
        const room = {
            name, 
        };
        this.rooms.push(room);

        return room;
    }
    getRooms () {
        const uniqueArray = removeDuplicates(this.rooms, "name");
        return uniqueArray;
    } 
    deleteRoom (name) {
        const room = this.rooms.filter((room) => room.name === name);
        if (room) {
            this.rooms = this.rooms.filter((room) => room.name !== name);
        }
        return room;
    }
    
}

module.exports = {
    Rooms
};