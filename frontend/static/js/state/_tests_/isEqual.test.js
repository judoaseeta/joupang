import isEqual from '../isEqual.js';

describe('testing compare function',() => {
    it('if both are objects, should check every key and value',() => {
        // when
        const oldOne1 =  {};
        const newOne1 = { 
            name: 'bha'
        }
        // given 
        //expect(isEqual(oldOne1, newOne1)).toBe(false);  
        // when 
        const oldOne2 = {
            name: 'roy'
        };
        const newOne2 = {
            name :'aka'
        }
        //expect(isEqual(oldOne2, newOne2)).toBe(false);

        // more complex case;
        const oldOne3 = {
            comments: [
                {
                    rgrg: 'few'
                },
                {
                    rgrg: 'few2'
                }
            ],
            name: 'judo'
        }
        const newOne3 = {
            comments: [
                {
                    few: 'few'
                },
                {
                    zx: 'few2'
                },
                {
                    fwew: '113'
                }
            ],
            name: 'roy'
        }
        expect(isEqual(oldOne3, newOne3)).toBe(false);
    });
    it('if both are non-object and different type, should return false',() => {
        // when
        const oldOne1 = 'rffeewf';
        const newOne1 = 13133;
        // old one and new one have diffrent types;

        // given
        //expect(isEqual(oldOne1, newOne1)).toBe(false);

    });
    it('if both are same types compare reference or value',() => {
        // when
        // both are string but different values;
        const oldOne1 = 'roy';
        const newOne1 = 'muller';
        // given
        expect(isEqual(oldOne1,newOne1)).toBe(false);
        // when
        // both are string and same values;
        const oldOne2 = 'roy';
        const newOne2 = 'roy';
        // given
        expect(isEqual(oldOne2,newOne2)).toBe(true);
        // when
        // both are empty objects;
        const oldOne3 = {};
        const newOne3 = {};
        expect(isEqual(oldOne3,newOne3)).toBe(true);
    })
});