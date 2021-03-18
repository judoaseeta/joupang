import element from '../../component/element.js';
import renderer from '../../component/renderer.js';
import Component from '../../component/component.js';

import CategoryNav from './categoryNav.js';
import Items from './items.js';

export default class extends Component{
    constructor(props) {
        super(props);
    }
    getHtml() {
        const container = this.container;
        renderer(container, new CategoryNav({
            tag: 'menu',
            props: {
                className: 'items_categoryNav'
            },
            router: this.router
        }));
        renderer(container, new Items({
            tag: 'content',
            props: {
                className: 'items_item_list_wrapper',
                id: 'items_item_list_wrapper'
            },
            state: {
                loading: true
            },
            router: this.router
        }));
        return container;
    }
}