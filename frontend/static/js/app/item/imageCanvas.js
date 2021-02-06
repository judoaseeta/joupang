import Component from '../../component/component.js';
import element from '../../component/element.js';
import renderer from '../../component/renderer.js';

export default class extends Component {
    constructor(props) {
        super(props);
    }
    afterMount() {
        
    }
    getHtml() {
        return this.container;
    }
}