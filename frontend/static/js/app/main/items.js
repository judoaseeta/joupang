import Component from '../../component/component.js';
import element from '../../component/element.js';
import renderer from '../../component/renderer.js';
import Item from '../item/item.js';
import ItemSection from './item_section.js';
import { iconList } from '../utils/index.js';
import { getObservable } from '../../index.js';
export default class extends Component {
    constructor(props) {
        super(props);
        this.initObservers = this.initObservers.bind(this);
        this.sideBarUpdate = this.sideBarUpdate.bind(this);
    }
    afterMount() {
        this.initObservers();
    }
    sideBarUpdate(intersectIndex) {
        this.observable.update({
            itemSection: {
                selectedSection: intersectIndex
            }
        });
    }
    initObservers() {
        const targets = document.getElementById(this.props.id).children;
        const observer = new IntersectionObserver((entries, observer) => {
            // const index = i;
           for(let i =0; i < entries.length; i++) {
                const entry = entries[i];
                const index =Number( entry.target.dataset.id);
                if(index === 0 && !entry.isIntersecting &&!entry.isVisible) {
                    this.sideBarUpdate(-1);
                }
                if(entry.isIntersecting) {
                    this.sideBarUpdate(index);
                }
           }
        },{
            threshold: 0.7
        });
        Array.from(targets).forEach( target => observer.observe(target));
    }
    getHtml() {
        const container = this.container;
        for(let i = 0; i < 7; i++) {
            renderer(container, new ItemSection({
                tag: 'li',
                props: {
                    className: `item_section category${i+1}`,
                    category: iconList[i][0],
                    dataset: {
                        id: i
                    }
                },
                observable: getObservable()
            }));
        }
        return container;
    }
}