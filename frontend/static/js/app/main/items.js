import Component from '../../component/component.js';
import element from '../../component/element.js';
import renderer from '../../component/renderer.js';
import ItemSection from './item_section.js';
import { iconList } from '../utils/index.js';
import { getObservable } from '../../index.js';
export default class extends Component {
    constructor(props) {
        super(props);
        this.initObservers = this.initObservers.bind(this);
        this.sideBarUpdate = this.sideBarUpdate.bind(this);
        this.getVideo = this.getVideo.bind(this);
        this.unsubscribers = [];
    }
    afterMount() {
        this.initObservers();
    }
    afterUnMount() {
        if(this.unsubscribers.length > 0) {
            this.unsubscribers.forEach( unsubscriber => unsubscriber());
        }
    }
    getVideo(i) {
        const list = [
            "https://res.cloudinary.com/mitoo/video/upload/v1613114340/joupang/fashion.mp4",
            "https://res.cloudinary.com/mitoo/video/upload/v1613115421/joupang/food.mp4",
            "https://res.cloudinary.com/mitoo/video/upload/v1613115152/joupang/electronics.mp4",
            "https://res.cloudinary.com/mitoo/video/upload/v1613115225/joupang/travel.mp4",
            "https://res.cloudinary.com/mitoo/video/upload/v1613115434/joupang/books.mp4",
            "https://res.cloudinary.com/mitoo/video/upload/v1613115626/joupang/homedeco.mp4",
            "https://res.cloudinary.com/mitoo/video/upload/v1613115738/joupang/camping.mp4"
        ];
        return list[i];
    }
    sideBarUpdate(intersectIndex) {
        this.observable.update({
            itemSection: {
                selectedSection: intersectIndex
            }
        });
    }
    initObservers() {
        // items_section의 모든 칠드런(item_section)을 감시하는 인터섹션 옵저버.
        const targets = document.getElementById(this.props.id).children;
        const observer = new IntersectionObserver((entries, observer) => {
            // const index = i;
           for(let i =0; i < entries.length; i++) {
                const entry = entries[i];
                const index =Number( entry.target.dataset.id);
                // 만약 인터섹팅 하지않는 엔트리가 첫번째 인덱스(0)이고, 인터섹팅에서 사라진다면,
                //  index -1초기화
                // if entry is going to not intersect, set index to -1 for initializing
                if(index === 0 && !entry.isIntersecting &&!entry.isVisible) {
                    this.sideBarUpdate(-1);
                }
                // if the entry is newly intersecting, set this index to state.
                // 만약에 인터섹팅한다면 해당 엔트리의 인덱스로 스테이트 설정
                if(entry.isIntersecting) {
                    this.sideBarUpdate(index);  
                } 
           }
        },{
            threshold: 1
        });
        // 옵저브 시작
        Array.from(targets).forEach( target => {
            observer.observe(target);
            // add unsubscriber to unsubscribers so that it can be invoked
            // 언옵저브 하는 펑션을 배열에 추가. 나중에 실행 시킬 것.
            this.unsubscribers.push(() => observer.unobserve(target));
        });
    }
    getHtml() {
        const container = this.container;
        for(let i = 0; i < 7; i++) {
            renderer(container, new ItemSection({
                tag: 'li',
                props: {
                    className: `item_section category${i+1}`,
                    category: iconList[i][0],
                    dataset: {
                        id: i
                    },
                    video: this.getVideo(i)
                },
                observable: getObservable()
            }));
        }
        return container;
    }
}