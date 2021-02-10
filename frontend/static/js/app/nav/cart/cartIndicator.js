import Component from '../../../component/component.js';
import element from '../../../component/element.js';
import renderer from '../../../component/renderer.js';
import link from '../../../router/link.js';
import Icon from '../../icon/index.js';
import CartListItem from './cartListItem.js';
import clearElement from '../../../component/clearElement.js';

export default class extends Component {
    constructor(props) {
        super(props);
        this.subscribe = this.subscribe.bind(this);
        this.renderList = this.renderList.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.observable.subscribe(this.subscribe);
    }
    subscribe(newState) {
        const indicator = document.getElementById('main_nav_cart_indicator');
        const container = document.getElementById(this.props.id);
        // 카트의 상태 구독;
        const newCartItems = newState.cart;
        const listContainer = container.querySelector('.main_nav_cart_list');
        listContainer.classList.toggle('on',newCartItems.length > 0);
        indicator.classList.toggle('on', newCartItems.length > 0);
        indicator.innerText = newCartItems.length;
        this.renderList(newCartItems);
    }
    //옵저버블 내에서 카트 아이템 삭제.
    removeItem(index) {
        return (e) => {
            const id = index;
            // 기존 카트 아이템
            const oldCart = this.observable.getState().cart;
            // 새로운 카트 아이템,
            const newCart = [...oldCart.slice(0,id), ...oldCart.slice(id+1)];
            this.observable.update({
                cart: newCart
            });
            // 업데이트 후 만약에 새로 업데이트한 카트의 아이템 수가 0이라면 카트 클래스 off
            if(newCart.length === 0) {
                const container = document.getElementById(this.props.id);
                const listContainer = container.querySelector('.main_nav_cart_list');
                listContainer.classList.remove('on');
            }
        }
    }
    // helper function for rendering cart item
    // ul 콘테이너에 카트 아이템들을 렌더링하는 메써드.
    renderList(items) {
        const container = document.getElementById(this.props.id);
        const listContainer = container.querySelector('.main_nav_cart_list');
        clearElement(listContainer);
        // maximum rendering cartitem is 4;
        // 카트아이템 최대 4개로 제한.
        items.slice(0,4).forEach((item, index )=> {
            renderer(listContainer,new CartListItem({
                props: {
                    className: 'main_nav_cart_list_item',
                    data: item,
                    index,
                    removeItem: this.removeItem
                }
            }))
        });
    }
    getHtml() {
        const container = this.container;
        const holder = element('div',{
            props: {
                className: 'main_nav_cart_icon_holder',
            },
           
        });
        renderer(holder, new Icon({
            iconName: 'fa-shopping-cart',
            className: 'main_nav_cart_icon',
        }));
        renderer(holder, element('span', {
            props: {
                id: 'main_nav_cart_indicator'
            }
        }));
        renderer(container,holder);
        renderer(container,element('ul', {
            props: {
                className: 'main_nav_cart_list'
            }
        }));
        return container;
    }
}