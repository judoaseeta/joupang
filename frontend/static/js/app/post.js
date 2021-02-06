import {
    Component,
    renderer,
    element
} from '../component/index.js';

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.tag = 'li'
    }
    getHtml() {
        const container =document.createElement(this.tag);
        renderer(container, element('h4',{
            content: this.state.post.title
        }));
        renderer(container, element('p',{
            content: this.state.post.createdAt
        }));
        
        return container;
        
    }
}
