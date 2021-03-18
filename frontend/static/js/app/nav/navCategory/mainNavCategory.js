import Component from '../../../component/component.js';
import element from '../../../component/element.js';
import renderer from '../../../component/renderer.js';
import Link from '../../../router/link.js';
import CategoryConvert from '../../utils/categoryConversion.js';
const primeCategory = ['패션','여행','전자제품','홈데코','서적','캠핑','신선식품'];
const secondaryCategory = [
    ['남성','여성','신발'],
    ['유럽','아시아','아프리카'],
    ['컴퓨터','TV','스마트폰'],
    ['가구','화분'],
    ['프로그래밍','교양'],
    ['텐트','바베큐'],
    ['해산물','밀키트']
];
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle:false
        }
        this.subscriber = this.subscriber.bind(this);
        this.onClick = this.onClick.bind(this);
        this.observable.subscribe(this.subscriber);
        window.addEventListener('click',this.onClick,true);
    }
    subscriber(state) {
        const oldState = this.state.toggle;
        const newState = state.mainNav.isCategoryNavOn;
        if(oldState !== newState) {
            this.setState({
                toggle: newState
            });
        }
    }
    renderSubList(i,target,category) {
        const items = secondaryCategory[i];
        const list = element('ul', {
            props: {
                className: 'main_nav_category_sublist'
            }
        })
        items.forEach( item => {
            renderer(list,new Link({
                props: {
                    className: 'main_nav_category_list_subcategory',
                    children: element('p', {
                        content: item
                    }),
                    href: `/items/${category}?subcategory=${item}`
                }
            }))
        });
        renderer(target,list);
    }
    renderList(target) {
        primeCategory.forEach((category,index) => {
            const list = element('ul',{
                props: {
                    className: 'main_nav_category_list'
                }
            });
            renderer(list, new Link({
                props: {
                    href: `/items/${CategoryConvert[category]}`,
                    children: element('h3', {
                        content: category
                    }),
                    className: 'main_nav_category_list_category_title'
                }
            }));
            this.renderSubList(index, list,CategoryConvert[category]);
            renderer(target,list);
        });
    }
    onClick(e) {
        const container = document.getElementById(this.props.id);
        const excepts = ['main_nav_category on','main_nav_category_list']
        if(container.classList.contains('on')) {
            if(!excepts.includes(e.target.className)) {
                container.classList.remove('on');
            }
        }
    }
    getHtml() {
        const container = this.container;
        container.classList.toggle('on',this.state.toggle);
        this.renderList(container);
        return container;
    }
}