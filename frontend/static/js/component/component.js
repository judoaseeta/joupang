import renderer from './renderer.js';
import element from './element.js';
/* Component rendering process.
 * render => afterMount => update => afterUnMount
 * 
 */
export default class {
    constructor({
        state = {

        },
        router = null,
        observable = null,
        tag = 'div',
        props = {

        },
        isNoLifeCycle = false,
    } = {
       
    }) {
        
        // binding methods to a class
        this.render = this.render.bind(this)
        this.setState = this.setState.bind(this);
        this.update = this.update.bind(this);
        this.afterMount = this.afterMount.bind(this);
        this.afterUnMount = this.afterUnMount.bind(this);
        this.addAfterUnMount = this.addAfterUnMount.bind(this);
        // set possible properties to the class.
        this.state = state;
        this.router = router;
        this.observable = observable;
        this.tag = tag;
        this.props = props;
        this.isNoLifeCycle = isNoLifeCycle;
        this.initContainer = this.initContainer.bind(this);
        this.container = this.initContainer();
    }
    initContainer() {
        return  element(this.tag, {
            props: {
                id: this.props.id,
                className: this.props.className,
                dataset: this.props.dataset,
                style: this.props.style
            },
            state: this.state,
            handler: this.props.handler,
            isNoLifeCycle: this.isNoLifeCycle
        });
    }
    afterMount() {
    }
    afterUnMount() {

    }
    // function add afterUnMount to CleanUp  
    addAfterUnMount() {
        if(window.cleanUp) {
            window.cleanUp.addCleanUp(this.afterUnMount);
        }
    }
    render() {
        // check if oldComponent in the DOM tree
        const oldComponent = this.props.id ? document.getElementById(this.props.id) : undefined;
        const children = this.getHtml();
        
        if(oldComponent) {
            const newContainer = children.cloneNode();
        
            if(children.children) {
                const elements = Array.from(children.children);
                for(let element of elements) {
                    renderer(newContainer, element);
                }
                oldComponent.replaceWith(newContainer);
            } else {
                renderer(newContainer,children);
                oldComponent.replaceWith(newContainer);
            }
        } else {
            
            if(!this.isNoLifeCycle) {
                const timeout = setTimeout(() => {
                    this.afterMount();
                    clearTimeout(timeout);
                },0);
            } else {
            }
            this.container = this.initContainer();
            this.addAfterUnMount();
            return children;  
        }
    }
    getHtml() {
        const container = this.container;
        renderer(container,`<h1>This is a default rendered element</h1>`)
        return container;
    }
    setState(newStateOrStateFunc) {
        if(typeof newStateOrStateFunc === 'function') {
            const obj = newStateOrStateFunc(this.state)
            this.state = {
                ...this.state,
                ...obj
            }
            this.render();
        } else if(typeof newStateOrStateFunc === 'object') {
            this.state = {
                ...this.state,
                ...newStateOrStateFunc
            }
            this.render();
        } else {
            throw new Error('check your arguments given to setState!');
        }

    }
    update(newState) {
        this.setState(newState);
    }
}
