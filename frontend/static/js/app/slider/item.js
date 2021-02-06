import Component from '../../component/component.js';
import element from '../../component/element.js';
import renderer from '../../component/renderer.js';
const setImageUrl = (url) => 
`url(${url}) `

export default class extends Component {
    constructor(props) {
        super(props);
        this.renderBackGroundImage = this.renderBackGroundImage.bind(this);
    }
    afterMount() {
        this.renderBackGroundImage();
    }
    async renderBackGroundImage() {
        const container = document.getElementById(this.props.id);
        const image = new Image();
        image.src = this.state.image;
        image.onload = () => {
            container.style.backgroundImage = setImageUrl(this.state.image);
        }
    }
    getHtml() {
        const container = element(this.tag, {
            props: {
                id: this.props.id,
                className: this.props.className,
                style: {
                    backgroundImage: setImageUrl(this.state.preloadImage)
                }
            },
        });
        const item_title = element('h4', {
            props: {
                className: this.props.index === 0 ? "slider_item_title in" : "slider_item_title",
                style: {
                    color: this.state.titleColor
                }
            },
            content: this.state.title
        });
        const item_content = element('p', {
            props: {
                className: "slider_item_content",
                style: {
                    color: this.state.contentColor
                }
            },
            content: this.state.content
        });
        renderer(container,item_title);
        renderer(container,item_content);
        return container;
    }
}