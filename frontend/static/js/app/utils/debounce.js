export default function debounce(time, callback) {
    let timer;
    return function (...args){
        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            callback.apply(this,args);
        },time);
    }
}