import Component from '../../../component/component.js';
import element from '../../../component/element.js';
import renderer from '../../../component/renderer.js';
import Info from './info.js';
import Comments from './comments.js';
import Refund from './refund.js';
export default class extends Component {
    constructor(props) {
        super(props);
        this.onClickTab = this.onClickTab.bind(this);
        this.observe = this.observe.bind(this);
        this.state = {
            tabNames: [
                '정보',
                '상품평',
                '상품문의',
                '교환/반품문의'
            ],
        }
    }
    afterMount() {
        this.observe();
    }
    onClickTab(i) {
        const id  =this.props.id;
        return function(e) { 
            const container = document.getElementById(id);
            const tabs = container.getElementsByClassName('item_detail_tab');
            Array.from(tabs).forEach( (tab,tabIndex) => tab.classList.toggle('selected', tabIndex === i));
            const possibleTarget = container.getElementsByClassName('item_detail_tab_content');
            console.log(id,possibleTarget); 
            possibleTarget[i].scrollIntoView({behavior : 'smooth' });
        }
    }
    observe() {
        const container = document.getElementById(this.props.id);
        const list = container.querySelector('.item_detail_tab_list');
        const tabs = container.getElementsByClassName('item_detail_tab');
        const tabContents = container.getElementsByClassName('item_detail_tab_content');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    const id = Number(entry.target.dataset.id);
                    const tabArr = Array.from(tabs);
                    tabArr.forEach((tab,index) => tab.classList.toggle('selected', index == id));
                }
            })
        },{
            threshold: 0.2,
        });
        Array.from(tabContents).forEach(tab => observer.observe(tab));
    }
    getHtml() {
        const container = this.container;
        const tabList = element('ul',{
            props: {
                className: 'item_detail_tab_list'
            }
        });
        this.state.tabNames.forEach((tabName,i) =>
                renderer(tabList,element('li', {
                    props: {
                        className: `item_detail_tab _${i} ${ i ===0 ? 'selected' :''}`,
                   
                    },
                    content: tabName,
                    handler: {
                        onClick: this.onClickTab(i)
                    }

                }))
        );
        renderer(container, tabList);
        renderer(container, new Info({
            props: {
                className: 'item_detail_tab_content info',
                data: this.props.data,
                dataset: {
                    id: 0
                }
            },
            isNoLifeCycle: true
        }));
   
        renderer(container, new Comments({
            tag:'content',
            props: {
                className: 'item_detail_tab_content comments',
                id: 'item_detail_comments',
                comments: this.props.comments,
                dataset: {
                    id: 1
                }
            },
            router: this.router
        }));
        renderer(container, element('div', {
            props: {
                className:  'item_detail_tab_content seller',
                dataset: {
                    id: 2
                }
            }
        }));
        renderer(container,Refund());
        return container;
    }
}