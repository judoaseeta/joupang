import element from './element.js';
import renderer from './renderer.js';

const starGazerForm = (target, handler) => {
    for(let i = 1; i <= 10; i++) {
        const currentRating = i / 2;
        const star = element('span', {
            props: {
                className: 'star',
                dataset: {
                    rating: currentRating
                }
            },
            handler: {
                onMouseEnter:handler(currentRating)
            }
        });
        renderer(target, star);
    }
}

export default starGazerForm;
