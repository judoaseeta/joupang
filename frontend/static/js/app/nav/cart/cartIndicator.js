import Component from '../../../component/component.js';
import element from '../../../component/element.js';
import renderer from '../../../component/renderer.js';
import Link from '../../../router/link.js';
import Icon from '../../icon/index.js';
import CartListItem from './cartListItem.js';
import clearElement from '../../../component/clearElement.js';

// utilities
import isEqual from '../../../state/isEqual.js';

export default class extends Component {
    constructor(props) {
        super(props);
        this.subscribe = this.subscribe.bind(this);
        this.renderList = this.renderList.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.updateCart = this.updateCart.bind(this);
        this.observable.subscribe(this.subscribe);
    }
    subscribe(newState) {
        // 카트의 상태 구독;
        const newCartItems = newState.cart;
        // 새로운 카트 상태 이전 상태와 비교하여 업데이트할지 결정
        if(this.state.memos) {
            // 만약 이전 상태와 다르다면 카트 업데이트
            if(!isEqual(this.state.memos, newCartItems)) {
                this.state.memos = newCartItems;
                this.updateCart(newCartItems);
            }
        } else {
            // 기존의 구독된 카트 상태가 없는 경우 메모
            this.state.memos = newCartItems;
            this.updateCart(newCartItems);
        }
    }
    //옵저버블 내에서 카트 아이템 삭제.
    removeItem(index) {
        return (e) => {
            const id = index;
            // 기존 카트 아이템
            const oldCart = this.observable.getState().cart;
            // 새로운 카트 아이템,
            const newCart = [...oldCart.slice(0,id), ...oldCart.slice(id+1)];
            this.observable.update((state) => ({
                ...state,
                cart: newCart
            }));
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
        renderer(listContainer, new Link({
            props: {
                className: 'main_nav_cart_link',
                href: '/cart',
                children: '카트로 가기'
            }
        }));

    }
    updateCart(newCartItems) {
        // 유저가 카트를 호버하게 업데이트하고 카트 아이템을 렌더링하게 하는 펑션
        // a function to make cart hoverable by user and render cartitems; 
        const indicator = document.getElementById('main_nav_cart_indicator');
        const container = document.getElementById(this.props.id);
        // 카트 리스트를 찾아서 on 클래스를 토글
        const listContainer = container.querySelector('.main_nav_cart_list');
        listContainer.classList.toggle('on',newCartItems.length > 0);
        // 카트 수량표시자 찾아서 토글후 업데이트
        indicator.classList.toggle('on', newCartItems.length > 0);
        indicator.innerText = newCartItems.length;
        this.renderList(newCartItems);
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