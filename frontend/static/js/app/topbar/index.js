import Component from '../../component/component.js';
import element from '../../component/element.js';
import renderer from '../../component/renderer.js';
import Link from '../../router/link.js';
import isEqual from '../../state/isEqual.js';
import api from '../utils/api.js';

export default class extends Component {
    constructor(props) {
        super(props);
        this.subscribe = this.subscribe.bind(this);
        this.logout = this.logout.bind(this);
        this.renderItems = this.renderItems.bind(this);
        this.observable.subscribe(this.subscribe);
    }
    logout() {
        api.logout();
        this.observable.update({
            auth: {
                isLogin: false,
                username: ''
            }
        });

    }
    subscribe(state) {
        const { auth: { isLogin }} = state;
        const container = document.getElementById(this.props.id);
        if(this.state.memo) {
            if(!isEqual(this.state.memo,isLogin)) {
                this.state.memo = isLogin;
                this.update({});
            }
        } else {
            this.state.memo = isLogin;
            this.update({});
        }
    }
    renderItems(container, isLogin){
        const menu = element('menu', {
            props: {
                className: 'topbar_menu'
            }
        });
        if(!isLogin) {
            const signUp = element('li', {
                props: {
                    className: 'topbar_li'
                }
            });
            renderer(signUp,new Link({
                props: {
                    children: '회원가입',
                    href: '/auth/signup',
                    className:'topbar_link'
                },
                isNoLifeCycle: true
            }));
            const signIn = element('li', {
                props: {
                    className: 'topbar_li'
                },
            });
            
            renderer(signIn,new Link({
                props: {
                    children: '로그인',
                    href: '/auth/login',
                    className:'topbar_link'
                },
                isNoLifeCycle: true
            }));
            renderer(menu,signUp);
            renderer(menu,signIn);
        } else {
            renderer(menu, element('button', {
                props: {
                    className: 'logout'
                },
                content: '로그아웃',
                handler: {
                    onClick: this.logout
                }
            }))
        }
               
        renderer(container, menu);
    }
    getHtml() {
        const container = this.container;
        const { auth: { isLogin }} = this.observable.getState();
        this.renderItems(container,isLogin);
        return container;
    }
}