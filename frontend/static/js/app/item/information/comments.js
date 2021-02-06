import Component from '../../../component/component.js';
import element from '../../../component/element.js';
import renderer from '../../../component/renderer.js';

import Comment from './comment.js';

export default class extends Component {
    constructor(props) {
        super(props);
    }
    getHtml() {
        const container = this.container;
        renderer(container, element('h3',{
            content: '본 상품과 관련된 상품평'
        }))
        if(this.props.comments) {
            const commentsLayout = element('ul',{
                props: {
                    className: 'item_detail_comments_container'
                }
            });
            this.props.comments.forEach(comment => 
                renderer(commentsLayout, new Comment({
                    tag: 'li',
                    props: {
                        className: 'item_detail_comment',
                        comment
                    }
                }))    
            )
            renderer(container,commentsLayout);
        } else {
            renderer(container,element('p',{
                content: '해당 상품에 등록된 상품평이 없습니다!'
            }));
        }
        return container;

    }
}