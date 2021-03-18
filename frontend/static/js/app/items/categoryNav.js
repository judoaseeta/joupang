import element from '../../component/element.js';
import renderer from '../../component/renderer.js';
import Component from '../../component/component.js';
import Link from '../../router/link.js';

import routes from '../../routes.js';
export default class extends Component {
    constructor(props) {
        super(props);
    }
    getHtml() {
        const container = this.container;
        const category = this.router.getParams() ?  this.router.getParams().category: undefined;
        // check if queries 
        //    then check if subcategory 
        //        then decode subcategory
        //        or undefined
        //    or undefined
        const sub = this.router.getQueries() 
            ?  !!this.router.getQueries().subcategory 
            ? decodeURIComponent(this.router.getQueries().subcategory ) 
            : undefined
            :undefined;
        Object.keys(routes).forEach( route => {
            const routeSplit = route.split(':');
            const categoryItem = element('li', {
                props: {
                    className: 'items_category_item'
                }
            });
            const categoryName = new Link({
                props: {
                    className: `items_category_category_link ${routeSplit[1]}`,
                    children: routeSplit[0],
                    href: `/items/${routeSplit[1]}`,
                    active:category ? category === routeSplit[1] : false,
                    activeClassName: 'current'
                },
                isNoLifeCycle: true
            });
            renderer(categoryItem,categoryName);
            const subCategories = element('ul',{
                props: {
                    className: 'items_category_subcategories'
                }
            });
            routes[route].forEach(subroute => {
                const subCategory = element('li', {
                    props: {
                        className: 'items_category_subcategory'
                    }
                });
                renderer(subCategory,new Link({
                    props: {
                        className: 'items_category_subcategory_link',
                        children: subroute,
                        href: `/items/${routeSplit[1]}?subcategory=${encodeURIComponent(subroute)}`,
                        active: sub ? sub === subroute : false,
                        activeClassName: 'current'
                    },
                    isNoLifeCycle: true
                }))
                renderer(subCategories,subCategory);
            });
            renderer(categoryItem,subCategories);
            renderer(container,categoryItem)
        });
        return container;
    }
}