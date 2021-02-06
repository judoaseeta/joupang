export default function equal(old, newOne) {
    if(typeof old === 'object' && typeof newOne === 'object') {
        for(let key in newOne) {
            if(!old[key] || old[key] !== newOne[key]) {
                return false;
            } 
        }
    }
}