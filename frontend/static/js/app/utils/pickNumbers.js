export default function pickNumbers(maxNum,pickNum) {
    const set = new Set();
    while(set.size < pickNum) {
        const rand = Math.floor(Math.random() * maxNum);
        set.add(rand);
    }
    return [...set];
}