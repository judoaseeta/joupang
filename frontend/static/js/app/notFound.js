import Component from '../component/component.js';
import element from '../component/element.js';
import renderer from '../component/renderer.js';

export default class NotFound extends Component {
    constructor(props) {
        super(props);
    }
    getHtml() {
        renderer(this.container, `<h3>This is Not Found</h3>`)
        return this.container;
    }
}