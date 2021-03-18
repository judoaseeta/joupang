import Component from '../../../component/component.js';
import element from '../../../component/element.js';
import renderer from '../../../component/renderer.js';
import Summary from './summary.js';
import Order from './order.js';

import { getObservable } from '../../../index.js';
export default class extends Component {
    constructor(props) {
        super(props);
    }
    getHtml() {
        const container = this.container;
        renderer(container,new Summary({
            tag: 'ul',
            props: {
                className: 'item_detail_desc_summary',
                data: this.props.data,
                comments: this.props.comments
            }
        }));
        renderer(container,new Order({
            tag: 'form',
            props: {
                className: 'item_detail_desc_order',
                data: this.props.data,
            },
            observable: getObservable(),
            router: this.router
        }));
        return container;
    }
}