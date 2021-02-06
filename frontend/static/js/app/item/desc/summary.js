import Component from '../../../component/component.js';
import renderer from '../../../component/renderer.js';
import element from '../../../component/element.js';
import select from '../../../component/select.js';
import starGazer from '../../../component/starGazer.js';
import NumToWon from '../../utils/numToWon.js';
import GetDiscount from '../../utils/getDiscount.js';
import CheckBox from '../../../component/checkbox.js';
import DeliveryInfo from './deliveryInfo.js';

export default class extends Component {
    constructor(props) {
        super(props);
    }
    getHtml() {
        const container = this.container;
        const { data: {saleprices, prices,descriptions, isMissile},comments, } = this.props;
        // calculate average rating from the comments  of the product
        const avgRating = Math.floor(comments.reduce((acc,curr) => acc + curr.score,0) / this.props.comments.length);
        const title = element('li',{
            props: {
                className: 'item_detail_desc_summary title'
            }
        });
        renderer(title, element('h3', {
            content: this.props.data.name
        }));
        const starsContainer = element('div', {
            props: {
                className: 'item_detail_desc_summary_starholder'
            }
        });
        renderer(title, element('span', {
            content: '평균 평점:'
        }))
        starGazer(starsContainer, avgRating);
        renderer(title, starsContainer);

        // render prices with orginalprices
        const price = element('li',{
            props: {
                className: 'item_detail_desc_summary price'
            }
        });
        const originalPrices = element('ul', {
            props: {
                className: 'originalPrices'
            }
        });
        prices.forEach((price,i) => {
            const li = element('li');
            const discount = element('span', {
                content: GetDiscount(price,saleprices[i]) + '%',
                props: {
                    className: 'discount'
                }
            })
            const span = element('span', {
                // function change price float to WON unit
                content: NumToWon(price)
            });
            renderer(li,discount);
            renderer(li,span);
            renderer(originalPrices, li);
        });
        renderer(price,originalPrices);

        const salePrices = element('ul', {
            props: {
                className: 'salePrices'
            }
        });
        saleprices.forEach(price => {
            const li = element('li');
            
            const span = element('span', {
                content: NumToWon(price)
            });
            renderer(li,span);
            renderer(salePrices, li);
        });
        renderer(price,salePrices);
        renderer(price, new DeliveryInfo({
            props: {
                className: 'item_detail_delivery',
                isMissile
            }
        }));
        // Item options
        if(descriptions.length > 1) {
            
        }
        //const itemSelector = select(['itm1','itm2','itm3']);
        //renderer(price,itemSelector);
        renderer(container, title);
        renderer(container, price);
        
        return container;
    }
}