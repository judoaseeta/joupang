import Component from '../../component/component.js';
import element from '../../component/element.js';
import renderer from '../../component/renderer.js';
import selector from './selector.js';


export default class extends Component {
    constructor(props) {
        super(props);
        this.onMouseover =  this.onMouseover.bind(this);
        this.subscriber = this.subscriber.bind(this);
        this.updateSelector = this.updateSelector.bind(this);
        this.observable.subscribe(this.subscriber);
    }
    onMouseover(e) {
        const id =e.target.dataset.id;
        if(id) {
            this.props.slideBySelector(id);
        }
    }
    subscriber(state) {
        this.updateSelector(state.sliderState.currPage);
    }
    updateSelector(selectedPage) {
        const selectors = document.getElementById(this.props.id).children;
        for(let i =0; i< selectors.length; i++) {
            const isSamePage = Number(selectors[i].dataset.id) === selectedPage;
            const isAlreadySelected = selectors[i].classList.contains('selected');
            if(!isSamePage && isAlreadySelected) {
                selectors[i].classList.remove('selected');
            }
            if(isSamePage && !isAlreadySelected) {
                selectors[i].classList.add('selected');
            }
        }
    }
    getHtml() {
        const container = element(this.tag,{
            props: {
                id: this.props.id,
                className: this.props.className,
            },
            handler: {
                onMouseover:(e) => {
                    const id =e.target.dataset.id;
        if(id) {
            this.props.slideBySelector(id);
        }
                }
            }
        });
        this.state.images.forEach((image,i) => {
            renderer(container, selector({
                image,
                content: this.state.contents[i],
                id: i
            }))
        })
        return container;
    }
}