import Component from '../../component/component.js';
import element from '../../component/element.js';
import renderer from '../../component/renderer.js';
import Link from '../../router/link.js';

export default class extends Component {
    constructor(props) {
        super(props);
        this.getBreadCrumbItem = this.getBreadCrumbItem.bind(this);
        this.getBreadCrumbList = this.getBreadCrumbList.bind(this);
    }
    getBreadCrumbItem(category) {
        switch(category) {
            case 'fashion' :
                return '패션'
            case 'travel' :
                return '여행'
            case 'electronics' :
                return '전자제품'
            case 'books' :
                return '서적'
            case 'homedeco' :
                return '홈데코'
            case 'camping' :
                return '캠핑'
            case 'freshfood' :
                return '신선식품'
            default :
                return '카테고리'    
        }
    }
    getBreadCrumbList() {
        const category = this.router.getParams().category;
        const subCategory = this.props.subCategory;
        const itemId = this.router.getParams().itemId;
        return [
            [
                '/',
                '홈'
            ],
            [
                `/items/${category}`,
                this.getBreadCrumbItem(category)
            ],
            [
                `/items/${category}?subcategory=${subCategory}`,
                subCategory
            ],
            [
                `/item/${category}/${itemId}`, '현재 상품'
            ]

        ]
    }
    getHtml() {
        const container = this.container;
        this.getBreadCrumbList().forEach((crumb) => {
            const breadCrumb = element('li', {
                props: {
                    className: 'item_detail_breadcrumb'
                }
            });
            const link = new Link({
                props: {
                    className: 'item_detail_breadcrumb_link',
                    children: crumb[1],
                    href: crumb[0]
                }
            });
            renderer(breadCrumb,link);
            renderer(container,breadCrumb);
        })
        return container;
    }
}