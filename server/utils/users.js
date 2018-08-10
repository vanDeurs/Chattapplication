class Users {
    constructor () {
        this.users = [];
    }
    addUser (id, name, room) {
        const user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser (id) {
        const user = this.getUser(id);
        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }
    getUser (id) {
        return this.users.filter((user) => user.id === id)[0];
    }
    getAllUsers (rooms) {
        let userRoom = [];
        for (let u in rooms) {
            userRoom.push({room: rooms[u].name, users: []});
        }
        
        for (let i = 0; i < this.users.length; i++) {
            for (let j in rooms) {
                if (this.users[i].room == rooms[j].name) {
                    userRoom[j].users.push({id: this.users[i].id, name: this.users[i].name});
                    console.log('Added user: \n', JSON.stringify(userRoom));
                }
            }
        }
        return userRoom;
    } 
    
    getUserList (room) {
        const users = this.users.filter((user) => user.room === room);
        const namesArray = users.map((user) => user.name);

        return namesArray;
    } 
}

module.exports = {
    Users
}