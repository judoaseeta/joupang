import Component from '../../component/component.js';
import element from '../../component/element.js';
import renderer from '../../component/renderer.js';
import clearElement from '../../component/clearElement.js';
import Icon from '../icon/index.js';
import CartItem from './cartItem.js';
import numToWon from '../utils/numToWon.js';

export default class extends Component {
    constructor(props) {
        super(props);
        this.onInput = this.onInput.bind(this);
        this.getCartItems = this.getCartItems.bind(this);
        this.renderCartItems = this.renderCartItems.bind(this);
        this.removeSelectedItem = this.removeSelectedItem.bind(this);
        this.updateCartItems = this.updateCartItems.bind(this);
        this.subscribe = this.subscribe.bind(this);


        this.state = {
            selected: [],
            oldCartLength: this.getCartItems().length
        }
        this.observable.subscribe(this.subscribe);
    }
    getCartItems() {
        return this.observable.getState().cart;
    }
    afterUnMount() {
        this.observable.unsubscribe(this.subscribe);
    }
    subscribe(newState){
        const newCartLength = newState.cart.length;
        const { oldCartLength } = this.state;
        if(newCartLength !== oldCartLength) {
            this.updateCartItems(newState.cart);
            this.state.oldCartLength = newCartLength;
        }
    }
    updateCartItems(newCart) {
        this.update((state) => ({
            ...state,
            selected: []
        }));
    }
    onInput(e) {
        const length = this.getCartItems().length;
        // at least 1 items
        if(length>0) {
        const check = e.target.checked;
        const value = e.target.value;
        // if input event target is checked
        if(check) {
            if(value === 'all') {
                this.update((state )=> ({
                    ...state,
                    selected: [...this.getCartItems().map((_,i) => i)]
                }));
            } else {
                const index = Number(value);
                this.update((state) => ({
                    ...state,
                    selected: [...state.selected, index]
                }));
            }
        // unchecked
        } else {
            if(value === 'all') {
                this.update((state )=> ({
                    ...state,
                    selected: []
                }));
            } else {
                const index = Number(value);
                const targetIndex = this.state.selected.findIndex(val => val === index);
                if(targetIndex > -1) {
                    this.update((state) => ({
                        ...state,
                        selected: [
                            ...state.selected.slice(0,targetIndex),
                            ...state.selected.slice(targetIndex+1)
                        ]
                    }))
                }
            }
        }
        }
    }
    renderCartItems(cartItemTable, cart) {
       
        const cartItemHead = element('thead',{
            props: {
                className: 'cart_detail_items_tablehead'
            }
        });
        const cartItemHeadRow = element('tr');
        ["전체선택","사진","상품 정보", "수량"].forEach((theadName, index) => {
            if(index === 0) {
                const firstThead = element('th',{
                    props: {
                        className: 'cart_detail_items_table_th'
                    },
                });
                renderer(firstThead, element('input', {
                    props: {
                        type: 'checkbox',
                        value: 'all',
                        checked: this.getCartItems().length === this.state.selected.length
                    },
                    handler: {
                        onInput: this.onInput
                    }
                }));
                renderer(firstThead, element('p', {
                    content: theadName
                }));
                renderer(cartItemHeadRow, firstThead);
            } else {
                renderer(cartItemHeadRow, element('th', {
                    props: {
                        className: 'cart_detail_items_table_th'
                    },
                    content: theadName
                }));
            }
        });
        renderer(cartItemHead,cartItemHeadRow);
        renderer(cartItemTable,cartItemHead);
        const cartItemList = element('tbody',{
            props: {
                className: 'cart_detail_item_list'
            }
        }); 
        cart.forEach(( cartItem, index ) => {
            renderer(cartItemList, new CartItem({
                tag: 'tr',
                props: {
                    className: 'cart_detail_item',
                    data: cartItem,
                    onInput: this.onInput,
                    index: String(index),
                    isChecked: this.state.selected.includes(index)
                }
            }));
        });
        renderer(cartItemTable, cartItemList);
    }
    removeSelectedItem() {
        const newCart = [...this.observable.getState().cart];
        const selected = this.state.selected;
        selected.forEach(( index ) => {
            newCart.splice(index,1);
        });
        this.observable.update({
            cart: newCart
        });
    }
    getHtml() {
        const container = this.container;
        const cart = this.getCartItems();
        // inner container 
        const innerContainer = element('content', {
            props: {
                className: 'cart_inner_container'
            }
        });
       
        // title content
        const titleContent = element('div', {
            props: {
                className: 'cart_title_container'
            }
        });
        renderer(titleContent, new Icon({
            iconName: 'fa-shopping-cart',
            className: 'cart_title_icon',
        }));
        renderer(titleContent, element('h1', {
            props :{

            },
            content: '장바구니'
        }));
        renderer(innerContainer,titleContent);

        // render cart items
        
        // if the cart is empty
        if(cart.length ===0 ) {
            const cartEmptyContainer = element('div',{
                props : {
                    className: 'cart_empty_container'
                }
            });
            renderer(cartEmptyContainer, element('h3',{
                props : {
                    className: 'cart_empty_message'
                },
                content: '장바구니에 담으신 물건이 없습니다.'
            }));
            renderer(innerContainer,cartEmptyContainer);
            
            // if not
        } else {
            const cartItemTable = element('table', {
                props: {
                    className: 'cart_detail_items_table',
                    id: 'cart_detail_items_table'
                }
            });
            this.renderCartItems(cartItemTable,cart);
            renderer(innerContainer,cartItemTable);
            
            if(this.state.selected.length > 0) {
                const prices = element('div',{
                    props: {
                        className: 'cart_detail_prices'
                    }
                });
                const total = this.state.selected.reduce((acc,curr) => {
                    const currAmount= this.getCartItems()[curr].amount
                    return acc +currAmount
                }, 0);
                renderer(prices, element('p',{
                    props: {
                        className: 'cart_detail_total_amount',
                    },
                    content: `선택하신 상품들의 총액: <span>${numToWon(total)}</span>`
                }));
                renderer(innerContainer,prices);
            }
            const buttons = element('div', {
                props: {
                    className: 'cart_detail_buttons'
                },
                handler: {
                    onClick: this.removeSelectedItem
                }
            });
            renderer(buttons, element('button',{
                props: {
                    className: 'cart_detail_button delete'
                },
                content: '삭제'
            }));
            renderer(buttons, element('button',{
                props: {
                    className: 'cart_detail_button purchase'
                },
                content: '선택한 상품 구매'
            }));
            renderer(innerContainer,buttons);
        }

        renderer(container,innerContainer);

        return container;
    }
}