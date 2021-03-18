import pickNumbers from '../pickNumbers.js';

test('pickNumbers should return random numbers less than maxNum as many as pickNum',() => {
    const result = pickNumbers(10,4);
    expect(result.length).toEqual(4);
    expect(Math.max(...result)).toBeLessThanOrEqual(10);
});