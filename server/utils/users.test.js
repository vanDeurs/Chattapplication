const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {

    let users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Alex',
            room: 'GOT fans'
        }, {
            id: '2',
            name: 'Ines',
            room: 'GOT fans'
        }, {
            id: '3',
            name: 'Bob',
            room: 'Vampire fans'
        }]
    });

    it('should add new user', () => {
        const users = new Users();
        const user = {
            id: '123',
            name: 'Alex',
            room: 'GOT fans'
        };
        users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should return names fot GOT fans room', () => {
        const userList = users.getUserList('GOT fans');
        expect(userList).toEqual(['Alex', 'Ines']);
    });

    it('should return names for Vampire fans room', () => {
        const userList = users.getUserList('Vampire fans');
        expect(userList).toEqual(['Bob']);
    });

    it('should find user by id', () => {
        const user = users.getUser(users.users[0].id);
        expect(user).toMatchObject(users.users[0]);
    });

    it('should not find a user by id', () => {
        const userId = '99';
        const user = users.getUser(userId);

        expect(user).toBeFalsy();
    });

    it('should remove user by id', () => {
        const userId = users.users[1].id;
        const user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user by id', () => {
        const userId = '99';
        const user = users.removeUser(userId);

        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });


});