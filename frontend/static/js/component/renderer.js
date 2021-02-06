
const render = (target, node) => {
    if(node.render) {
        const renderedNode = node.render();
        if(typeof renderedNode === 'string') {
            target.insertAdjacentHTML('beforeend', node);
        } else if(renderedNode instanceof HTMLElement || renderedNode instanceof Node){
            target.appendChild(renderedNode);
        }
    } else if(typeof node === 'string') {
        target.insertAdjacentHTML('beforeend', node);
    } else if(node instanceof HTMLElement || node instanceof Node){
        target.appendChild(node);
    } else {
        throw new Error('check type of a given node');
    }
}
const renderer = (target, node) => {
    if(typeof target === 'string') {
        const container = document.getElementById(target);
        while (container.firstChild) {
            container.removeChild(container.firstChild);
          }
        render(container,node);
    } else {
        render(target,node);
    }
}

export default renderer;
