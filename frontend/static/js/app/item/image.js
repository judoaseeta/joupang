import Component from '../../component/component.js';
import element from '../../component/element.js';
import renderer from '../../component/renderer.js';
import asyncImage from '../utils/asyncImage.js';


export default class extends Component {
    constructor(props) {
        super(props);
        this.translateX = this.translateX.bind(this);
        this.onClick = this.onClick.bind(this);
        this.pageNum = 0;
        this.pageLimit = this.state.image_urls.length - 1;
        this.container.addEventListener('click',this.onClick);
    } 
    afterMount() {
    }
    onClick(e) {
        const wrapper = document.getElementById(this.props.id).querySelector('.item_detail_image_wrapper');

        const {width} = e.target.getBoundingClientRect();
        const halfWidth = width / 2;
        const from = e.offsetX;
        if(this.pageNum >= 0 && this.pageNum < this.pageLimit&& (from > halfWidth)) {
            this.translateX(wrapper, -(width * ++this.pageNum));
        } else if (this.pageNum > 0 &&(from < halfWidth)) {
            this.translateX(wrapper, -(width * --this.pageNum));
        }
    }
    getHtml() {
        const container = this.container;
        const wrapper = element('div',{
            props:{
                className: 'item_detail_image_wrapper'
            }
        });
        this.state.image_urls.forEach(url => {
            renderer(wrapper, element('img', {
                props: {
                    className: 'item_detail_image',
                    src: url,
                },
            }));
        });
        renderer(container, wrapper);
        return container;
    }
    translateX(element, deltaX, duration = 0.3, callback= null) {
        element.style.transform = `translate3d(${deltaX}px,0,0)`;
        element.style.transition = `transform ${duration}s`;
        if( duration > 0 && callback) {
            element.addEventListener('transitionend',callback, { once: true});
        }
    }
}