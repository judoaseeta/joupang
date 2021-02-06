import NumToWon from '../numToWon.js';
test('NumToWon should return string of seperated number with comma + 원', () => {
    // case1 12000 => 12,000원
    //given
    const case1 = 12000;
    const expected1 = '12,000원';
    expect(NumToWon(case1)).toEqual(expected1);
    // case2 28988882 => 28,988,882원
    const case2 = 28988882;
    const expected2 = '28,988,882원';
    expect(NumToWon(case2)).toEqual(expected2);
    // case3 128000 => 128,000원
    const case3 = 128000;
    const expected3 = '128,000원';
    expect(NumToWon(case3)).toEqual(expected3);
});