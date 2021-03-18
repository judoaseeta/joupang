import Component from '../../component/component.js';
import element from '../../component/element.js';
import renderer from '../../component/renderer.js';
import Link from '../../router/link.js';
import Icon from '../icon/index.js';

export default class extends Component {
    constructor(props) {
        super(props);
    }
    getHtml() {
        const container = this.container;
        // footer section1
        const footer1 = element('section',{
            props: {
                className: 'footer_section'
            }
        });
        renderer(footer1, element('h3', {
            content: '제작자'
        }));
        // github link
        const footerItem1_1= element('div', {
            props: {
                className: 'footer_item'
            }
        });
        renderer(footerItem1_1,new Icon({
            iconName: 'fa-github',
            className: 'footer_item_icon',
            iconType: 'fab'
        }));    
        renderer(footerItem1_1,element('a', {
            props: {
                className: '',
                href:  'https://github.com/judoaseeta',
                target: '_blink'
            },
            content: 'https://github.com/judoaseeta',
        }));
        const footerItem1_2 = element('div', {
            props: {
                className: 'footer_item'
            }
        });
        // blog link
        renderer(footerItem1_2,new Icon({
            iconName: 'fa-blog',
            className: 'footer_item_icon',
        }));    
        renderer(footerItem1_2,element('a', {
            props: {
                className: '',
                href: 'https://royroy.tech',
                target: '_blink'
            },
            content: 'https://royroy.tech',
        })); 
        // email
        const footerItem1_3 = element('div', {
            props: {
                className: 'footer_item'
            }
        });
        renderer(footerItem1_3,new Icon({
            iconName: 'fa-envelope',
            className: 'footer_item_icon',
        }));  
        renderer(footerItem1_3,element('a', {
            props: {
                className: '',
                href: 'mailto:judoaseeta@gmail.com',
                target: '_blink'
            },
            content: 'judoaseeta@gmail.com',
        })); 
        // render footer1 items 
        renderer(footer1,footerItem1_1);
        renderer(footer1,footerItem1_2);
        renderer(footer1,footerItem1_3);
        // footer section2
        const footer2 = element('section',{
            props: {
                className: 'footer_section'
            }
        });
        renderer(footer2, element('h3', {
            content: '소스코드'
        }));
        const footerItem2_1= element('div', {
            props: {
                className: 'footer_item'
            }
        });
        renderer(footerItem2_1,new Icon({
            iconName: 'fa-github',
            className: 'footer_item_icon',
            iconType: 'fab'
        }));    
        renderer(footerItem2_1,element('a', {
            props: {
                className: '',
                href:  'https://github.com/judoaseeta/joupang',
                target: '_blink'
            },
            content: '소스코드 깃헙주소',
        }));
        renderer(footer2,footerItem2_1);
        // footer section3
        const footer3 = element('section',{
            props: {
                className: 'footer_section'
            }
        });
        renderer(footer3, element('h3', {
            content: '기타사항'
        }));
        renderer(footer3, element('p', {
            content: '현재 구직중'
        }));
        renderer(container, footer1);
        renderer(container, footer2);
        renderer(container, footer3);
        return container;
    }
}