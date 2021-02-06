import Loading from './loading/index.js';
import element from './element.js';
import renderer from './renderer.js';

export default function loadingPage() {
    const container = element('div',{
        props: {
            className: 'loading_page'
        }
    });
    renderer(container, Loading());
    return container;
}