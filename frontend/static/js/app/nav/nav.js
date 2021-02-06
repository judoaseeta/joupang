import Component from '../../component/component.js';
import element from '../../component/element.js';
import renderer from '../../component/renderer.js';
import link from '../../router/link.js';
import Icon from '../icon/index.js';
import { getObservable } from '../../index.js';

import Logo from './logo.js';
import Search from './search.js';
import Cart from './cartIndicator.js';
export default class Nav extends Component {
    constructor(props) {
        super(props);
    }
    getHtml() {
        const container = this.container;
        const categoryHolder = element('div', {
            props: {
                className: 'main_nav_category'
            }
        });
        renderer(categoryHolder, new Icon({
            iconName: 'fa-bars',
            className: 'main_nav_category_btn'
        }))
        renderer(container,categoryHolder);
        const middle = element('div', {
            props: {
                className: 'main_nav_middle'
            }
        });
        renderer(middle,Logo);
        renderer(middle, new Search({
            tag: 'form',
            props: {
                className: 'main_nav_search'
            }
        }));

        renderer(container, middle);
        renderer(container,new Cart({
            props: {
                className: 'main_nav_cart'
            },
            observable: getObservable()
        }));
        return container;
    }
}