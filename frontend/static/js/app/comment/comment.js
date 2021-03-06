import Component from '../../component/component.js';
import element from '../../component/element.js';
import renderer from '../../component/renderer.js';
import { parseTimestamp } from '../utils/index.js';
import starGazer from '../../component/starGazer.js';
export default class extends Component {
    constructor(props) {
        super(props);
    }
    getHtml() {
        const container = this.container;
        if(this.props.small) {
            container.classList.add('small');
        }
        const header = element('header',{
            props: {
                className: 'comment_header'
            }
        });
        const headerLeft = element('div', {
            props: {
                className: 'comment_header_left'
            }
        });
        renderer(headerLeft, element('h5',{
            content: '사용자명: '
        }));
        renderer(headerLeft, element('p',{
            content: this.props.comment.SK.split('#')[1]
        }));
        renderer(header,headerLeft);
        if(!this.props.small) {
            const headerRight = element('div', {
                props: {
                    className: 'comment_header_right'
                }
            });
            renderer(headerRight, element('h5',{
                content: '등록일: '
            }));
            renderer(headerRight, element('p',{
                content: parseTimestamp(this.props.comment.createdAt)
            }));
            renderer(header,headerRight);
        }
        const scores = element('div', {
            props: {
                className: 'comment_rating'
            }
        });
        starGazer(scores,this.props.comment.rating, this.props.small);
        const comment = element('p', {
            content: this.props.comment.comment
        });
        renderer(container, header);
        renderer(container, scores);
        renderer(container, comment);
        return container;
    }
}