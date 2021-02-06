import element from '../element.js';
import renderer from '../renderer.js';
import Component from '../component.js';
import wheel from './wheel.js';
import body from './body.js';

class Loading extends Component {
    constructor(props) {
        super(props);
    }
    getHtml() {
        const container = this.container;
        renderer(container,element('h4',{
            content: '처리중입니다...'
        }));
        const svgWrapper = document.createElement('svg');
        svgWrapper.setAttribute('viewBox','0 0 500 250');
        renderer(svgWrapper, wheel(22));
        renderer(svgWrapper, wheel(22));
        renderer(svgWrapper, body(200,200, 150, 80));
        renderer(container,svgWrapper);
        return container;
    }
}

export default function loading() {
    return new Loading({
        tag: 'div',
        props: {
            id:'loading',
        },
        isNoLifeCycle:true
    })
}