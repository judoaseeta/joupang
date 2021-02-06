const numToWon = (num ) => {
    let newNum = '';
    const oldNum = String(num).split('').reverse().join('');
    for(let i = 0; i < oldNum.length; i++) {
        if((i !== oldNum.length - 1) && (i+1)% 3 ===0) {
            newNum += oldNum[i];
            newNum += ',';
          
        } else {
            newNum +=oldNum[i];
        }
    }
    return newNum.split('').reverse().join('') + '원';
}
export default numToWon;
