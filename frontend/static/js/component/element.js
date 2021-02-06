import renderer from './renderer.js';

function addHandler(element, handler) {
    Object.keys(handler).forEach(( key) => {
        // regex should be in the loop;
        const regex = new RegExp(/^on(\w+)/g);
        const match = regex.exec(key);
        if(match[1]) {
            element.addEventListener(match[1].toLowerCase(), handler[key]);
        }
    });
}

export default function element(markup,{
    props = {},
    content = '',
    handler = undefined
} = {
}) {
    if(markup === 'textNode') {
        const element = document.createTextNode(content);
        return element;
    } 
    const element = document.createElement(markup);
    if(content) {
        renderer(element, content);
    }
    if(handler) {
        addHandler(element, handler);
    }
    for(let prop in props) {
        if(prop === 'style') {
            const styles = props[prop];
            for(let k in styles) {
                element.style[k] = styles[k];
            }
        } else if(prop === 'attributes') {
            const attributes = props[prop];
            for(let k in attributes) {
                element.setAttribute(k, attributes[k]);
            }
        } else if(prop === 'dataset') {
            const dataSet = props[prop];
            for(let key in dataSet) {
                element.dataset[key] = dataSet[key];
            }
        } else {
            if(props[prop]) {
                element[prop] = props[prop];
            }
        }
    }
    return element;
}