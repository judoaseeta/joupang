import element from '../../component/element.js';
import renderer from '../../component/renderer.js';

export default function Icon({
    iconName = 'fa-camera',
    className = '',
    style = {

    },
    handler = undefined,
    iconType = 'fas'
} = {}) {
    const span = element('span', {
        props: {
            className,
            style: style
        },
        handler
    });
    renderer(span, element('i', {
        props: {
            className: `${iconType} ${iconName}`
        }
    }));
    return span;
}