import Component from '../../component/component.js';
import element from '../../component/element.js';
import renderer from '../../component/renderer.js';

export default class extends Component {
    constructor(props) {
        super(props);
    }
    getHtml() {
        const container = this.container;
        const image_holder = element('div',{
            props: {
                className: 'image_holder'
            }
        });
        const door_wrapper = element('div', {
            props: {
                className: 'door_wrapper'
            }
        });
        renderer(door_wrapper, element('div', {
            props: {
                className:'door_side left'
            }
        }));
        renderer(door_wrapper, element('div', {
            props: {
                className:'door_side right'
            }
        }));
        renderer(image_holder,door_wrapper);
        const contents_holder = element('div',{
            props: {
                className: 'contents_holder'
            }
        });
        renderer(container,image_holder);
        renderer(container,contents_holder)
        return container;

    }
}