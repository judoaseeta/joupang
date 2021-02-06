import Component from '../component/component.js';
import element from '../component/element.js';
import renderer from '../component/renderer.js';
// components
import Slider from './slider/index.js';
import SideBar from './main/sidebar.js';
import Items from './main/items.js';
import LoadingPage from '../component/loadingPage.js';

import { getObservable } from '../index.js';
export default class extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            ...this.state,
            isDataLoaded: false,
        }
        this.getMainItems = this.getMainItems.bind(this);
    }
    afterMount() {
        this.getMainItems();
    }
    async getMainItems() {
        try {
            const result = await fetch('https://7iqv0ly5rb.execute-api.ap-northeast-2.amazonaws.com/dev/getmains');
            const parsed = await result.json();
            const newState = {

            }
            parsed.items.map((item) => {
                newState[item.SK] = item;
            });
            this.update((state) => ({
                ...state,
                isDataLoaded: true,
                ...newState,
            }));
        } catch(e) {
            console.log(e);
            alert('데이터 로딩중에 문제가 발생하였습니다.\n 잠시 뒤에 다시 접속해보세요')
        }
    }
    getHtml() {
        const container = this.container;
      
        if(this.state.isDataLoaded) {
            renderer(container, new Slider({
                tag:'section',
                props: {
                    id: 'main_slider',
                    className:'slider'
                },
                state: {
                    data: this.state.slider
                },
                observable: getObservable()
            }));
            /*
            
            */
            const items_container = element('section', {
                props: {
                    className: 'items_container'
                }
            }); 
            renderer(items_container, new SideBar({
                props: {
                    id: 'main_side_bar',
                    className: 'sidebar'
                },
                state: {
                    data: this.state.sidebar
                },
                observable: getObservable()
            }));
            renderer(items_container, new Items({
                tag:'ul',
                props: {
                    className: 'items_section',
                    id:'main_items_section',
                },
                observable: getObservable()
            }));
            renderer(container,items_container);
        } else {
           renderer(container, LoadingPage());
        }
        return container;
    }
    onClick(e) {
        this.update({
            number: Math.random() * 30
        })
    }
}