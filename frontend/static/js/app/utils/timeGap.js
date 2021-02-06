const sec = 1000;
const min = 1000 * 60;
const hour = min * 60;

const timeGap = (date1, date2) => {
    const time2 = date2.getTime();
    const time1 = date1.getTime();
    const gap = time2 > time1 ? time2 - time1 : time1 - time2;
    const hourGap = Math.floor(gap / hour);
    const minGap = Math.floor((gap % hour) / min);
    const secGap = Math.floor((gap % min) / sec );
    return [hourGap, minGap,secGap];
};

export default timeGap;
