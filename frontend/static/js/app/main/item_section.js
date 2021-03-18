import Component from '../../component/component.js';
import element from '../../component/element.js';
import renderer from '../../component/renderer.js';

// component
import Testimonial from './testimonial.js';
import Link from '../../router/link.js';
// utilities
import categoryNums from './categoryNums.js';
import { api } from '../utils/index.js'; 
import isEqual from '../../state/isEqual.js';

export default class extends Component {
    constructor(props) {
        super(props);
        this.loadingComments = this.loadingComments.bind(this);
        this.subscriber = this.subscriber.bind(this);
        this.updateSection = this.updateSection.bind(this);
        this.renderTestimonial = this.renderTestimonial.bind(this);
        this.clearTestimonial = this.clearTestimonial.bind(this);
        this.observable.subscribe(this.subscriber);
    }
    afterMount() {
        if(!this.state.comments) {
            this.loadingComments(categoryNums[this.props.dataset.id]);
        }
    }
    afterUnMount() {
        this.observable.unsubscribe(this.subscriber);
    }
    async loadingComments(category) {
        const url = api.getTestimonialsByCategory(category);
        try {
            const result = await fetch(url);
            const parsed = await result.json();
            this.state.comments = parsed.items;
        } catch(e) {
            console.log(e);
            alert(e);
        }
    }
    subscriber(state) {
        // 현재 옵저버블스테이트에서 선택된 섹션 인덱스
        const selected = state.itemSection.selectedSection;
        this.updateSection(selected);
    }
    updateSection(selected) {
        const container = document.getElementById('app_main');
        if(container) {
            // 현재 섹션의 프랍으로 내려온 클래스네임으로  현재 섹션을 찾음.
            const target= container.getElementsByClassName(this.props.className)[0];
            // 선택된 섹션의 인덱스가 현재 섹션의 데이타셋 id와 같다면 css 토글.
            target.classList.toggle('selected',selected=== this.props.dataset.id );
            // 위와 마찬가지로 섹션 인덱스가 데이터셋 id와 같다면 비디오 플레이 아니면 포즈
            // 단 비디오 레디스테이트(동영상 데이터 로드 상태가) 3이상 일 때만
            const video = target.querySelector('.item_section_video');
            // 선택된 
            if(selected=== this.props.dataset.id && video.readyState >=3) {
                video.play();
                this.clearTestimonial();
                this.renderTestimonial();
            } else {
                video.pause();
                this.clearTestimonial();
            }   
        }
    }
    clearTestimonial() {
        const container = document.getElementById('app_main');
        // 현재 섹션의 프랍으로 내려온 클래스네임으로 현재 섹션을 찾음.
        const target= container.getElementsByClassName(this.props.className)[0];
        const testmonials = target.querySelector('.item_section_testimonials');
        if(testmonials) {
            testmonials.remove();
        }
    }
    renderTestimonial() {
        const container = document.getElementById('app_main');
        // 현재 섹션의 프랍으로 내려온 클래스네임으로 현재 섹션을 찾음.
        const target= container.getElementsByClassName(this.props.className)[0];
        const video = target.querySelector('.item_section_video');
        // 비디오의 넓이,높이를 구해 댓글 테스티 모니얼 사이즈 정함
        // fix size of a list of comments by divide width and height of a video.
        const { width, height } = video.getBoundingClientRect();
        const listRangeWidth = width / 4;
        const listRangeHeight = height / 2;
        // 댓글 렌더링할 시작 최소 위치.
        const listRangeHStart = width / 12;
        const listRangeVStart = height / 4;
        // wrapper of video which is a position 'relative' one.
        const videoWrapper = video.parentElement;
        renderer(videoWrapper, new Testimonial({
            tag: 'ul',
            props: {
                className: 'item_section_testimonials',
                style: {
                    right: `${listRangeHStart}px`,
                    top: `${listRangeVStart}px`,
                    width: `${listRangeWidth}px`,
                    height: `${listRangeHeight}px`
                },
                comments: this.state.comments,
                category: categoryNums[this.props.dataset.id]
            }
        }))

    }
    getHtml() {
        const container = this.container;
        const wrapper = element('section', {
            props: {
                className: 'item_section_wrapper'
            }
        })
        renderer(wrapper, new Link({
            props: {
                children:  element('h1', {
                    content: this.props.category,
                }),
                href: `items/${categoryNums[this.props.dataset.id]}`,
                linkState: {
                    scrollTop: 0
                }
            }
        }));
        renderer(container,wrapper);

        const videoWrapper = element('div',{
            props: {
                className: 'item_section_video_wrapper'
            }
        });
        const video = element('video', {
            props: {
                className: 'item_section_video',
                muted: true,
                loop: true,
                src: this.props.video
            }
        });
        renderer(videoWrapper, video);
        renderer(container, videoWrapper);
        return container;
    }
}