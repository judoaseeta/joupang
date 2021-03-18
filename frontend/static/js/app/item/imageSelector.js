import Component from '../../component/component.js';
import element from '../../component/element.js';
import renderer from '../../component/renderer.js';
import image from './image.js';

export default class extends Component {
    constructor(props) {
        super(props);
        this.container.addEventListener('click', this.props.onClick);
    }
    getHtml() {
        const container = this.container;
        const { images } = this.props;
        images.forEach( (image,index) => {
            renderer(container, element('li', {
                props: {
                    className: 'item_detail_image_selector',
                    style: {
                        backgroundImage: `url(${image})`
                    },
                    dataset: {
                        id: String(index)
                    }
                }
            }));
        });
        return container;

    }
}