import Component from '../../component/component.js';
import element from '../../component/element.js';
import renderer from '../../component/renderer.js';
import asyncImage from '../utils/asyncImage.js';
import ImageSelectors from './imageSelector.js';

export default class extends Component {
    constructor(props) {
        super(props);
        // 메쏘드 바인딩
        this.translateX = this.translateX.bind(this);
        this.getDimension = this.getDimension.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onSelecterClick = this.onSelecterClick.bind(this);
        this.onSelecterHover = this.onSelecterHover.bind(this);
        this.magnifyImage = this.magnifyImage.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        // 이미지 슬라이더 페이지
        this.pageNum = 0;
        // 이미지 슬라이더 최대 페이지
        this.pageLimit = this.props.image_urls.length - 1;

        //이미지 로드 상태
        this.imageLoaded = false;
        // 이미지 확대 렌즈 스테이트
        this.state = {
            isMouseOver: false,
            currentXratio: 0,
            currentYratio: 0,
        }
    } 
    afterMount() {
    }
    onSelect(e) {
        const id = Number(e.target.dataset.id);
        const wrapper = document.getElementById(this.props.id).querySelector('.item_detail_image_wrapper');
        const images = wrapper.getElementsByClassName('item_detail_image');
        const { width } = images[id].getBoundingClientRect();
        this.pageNum = id;
        this.translateX(wrapper, -(width * this.pageNum));
    }
    onSelecterClick(e) {
        this.onSelect(e);
    }
    onSelecterHover(e) {
        this.onSelect(e);
    }
    onMouseMove(e) {
        const { isMobile  } = this.getDimension();
        if(!isMobile) {
            this.magnifyImage(e.target,e);
        }
    }
    onMouseLeave(e) {
        // 마우스 오버 false
        this.state.isMouseOver = false;
        // 이미지 렌즈 / 확대 이미지 display off
        const image_lens = document.getElementById('image_detail_image_lens');
        const maginified = document.getElementById('image_detail_maginified');
        image_lens.classList.remove('on');
        maginified.classList.remove('on');
    }
    onMouseEnter(e) {
        // 이미지가 로드 되었다면 확대기능 가동.
        if(this.imageLoaded) {
            // 디바이스 크기 체크 
        const { isMobile  } = this.getDimension();
        // 디바이스가 모바일이 아니라면
        // 모바일에선 렌즈 기능을 제공하지 않음.
        if(!isMobile) {
            // 마우스 오버 true
            this.state.isMouseOver = true;
            //  이미지 렌즈 / 확대 이미지 display on
            const image_lens = document.getElementById('image_detail_image_lens');
            const maginified = document.getElementById('image_detail_maginified');
            image_lens.classList.add('on');
            maginified.classList.add('on');
            //  이미지 렌즈의 width & height 와  확대 이미지 엘레멘트의 width & height;
            const { width, height } = e.target.getBoundingClientRect();
            const { width: mWidth, height: mHeight } = maginified.getBoundingClientRect();

            // 확대 이미지를 렌더할 엘리먼트
            // renderTarget 
            const renderTarget = maginified.getElementsByClassName('inner')[0];
            // 가로비와 세로비를 구한다.
            // get ratio between image and magnified element;
            const xRatio = mWidth / (width / 2);
            const yRatio = mHeight / (height / 4);
            // mousemove이벤트에서 사용하기 위해 스테이트에 할당.
            this.state.xRatio = xRatio;
            this.state.yRatio = yRatio;
            // 구해진 가로비와 세로비에 따라 확대 이미즈를 렌더할 엘리먼트에 크기, 이미지 설정.
            // set renderTarget (inner div of magnified);
            renderTarget.style.width = Math.ceil(width * (xRatio)) + 'px';
            renderTarget.style.height = Math.ceil(height * (yRatio)) + 'px';
            renderTarget.style.background = `url(${this.props.image_urls[this.pageNum]})`;
            renderTarget.style.backgroundRepeat = 'no-repeat';
            renderTarget.style.backgroundSize = `${Math.ceil(width * (xRatio)) + 'px'} ${Math.ceil(height * (yRatio)) + 'px'}`;
        }   
        }
    }
    magnifyImage(target,e) {
        const { mLeft } = this.getDimension();
        const image_lens = document.getElementById('image_detail_image_lens');
        const { offsetX, offsetY } = e;
        const { width, height } = target.getBoundingClientRect();
        // 가로 렌즈의 크기 = 이미지 크기 절반
        const lensWidth = width/ 2;
        // 세로 렌즈의 크기 = 이미지 높이 4분의 1.
        const lensHeight = height/ 4;

        // 마우스 오프셋 - 렌즈의 크기가 음수면 0으로 설정, 아니면 차를 레프트와 탑으로 이용.
        const left = offsetX - lensWidth < 0 ? 0 : offsetX - lensWidth ;
        const top = offsetY - lensHeight < 0 ? 0 : offsetY - lensHeight;

        // 렌즈의 크기 와 위치 결정.
        image_lens.style.width = `${lensWidth}px`;
        image_lens.style.height = `${lensHeight}px`;
        image_lens.style.left = left === 0 ? `${mLeft}em` : `calc(${mLeft}em + ${left + 'px'})`;
        image_lens.style.top = top === 0 ? '0' : top + 'px';
        // 확대 이미지 이동 translate target(maginified image);
        const maginified = document.getElementById('image_detail_maginified');
        const translateTarget = maginified.getElementsByClassName('outer')[0];
        // 구해진 가로비 세로비에 비례하여 이동
        translateTarget.style.transform = `translate3D(-${left * this.state.xRatio}px,-${top * this.state.yRatio}px,0)`;
    }
    // 현재 디바이스 크기에 따라 렌즈의 위치관련 정보 반환
    getDimension() {
        const deviceWidth = window.innerWidth;
        if(deviceWidth <= 568) {
            return {
                isMobile: true
            }
        } else if (deviceWidth <= 800 && deviceWidth > 568) {
            return {
                mLeft: 0,
                isMobile: false
            }
        }else if(deviceWidth <= 1200 && deviceWidth > 800) {
            return {
                mLeft: 3,
                isMobile: false
            }
        } else {
            return {
                mLeft: 5,
                isMobile: false
            }
        }
    }
    getHtml() {
        const container = this.container;
        renderer(container, element('div', {
            props: {
                className: 'item_detail_image_cover'
            },
            handler: {
                onMouseEnter: this.onMouseEnter,
                onMouseMove: this.onMouseMove,
                onMouseLeave: this.onMouseLeave
            }
        }));
        if(this.props.isMultiItem) {
            renderer(container,new ImageSelectors({
                tag:'ul',
                props: {
                    className: 'item_detail_image_selectors',
                    images: this.props.thumb_urls,
                    onClick: this.onSelecterClick
                }
            }));
        }
        const wrapper = element('div',{
            props:{
                className: 'item_detail_image_wrapper'
            }
        });
        renderer(container,element('span',{
            props: {
                id:'image_detail_image_lens'
            }
        }));
        this.props.image_urls.forEach((url,index) => {
            asyncImage(url).then((loadedUrl ) => {
                this.imageLoaded = true;
                renderer(wrapper, element('img', {
                    props: {
                        className: 'item_detail_image',
                        src: loadedUrl,
                        alt: this.props.alts[index],
                    },
                }));
            });
        });
        renderer(container, wrapper);
        return container;
    }
    // 가로축으로 트렌스레이트하는 펑션.
    translateX(element, deltaX, duration = 0.3, callback= null) {
        element.style.transform = `translate3d(${deltaX}px,0,0)`;
        element.style.transition = `transform ${duration}s`;
        if( duration > 0 && callback) {
            element.addEventListener('transitionend',callback, { once: true});
        }
    }
}