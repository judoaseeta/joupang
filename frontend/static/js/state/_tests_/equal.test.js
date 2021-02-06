import equal from '../equal.js';

describe('testing compare function',() => {
    it('if both are objects, should check every key',() => {
        // when
        const oldOne1 =  {};
        const newOne1 = { 
            name: 'bha'
        }
        // given 
        expect(equal(oldOne1, newOne1)).toBe(false);
        
    })
});