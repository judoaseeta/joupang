import Component from '../../component/component.js';
import element from '../../component/element.js';
import renderer from '../../component/renderer.js';
import select from '../../component/select.js';

export default class extends Component {
    constructor(props) {
        super(props);
        this.searchCategories = [
            '패션의류',
            '신선식품',
            '전자제품',
            '여행',
            '서적',
            '홈데코',
            '캠핑'
        ];
    }
    getHtml() {
        const container = this.container;
        const searchInput = element('input', {
            props: {
                className:'main_nav_search_input'
            }
        });
        const category = select(this.searchCategories);
        renderer(container, category);
        renderer(container,searchInput);
        return container;
    }
}