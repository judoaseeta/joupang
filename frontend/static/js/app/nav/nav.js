import Component from '../../component/component.js';
import element from '../../component/element.js';
import renderer from '../../component/renderer.js';
import Icon from '../icon/index.js';
import { getObservable } from '../../index.js';

// Components
import MainNavCategory from './navCategory/mainNavCategory.js';
import Logo from './logo.js';
import Search from './search.js';
import Cart from './cart/cartIndicator.js';
import MiddleNav from './middleNav.js';

export default class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCategoryNavOn: false
        };
        this.onCategoryClick = this.onCategoryClick.bind(this);
    }
    onCategoryClick() {
        this.observable.update( state => ({
            ...state,
            mainNav: {
                isCategoryNavOn: !state.mainNav.isCategoryNavOn
            }
        }));
    }
    getHtml() {
        const container = this.container;
        const categoryHolder = element('div', {
            props: {
                className: 'main_nav_category_holder'
            }
        });
        renderer(categoryHolder, new MainNavCategory({
            tag:'section',
            props: {
                className: 'main_nav_category',
                id: 'main_nav_category'
            },
            observable: this.observable
        }))
        renderer(categoryHolder, new Icon({
            iconName: 'fa-bars',
            className: 'main_nav_category_btn',
            handler: {
                onClick: this.onCategoryClick
            }
        }))
        renderer(container,categoryHolder);
        const middle = element('div', {
            props: {
                className: 'main_nav_middle'
            }
        });
        const middle_upper = element('div', {
            props: {
                className: 'main_nav_middle_upper'
            }
        });
        renderer(middle_upper,Logo);
        renderer(middle_upper, new Search({
            tag: 'form',
            props: {
                className: 'main_nav_search',
                id: 'main_nav_search'
            }
        }));
        renderer(middle,middle_upper);
        renderer(middle, new MiddleNav({
            tag: 'nav',
            props: {
                className: 'middleNav'
            }
        }))
        renderer(container, middle);
        renderer(container,new Cart({
            props: {
                className: 'main_nav_cart',
                id: 'main_nav_cart'
            },
            observable: getObservable()
        }));
        return container;
    }
}