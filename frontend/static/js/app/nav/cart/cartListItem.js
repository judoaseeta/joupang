import Component from '../../../component/component.js';
import element from '../../../component/element.js';
import renderer from '../../../component/renderer.js';
import Icon from '../../icon/index.js';

export default class extends Component {
    constructor(props) {
        super(props);
    }
    getHtml() {
        const container =  this.container;
        const { thumb_url, name, price,amount, quantity } = this.props.data;
        renderer(container, new Icon({
            iconName: 'fa-trash',
            className: 'main_nav_cart_list_item_remove',
            handler: {
                onClick:this.props.removeItem(this.props.index)
            }
        }));
        console.log(this.props.data);
        //썸네일 이미지
        const thumbnail = element('img', {
            props: {
                className: 'main_nav_cart_list_thumbnail',
                src: thumb_url
            },
        });
        renderer(container,thumbnail);
        // 테이블로 카트아이템 표시
        const table = element('table', {
            props: {
                className: 'main_nav_cart_item_table'
            }
        });
        const tbody = element('tbody');
        const firstRow = element('tr', {
            props: {
                className: 'main_nav_cart_item_tr'
            }
        });
        ['상품명','가격','수량','금액'].forEach((headName) => {
            renderer(firstRow, element('th',{
                props: {
                    className: 'main_nav_cart_item_th'
                },
                content: headName
            }));
        });
        const secondRow = element('tr', {
            props: {
                className: 'main_nav_cart_item_tr'
            }
        });
        renderer(secondRow, element('td',{
            props: {
                className: 'main_nav_cart_item_td'
            },
            content: name
        }));
        renderer(secondRow, element('td',{
            props: {
                className: 'main_nav_cart_item_td'
            },
            content: String(price)
        }));
        renderer(secondRow, element('td',{
            props: {
                className: 'main_nav_cart_item_td'
            },
            content: String(quantity)
        }));
        renderer(secondRow, element('td',{
            props: {
                className: 'main_nav_cart_item_td'
            },
            content: String(amount)
        }));
        renderer(tbody,firstRow);
        renderer(tbody,secondRow);
        renderer(table,tbody);
        renderer(container, table);
        return container;
    }
}