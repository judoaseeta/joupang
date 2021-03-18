import Component from '../../component/component.js';
import element from '../../component/element.js';
import renderer from '../../component/renderer.js';
import Icon from '../icon/index.js';
import debounce from '../utils/debounce.js';

export default class extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        const container = document.getElementById(this.props.id);
        container.classList.add('off');
        debounce(200, () => {
            container.style.display = 'none';
        })();
    }
    getHtml() {
        const container = this.container;
        renderer(container, new Icon({
            iconName: 'fa-window-close',
            className: 'close',
            handler: {
                onClick: this.onClick
            }
        }))
        const overlay = element('content', {
            props: {
                className: 'topAd_overlay'
            }
        });
        renderer(overlay, element('h1', {
            props: {
                className: 'title'
            },
            content: '프론트엔드 (자바스크립트/타입스크립트) 엔지니어를 고용하고 싶으신가요???'
        }));
        const contactList = element('ul', {
            props: {
                className: 'contact_list'
            }
        })
        renderer(container,overlay);
        return container;
    }
}