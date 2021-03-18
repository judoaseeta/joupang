import Component from '../../../component/component.js';
import element from '../../../component/element.js';
import renderer from '../../../component/renderer.js';
import Icon from '../../icon/index.js';
import QuantityInput from '../../../component/quantityInput.js';
import CheckBox from '../../../component/checkbox.js';
import NumToWon from '../../utils/numToWon.js';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: this.props.data.isMultiItem ? -1 : 0,
            quantity: 1
        }
        this.onInput =  this.onInput.bind(this);
        this.quantityCallback = this.quantityCallback.bind(this);
        this.setStatus = this.setStatus.bind(this);
        this.onCartClick = this.onCartClick.bind(this);
        this.onPurchase = this.onPurchase.bind(this);
    }
    quantityCallback(value) {
        this.state = {
            ...this.state,
            quantity: Number(value)
        };
        this.setStatus();
    }
    setStatus() {
        const oldNode = document.getElementById('status_value');
        const {selectedItem ,quantity  } = this.state;
        const { saleprices } = this.props.data;
        const newNode = element('p', {
            props: {
                id: 'status_value'
            },
            content: `선택하신 상품의 총 가격은 <span>${NumToWon(saleprices[selectedItem] * quantity)}</span>입니다.`
        });
        oldNode.parentNode.replaceChild(newNode,oldNode);
    }
    onInput(e) {
        const checkBoxRegex = /checkbox/g;
        if(checkBoxRegex.test(e.target.id)) {
            const selectedItem =  Number(e.target.value);
            this.state = {
                ...this.state,
                selectedItem
            };
            const checkboxes = e.currentTarget.getElementsByClassName('checkbox_input');
            Array.from(checkboxes).forEach((checkbox,i) => {
                if(i === selectedItem) checkbox.checked = true;
                else checkbox.checked = false;
            });
            this.setStatus();
        }
    }
    onCartClick(e) {
        e.preventDefault();
        const {selectedItem ,quantity  } = this.state;
        if(selectedItem > -1) {
            const { saleprices,descriptions, thumb_urls,name } = this.props.data;
            const newItem = {
                name,
                amount: saleprices[selectedItem] * quantity,
                price: saleprices[selectedItem],
                thumb_url: thumb_urls[selectedItem],
                quantity,
                href:this.router.getCurrentRoute()
            }
            this.observable.update(state => ({
                ...state,
                cart: [...state.cart, newItem]
            }));
        }
    }
    onPurchase(e) {
        e.preventDefault();
    }
    getHtml() {
        const container = this.container;
        container.addEventListener('input',this.onInput);
      
        if(this.props.data.isMultiItem) {
            const ItemSelectors = element('div',{
                props: {
                    className : 'item_detail_order_selectors'
                }
            }); 
            this.props.data.descriptions.forEach( (item,index) => 
                renderer(ItemSelectors, CheckBox({
                    desc: item,
                    value: String(index),
                    src: this.props.data.thumb_urls[index]
                }))
            );
            renderer(container, ItemSelectors);
        }
        // container for buttons    
        const orderButtons = element('div',{
            props: {
                className: 'item_detail_order_buttons'
            }
        });
        // quantity
        const quantity = QuantityInput({
            defaultValue: 1,
            maxlength: 5,
            limit: 1,
            callback: this.quantityCallback
        });
        // icon for add cart
        const goToCart = element('button', {
            props: {
                className: 'item_detail_order_button cart'
            },
            handler: {
                onClick: this.onCartClick
            }
        });
        const cartIcon = new Icon({
            iconName:'fa-cart-plus',
            className: 'item_detail_order_button_icon cart'
        });
        renderer(goToCart,cartIcon);
        renderer(goToCart, '장바구니 담기');
        // icon for purchase immediately
        const purchase = element('button', {
            props: {
                className: 'item_detail_order_button purchase'
            },
            handler: {
                onClick: this.onPurchase
            }
        });
        const purchaseIcon = new Icon({
            iconName:'fa-credit-card',
            className: 'item_detail_order_button_icon purchase'
        });
        // status of order, to show price
        const status = element('div',{
            props: {
                className: 'item_detail_order_status'
            }
        });
        renderer(status, element('p', {
            props: {
                id: 'status_value'
            },
            content: '선택한 상품이 아직 없습니다.'
        }))
        renderer(purchase,purchaseIcon);
        renderer(purchase, '바로 구매')
        renderer(orderButtons,quantity);
        renderer(orderButtons,goToCart);
        renderer(orderButtons,purchase);
        renderer(container,orderButtons);
        renderer(container,status);
        return container;
    }
}