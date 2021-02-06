import element from './element.js';
import renderer from './renderer.js';


const select = (options,defaultValue,) => {
    const container = element('div',{
        props: {
            className: 'custom_select'
        }
    })
    const selector = element('select');
    options.forEach(option => {
        renderer(selector, element('option', {
            props: {
                className: 'custom_select_option',
                value: option
            },
            content: option
        }))
    });
    renderer(container,selector);
    renderer(container,element('span', {
        props: {
            className: 'focus'
        }
    }))
    return container;
}

export default select;
