import Component from '../../../component/component.js';
import element from '../../../component/element.js';
import renderer from '../../../component/renderer.js';
import Info from './info.js';
import Comments from './comments.js';
import Refund from './refund.js';
import Ask from './ask.js';
import { getObservable } from '../../../index.js';
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
            unsubscribers: []
        }
    }
    afterMount() {
        this.observe();
    }
    // 컴퍼넌트가 언마운트시 옵저버들 언옵저브로 클린업.
    afterUnMount() {
        this.state.unsubscribers.forEach( unsubscriber => unsubscriber());
    }
    // 인덱스를 받고 이벤트 리스너를 반환하는 클로져
    onClickTab(i) {
        const id  =this.props.id;
        return function(e) { 
            const container = document.getElementById(id);
            const tabs = container.getElementsByClassName('item_detail_tab');
            Array.from(tabs).forEach( (tab,tabIndex) => tab.classList.toggle('selected', tabIndex === i));
            const possibleTarget = container.getElementsByClassName('item_detail_tab_content');
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
                // 새로운 엔트리가 들어왔을시, 인터섹팅인 경우
                if(entry.isIntersecting) {
                    const id = Number(entry.target.dataset.id);
                    const tabArr = Array.from(tabs);
                    // 모든 탭을 순회하며 토글.
                    tabArr.forEach((tab,index) => tab.classList.toggle('selected', index == id));
                }
            })
        },{
            threshold: 0.5,
        });
        Array.from(tabContents).forEach(tab => {
            observer.observe(tab);
            this.state.unsubscribers.push(() => observer.unobserve(tab));
        });
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
                    id: "0"
                }
            },
            isNoLifeCycle: true
        }));
   
        renderer(container, new Comments({
            tag:'div',
            props: {
                className: 'item_detail_tab_content comments',
                id: 'item_detail_comments',
                comments: this.props.comments,
                hasComment: this.props.hasComment,
                productName: this.props.data.name,
                dataset: {
                    id: "1"
                },
            },
            observable: getObservable(),
            router: this.router
        }));
        
        renderer(container,new Ask({
            tag: 'div',
            props: {
                className:  'item_detail_tab_content ask',
                dataset: {
                    id: "2"
                },
            },
            observable: getObservable(),
        }));
        renderer(container,Refund());
        return container;
    }
}