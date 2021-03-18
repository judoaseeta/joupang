import renderer from '../component/renderer.js';
import element from '../component/element.js';
import Component from '../component/component.js';

export default class extends Component {
    constructor(props) {
        super(props);
        this.tag = 'a';
        this.navigate = this.navigate.bind(this);
    }
    initContainer() {
  
    }
    navigate() {
        const href = this.props.href;
        const state = this.props.linkState ? this.props.linkState : null;
        const ev = new CustomEvent('navigateTo', {
            detail: {
                href,
                state
            }
        });
        document.body.dispatchEvent(ev);
    }   
    getHtml() {
        const { children, active, activeClassName } = this.props;
        this.container = element(this.tag, {
            props: {
                id: this.props.id,
                className: this.props.className,
                dataset: this.props.dataset,
                style: this.props.style,
                attributes: this.props.attributes,
            },
            handler: {
                onClick: this.navigate
            }
        });
        const container = this.container;
        if(!!activeClassName) {
            this.container.classList.toggle(activeClassName,active);
        }
        if(children) {
            renderer(container, children);
        }
        return container;
    }
}
/*
export default function link(href, children, {
    id,
    className,
    activeClassName,
    active
} = {
    id:'',
    className: '',
    activeClassName: '',
    active: false
}) {
    const link = document.createElement('a');
    if(children) {
        renderer(link, children);
    }
    link.href = href;
    link.dataset.link = true;
    if(id) link.id = id;
    if(className) link.className = className;
    if(!active && activeClassName) link.classList.remove(activeClassName);
    if(active) link.classList.add(activeClassName);
    return link;
}
*/