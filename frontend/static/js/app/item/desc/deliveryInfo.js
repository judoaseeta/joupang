import element from '../../../component/element.js';
import Component from '../../../component/component.js';
import renderer from '../../../component/renderer.js';
import Icon from '../../icon/index.js';
import timeGap from '../../utils/timeGap.js';

export default class extends Component {
    constructor(props) {
        super(props);
        this.getDeliveryTime = this.getDeliveryTime.bind(this);
        this.getLeftTime = this.getLeftTime.bind(this);
    }
    //배송 예정시간
    getDeliveryTime() {
        const { isMissile } = this.props;
       
        if(isMissile){
            const now = new Date();
            const time = now.getHours();
            let expected;
            if(0 <= time && time < 12) {
                expected = new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    now.getDate(),
                    18
                );
                return `오늘(${expected.getMonth()+1}월 ${expected.getDate()}일) ${expected.getHours()}시 경`;
            } else if ( 12 <= time && time <=23 ) {
                expected = new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    now.getDate() + 1,
                    6
                );
                return `내일(${expected.getMonth()+1}월 ${expected.getDate()}일) ${expected.getHours()}시 경`;
            }
        } else {
            const now = new Date();
            const expected = new Date(new Date().setDate(now.getDate() + 2));
        }
    }
    // 미사일 배송 남은 시간 구하기
    getLeftTime() {
        const now = new Date();
        const time = now.getHours();
        let expired;
        if(0 <= time && time < 12) {
            expired = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                12,
                0
            );
        } else if ( 12 <= time && time <=23 ) {
            expired = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate() + 1,
                0,
                0
            );
        }
        const [ hourGap, minGap, secGap] = timeGap(now, expired);
        if(hourGap >0 ) {
            return `(${hourGap}시간 ${minGap}분 이내 주문시)`;
        } else {
            return minGap > 1 ? `(${minGap}분 이내 주문시)` : `(${secGap}초 이내 주문시)` ;
        }
    }
    getHtml() {
        this.getDeliveryTime();
        const { isMissile } = this.props;
        const container = this.container;
        const holder = element('div', {
            props: {
                className: 'item_detail_delivery_holder'
            }
        });

        if(isMissile) {
            renderer(holder,new Icon({
                iconName: 'fa-rocket',
                className: 'item_detail_delivery_icon'
            }));
            const content = `<p class="item_detail_delivery_content missile">
            지금 주문하시면, <span>${this.getDeliveryTime()}</span>에 배송됩니다.</p>`;
            const innerHolder = element('div', {
                props: {
                    className: 'item_detail_delivery_holder_inner'
                }
            });
            renderer(innerHolder,content);
            renderer(innerHolder,element('p', {
                props: {
                    className: 'item_detail_delivery_content missile'
                },
                content: this.getLeftTime()
            }));
            renderer(holder,innerHolder);
        } else {
            renderer(holder, new Icon({
                iconName: 'fa-truck',
                className: 'item_detail_delivery_icon'
            }));
            renderer(holder, element('p', {
                props: {
                    className: 'item_detail_delivery_content normal'
                },
                content: '본 상품은 일반배송상품으로 2-3일 정도의 배송기간이 필요합니다.'
            }));

        }
        renderer(container, holder);
        return container;
    }
}