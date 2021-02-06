import element from '../../component/element.js';
import renderer from '../../component/renderer.js';

export default function Selector ({
    image,
    content,
    id
}) {
    const container = element('li', {
        props: {
            className: 'slider_item_selector',
            dataset: {
                id: id
            }
        }
    });
    renderer(container,  element('img', {
        props: {
            src: image
        }
    }));
    renderer(container, element('p',{
        content
    }), );
    return container;
}