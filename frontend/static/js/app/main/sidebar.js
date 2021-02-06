import Component from '../../component/component.js';
import element from '../../component/element.js';
import renderer from '../../component/renderer.js';
import Item from './sidebarItem.js';
import { iconList } from '../utils/index.js';


export default class extends Component {
    constructor(props) {
        super(props);
        this.subscriber = this.subscriber.bind(this);
        this.initObserver = this.initObserver.bind(this);
        this.onClick = this.onClick.bind(this);
        this.observable.subscribe(this.subscriber);
    }
    afterMount() {
        this.initObserver();
    }
    subscriber(state) {
        const selected = state.itemSection.selectedSection;
        if(selected > -1) {
            const container = document.getElementById(this.props.id);
            const sidebarItems = container.getElementsByClassName('sidebar_item');
            for(let i =0; i < sidebarItems.length; i++) {
                sidebarItems[i].classList.toggle('on',i === selected);
            }
        }
    }
    initObserver() {
        const target = document.getElementById(this.props.id);
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            target.classList.toggle('on',entry.isIntersecting);
        },{
            threshold: 1
        });
        observer.observe(target);
    }
    onClick(index) {
        return function(e) {
            const items = document.getElementById('main_items_section').children;
            const target = items[index];
            target.scrollIntoView();
            
        }
    }
    getHtml() {
        const container = this.container;
        iconList.forEach(([category, iconName],index)=> {
            renderer(container, new Item({
                props: {
                    className: `sidebar_item category${index+1}`,
                    category,
                    iconName,
                    index,
                    handler: {
                        onClick: this.onClick(index)
                    }
                },
            }))
        });
        return container;
    }
}