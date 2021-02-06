import Component from '../component/component.js';
import element from '../component/element.js';
import renderer from '../component/renderer.js';

export default class Missile extends Component {
    constructor(props) {
        super(props);
    }
    getHtml() {
        return `<h4>미사일 배송 아이템</h4>`
    }
}