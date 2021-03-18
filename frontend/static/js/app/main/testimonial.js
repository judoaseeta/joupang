import Component from '../../component/component.js';
import renderer from '../../component/renderer.js';
import Comment from '../comment/comment.js';
import Link from '../../router/link.js';
import pickNumbers from '../utils/pickNumbers.js';

export default class extends Component {
    constructor(props) {
        super(props);
    }
    getHtml() {
        const container = this.container;
        const { category ,comments} = this.props;
        const randomNumbers = pickNumbers(comments.length-1, 3);
        randomNumbers.forEach(num => {
            renderer(container, new Link({
                props: {
                    children: new Comment({
                        tag: 'li',
                        props: {
                            className: 'comment',
                            comment: comments[num],
                            small: true,
                        }
                    }),
                    href: `item/${category}/${comments[num].SK.split('#')[0]}`,
                    linkState: {
                        scrollTop: 0
                    },
                    style: {
                        width: '100%'
                    }
                }
            }))
        });
        return container;
    }
}