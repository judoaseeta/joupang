import timeGap from '../timeGap.js';
// calculate time gap by hour,minute, second
test('timeGap util', () => {

    const now = Date.now();
    const date1 = new Date(
        2021,
        1,
        15,
        23,
        54,
        42
    );
    const date2 = new Date(
        2021,
        1,
        15,
        11,
        28,
        56
    );
    const [ hourGap, minGap, secGap] = timeGap(date1,date2);
    expect(hourGap).toEqual(12);
    expect(minGap).toEqual(25);
    expect(secGap).toEqual(46);
});