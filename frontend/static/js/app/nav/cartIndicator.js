import Component from '../../component/component.js';
import element from '../../component/element.js';
import renderer from '../../component/renderer.js';
import link from '../../router/link.js';
import Icon from '../icon/index.js';

export default class extends Component {
    constructor(props) {
        super(props);
        this.subscribe = this.subscribe.bind(this);
        this.observable.subscribe(this.subscribe);
    }
    subscribe(newState) {
        const indicator = document.getElementById('main_nav_cart_indicator');
        const newCartItems = newState.cart;
        indicator.classList.toggle('on', newCartItems.length > 0);
        indicator.innerText = newCartItems.length;
    }
    getHtml() {
        const container = this.container;
        const holder = element('div',{
            props: {
                className: 'main_nav_cart_icon_holder'
            }
        })
        renderer(holder, new Icon({
            iconName: 'fa-shopping-cart',
            className: 'main_nav_cart_icon'
        }));
        renderer(holder, element('span', {
            props: {
                id: 'main_nav_cart_indicator'
            }
        }));
        renderer(container,holder);
        return container;
    }
}