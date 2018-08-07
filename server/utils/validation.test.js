const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        const value = {'name': 'alex'};
        const value2 = ['alex', 'ines'];
        const value3 = 189;
        
        const validation = isRealString(value);
        const validation2 = isRealString(value2);
        const validation3 = isRealString(value3)

        expect(validation).toBe(false);
        expect(validation2).toBe(false);
        expect(validation3).toBe(false);
    });

    it('should reject strings with only spaces', () => {
        const value = '     ';
        const validation = isRealString(value);
        
        expect(validation).toBe(false);
    });

    it('should allow string with non-space characters', () => {
        const value = 'Alex';
        const value2  = 'Alexxx   ';

        const validation = isRealString(value);
        const validation2 = isRealString(value2);

        expect(validation).toBe(true);
        expect(validation2).toBe(true);
    });

});