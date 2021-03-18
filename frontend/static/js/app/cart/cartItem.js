import Component from '../../component/component.js';
import element from '../../component/element.js';
import renderer from '../../component/renderer.js';
import NumToWon from '../utils/numToWon.js';

export default class extends Component {
    constructor(props) {
        super(props);
    }
    getHtml() {
    const { amount,href, name, price, quantity, thumb_url} = this.props.data;
        const container = this.container;
        const checkBoxTd  = element('td',{

        });
        renderer(checkBoxTd, element('input', {
            props: {
                type: 'checkbox',
                className: 'cart_item_check',
                value: this.props.index,
                checked: this.props.isChecked
            },
            handler: {
                onInput: this.props.onInput
            }
        }));
        renderer(container,checkBoxTd);
        // thumbnail image
        const imageTd = element('td', {
            props: {
            }
        });
        renderer(imageTd, element('img',{
            props: {
                className: 'cart_detail_item_image',
                src: thumb_url,
                alt: name
            }
        }));
        renderer(container, imageTd);
        // information
        const information = element('td', {
            props: {
                className: 'cart_detail_item_info'
            }
        })
        //name
        renderer(information, element('p', {
            props: {

            },
            content: "상품명: " + name
        }));
        // price
        renderer(information, element('p', {
            props: {

            },
            content: `상품 가격: <span class="price">${NumToWon(price)}</span> / 총액: <span class="amount">${NumToWon(amount)}</span>`
        }));
        renderer(container,information);
         //quantity
        renderer(container, element('td', {
            content: String(quantity)
        }))
        return container;
    }
}