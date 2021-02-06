import Component from '../../component/component.js';
import element from '../../component/element.js';
import renderer from '../../component/renderer.js';

export default class extends Component {
    constructor(props) {
        super(props);
        this.subscriber = this.subscriber.bind(this);
        this.observable.subscribe(this.subscriber);
    }
    subscriber(state) {
        const selected = state.itemSection.selectedSection;
        const target = document.getElementById('app_main').getElementsByClassName(this.props.className)[0];
       
        target.classList.toggle('selected',selected=== this.props.dataset.id )
        //container.classList.toggle('selected',selected ===id )
    }
    getHtml() {
        const container = this.container;
        const wrapper = element('section', {
            props: {
                className: 'icon_section_wrapper'
            }
        })
        renderer(wrapper, element('h1', {
            content: this.props.category
        }));
        renderer(container,wrapper);
        return container;
    }
}