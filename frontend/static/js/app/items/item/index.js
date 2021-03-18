import element from '../../../component/element.js';
import renderer from '../../../component/renderer.js';
import Component from '../../../component/component.js';
import NumToWon from '../../utils/numToWon.js';
export default class extends Component {
    constructor(props){
        super(props);
        this.navigate = this.navigate.bind(this);
    }
    navigate() {
        const href = this.props.href;
        const ev = new CustomEvent('navigateTo', {
            detail: {
                href
            }
        });
        document.body.dispatchEvent(ev);
    } 
    getHtml() {
        const { data } = this.props;
        const container =  this.container;
        container.addEventListener('click', this.navigate);
        renderer(container, element('img', {
            props: {
                src: data.thumb_urls[0]
            }
        }));
        const desc = element('div', {
            props: {
                className: 'items_list_item_desc'
            }
        });
      
        renderer(desc, element('h4', {
            props: {
                className: 'items_list_item_title',
            },
            content: data.name
        }));
        renderer(desc, element('p', {
            props: {
                className: 'items_list_item_price'
            },
            content: `${NumToWon(data.saleprices[0])}`
        }))
        renderer(container, desc);
        return container;
    }
}
