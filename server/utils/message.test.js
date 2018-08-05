const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {

    it('should generate the correct message object', () => {
        const from = 'Jens';
        const text = 'Some message';
        const message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
    });

    it('should generate correct location object', () => {
        let from = 'Alex';
        let latitude = 100;
        let longitude = 200;
        let url = 'https://www.google.com/maps?q=100,200';
        let message = generateLocationMessage(from, latitude, longitude);
        expect(message.url).toEqual(url);
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, url});

    });
});