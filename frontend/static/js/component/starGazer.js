import element from './element.js';
import renderer from './renderer.js';
const starGazer = (target, rating,isSmall) => {
    const classForOn = (condition) => condition ? 'star small on' : 'star small';
    const classFor = (condition) => condition ? 'star on' : 'star';
    for(let i = 1; i <= 10; i++) {
        const currentRating = Math.floor(i / 2);
        // 현재 별의 점수보다 총점이 큰가
        const condition = currentRating <= rating;
        const star = element('span', {
            props: {
                className: isSmall ? classForOn(condition) : classFor(condition)
            }
        });
        renderer(target, star);
    }
}

export default starGazer;
