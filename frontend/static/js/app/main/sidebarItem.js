import Component from '../../component/component.js';
import element from '../../component/element.js';
import renderer from '../../component/renderer.js';
import Icon from '../icon/index.js';

export default class extends Component {
    constructor(props) {
        super(props);
        this.onMouseover = this.onMouseover.bind(this);
        this.onMouseleave = this.onMouseleave.bind(this);
    }
    onMouseover(e) {
        this.props.onMouseover(e);
    }
    onMouseleave(e) {
        this.props.onMouseleave(e);
    }
    getHtml() {
        const container = this.container;
        renderer(container, new Icon({
            iconName: this.props.iconName,
            className: 'sidebar_item_icon',
        }));
        return container;
    }
}