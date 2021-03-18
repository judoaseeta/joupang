import Component from '../../component/component.js';
import element from '../../component/element.js';
import renderer from '../../component/renderer.js';
import Link from '../../router/link.js';

const navList = [
    ['신속 배송 식품','/items/food?isMissile=true'],
    ['신상 의류','/items/fashion?dateSort=late'],
    ['서적 할인전', '/items/books?priceSort=low']
]
export default class extends Component {
    constructor(props) {
        super(props);
    }
    getHtml() {
        const container = this.container;
        navList.forEach( nav => {
            renderer(container, new Link({
                props: {
                    href: nav[1],
                className: 'middleNav_link',
                children: nav[0]
                }
            }));
        });
        return container;
    }
}