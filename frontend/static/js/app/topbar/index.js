import Component from '../../component/component.js';
import element from '../../component/element.js';
import renderer from '../../component/renderer.js';
import Link from '../../router/link.js';

export default class extends Component {
    constructor(props) {
        super(props);
    }
    getHtml() {
        const { auth: { isLogin }} = this.observable.getState();
        const container = this.container;
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
                }
            }));
            const signIn = element('li', {
                props: {
                    className: 'topbar_li'
                }
            });
            
            renderer(signIn,new Link({
                props: {
                    children: '로그인',
                    href: '/auth/login',
                    className:'topbar_link'
                }
            }));
            renderer(menu,signUp);
            renderer(menu,signIn);
        } else {

        }
        renderer(container, menu);
        return container;
    }
}