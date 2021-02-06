import element from './element.js';
import renderer from './renderer.js';
const starGazer = (target, rating) => {
    for(let i = 1; i <= 10; i++) {
        const currentRating = Math.floor(i / 2);
        const star = element('span', {
            props: {
                className: currentRating <= rating ? 'star on' :'star'
            }
        });
        renderer(target, star);
    }
}

export default starGazer;
