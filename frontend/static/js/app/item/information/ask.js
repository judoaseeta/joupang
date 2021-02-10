import Component from '../../../component/component.js';
import element from '../../../component/element.js';
import renderer from '../../../component/renderer.js';
import Link from '../../../router/link.js';
import Icon from '../../icon/index.js';

export default class extends Component {
    constructor(props) {
        super(props);
    };
    getHtml() {
        const container = this.container;
        const { auth : { isLogin }} = this.observable.getState();
        renderer(container, element('h3',{
            props: {
                className: 'item_detail_tab_title'
            },
            content: '상품에 대해 문의하기'
        }))
        if(isLogin) {
            
        } else {
            const wrapper = element('div', {
                props: {
                    className: 'item_detail_ask'
                },
            });
            renderer(wrapper, new Icon({
                iconName: 'fa-question',
                className: 'notify_icon'
            }));
            const notice = element('p', {
                props: {
                    className: 'item_detail_ask_content'
                },
                content: '상품문의를 하기 위해선, 로그인 하셔야 합니다.'
            });
            renderer(wrapper, notice);
            renderer(wrapper, new Link({
                props: {
                    className:'in_link',
                    href: '/auth/login',
                    children: '로그인 하러 가기'
                },
            }));
            renderer(container, wrapper);
        }
        return container;
    }
}