export default function isEqual(old, newOne) {
    if(typeof old === 'object' && typeof newOne === 'object') {
        // if both objects are empty ones, assume both are same;
        if(Object.keys(old).length === 0 && Object.keys(newOne).length === 0) {
            return true;
        } else if(Object.keys(old).length !== Object.keys(newOne).length) {
            return false;
        } else {
            for(let key in newOne) {
                if(old[key]) {
                    return isEqual(old[key], newOne[key]);
                } else {
                    return false
                }
            }
        }
    } else if(typeof old === typeof newOne) {
        return old === newOne;
    } else {
        return false;
    }
}