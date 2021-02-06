import Component from '../../component/component.js';
import element from '../../component/element.js';
import renderer from '../../component/renderer.js';
import Icon from '../icon/index.js';
import SliderItem from './item.js';
import Selectors from './selectors.js';
export default class Slider extends Component {
    constructor(props) {
        super(props);
        this.sliderState = {
            currPage: 0,
        }
        // binding methods
        this.getItemsForCategory = this.getItemsForCategory.bind(this);
        this.slide = this.slide.bind(this);
        this.slideBySelector = this.slideBySelector.bind(this);
        this.styleUpdate = this.styleUpdate.bind(this);
        this.getCurrentPage = this.getCurrentPage.bind(this);
        this.updateSliderState = this.updateSliderState.bind(this);
        this.translateList = this.translateList.bind(this);
    }
    afterMount() {

    }
    async getItemsForCategory() {

    }
    styleUpdate() {
        const slider = document.getElementById(this.props.id);
        const currPage = this.getCurrentPage();
        const length = this.state.data.images.length;
        const leftButton = slider.getElementsByClassName('arrow_icon left')[0];
        const rightButton = slider.getElementsByClassName('arrow_icon right')[0];
        const title = slider.getElementsByClassName('slider_item_title');

        leftButton.classList.toggle('faded', currPage === 0);
        rightButton.classList.toggle('faded', currPage === length-1);
        for(let i =0; i < title.length; i++) {
            title[i].classList.toggle('in', currPage === i);    
        }
    }
    translateList() {
        const slider = document.getElementById(this.props.id);
        const list = slider.querySelector('.slider_list');
        list.style.transform = `translate3d(calc(var( --sliderWidth) * -${this.getCurrentPage()}),0,0)`;
    }
    /// onClick handler
    slide(e) {
        // currentTarget: arrow button
        //get direction by parsing its className
        const direction = e.currentTarget.className.split(' ')[1];

        if(this.props.id.includes('main')) {
            const currPage = this.getCurrentPage();
            if(direction === 'right' && this.state.data.images.length -1 > currPage
            ){
                this.updateSliderState(currPage+1);
                this.translateList();
                this.styleUpdate();
            } else if(direction === 'left' && currPage !== 0) {
                
                this.updateSliderState(currPage-1);
                this.translateList();
                this.styleUpdate();
            }        
        }
    }
    // method will be propagated to selectors component
    slideBySelector(i) {
        const currPage = this.getCurrentPage();
        const index = Number(i);
        if(index !== currPage) {
            if(this.props.id.includes('main')) {
                this.updateSliderState(index);
                this.translateList();
                this.styleUpdate();
            }
        }
    }
    getCurrentPage() {
        return this.observable.getState().sliderState.currPage;
    }
    // method to update sliderstate globally
    updateSliderState(index) {
        this.observable.update((state) => ({
            ...state,
            sliderState: {
                currPage: index
            }
        }))
    }

    getHtml() {
        const sliderContainer = this.container;
        const sliderWrapper = element('div', {
            props: {
                className: 'slider_wrapper'
            }
        })
        // render buttons
        renderer(sliderWrapper, new Icon({
            iconName: 'fa-arrow-left',
            className: 'arrow_icon left faded',
            handler: {
                onClick: this.slide
            }
        }));
        renderer(sliderWrapper, new Icon({
            iconName: 'fa-arrow-right',
            className: 'arrow_icon right',
            handler: {
                onClick: this.slide
            }
        }));
        // render selectors
        renderer(sliderWrapper, new Selectors({
            tag: 'ul',
            props: {
                className: 'slider_selectors',
                id: 'slider_selectors',
                slideBySelector: this.slideBySelector,
            },
            state: {
                images: this.state.data.images,
                contents: this.state.data.imageContents,
                contentColors:this.state.data.imageContentColors
            },
            observable: this.observable,
            isNoLifeCycle: true
        }))
        const sliderList = element('ul', {
            props: {
                className: 'slider_list'
            }
        });
        // render slider items
        this.state.data.images.forEach((data,i) => {
            renderer(sliderList, new SliderItem({
                tag: 'li',
                props: {
                    className: 'slider_item',
                    id: `slider_item${i}`,
                    index: i
                },
                state: {
                    title: this.state.data.imageTitles[i],
                    titleColor: this.state.data.imageTitleColors[i],
                    image: this.state.data.images[i],
                    preloadImage: this.state.data.preloadImages[i],
                    content: this.state.data.imageContents[i],
                    contentColor:this.state.data.imageContentColors[i]
                },
            }));    
        })

        renderer(sliderWrapper,sliderList);
        renderer(sliderContainer, sliderWrapper);
        return sliderContainer;
    }
}