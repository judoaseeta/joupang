import api from './api.js';
export const iconList = [
    ['패션의류', 'fa-tshirt','#f6699e'],
    ['신선식품','fa-leaf','#00b599'],
    ['전자제품','fa-tv','#1992df'],
    ['여행','fa-suitcase','#ab47bc'],
    ['서적','fa-book','#b74b4b'],
    ['홈데코','fa-couch','#dd6641'],
    ['캠핑','fa-campground','#00aad4']
];
export const parseTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const y = date.getFullYear();
    const m = date.getMonth();
    const d = date.getDate();
    const h = date.getHours();
    const mi = date.getMinutes();
    return `${y}년 ${m}월 ${d}일 ${h}시 ${mi}분`;
}
export {
    api
};

