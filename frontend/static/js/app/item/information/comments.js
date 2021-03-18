import Component from '../../../component/component.js';
import element from '../../../component/element.js';
import renderer from '../../../component/renderer.js';

import Comment from '../../comment/comment.js';
import Icon from '../../icon/index.js';
import Link from '../../../router/link.js';
import WriteComment from './writeComment.js';
export default class extends Component {
    constructor(props) {
        super(props);
        this.toggleWriteComment = this.toggleWriteComment.bind(this);
    }
    toggleWriteComment() {
        const app = document.getElementById('app');
        renderer(app, new WriteComment({
            props: {
                className: 'item_detail_write_comment',
                id: 'write_comment',
                productName: this.props.productName,
            },
            observable: this.observable,
            router: this.router
        }));
        document.body.classList.add('onModalOpen');
    }
    getHtml() {
        const container = this.container;
        renderer(container, element('h3',{
            props: {
                className: 'item_detail_tab_title',
            },
            content: '본 상품과 관련된 상품평'
        }))
        // 상품평들이 있다면 
        if(this.props.comments.length > 0) {
            const commentsLayout = element('ul',{
                props: {
                    className: 'item_detail_comments_container'
                }
            });
            // 상품평들을 렌더링
            this.props.comments.forEach(comment => 
                renderer(commentsLayout, new Comment({
                    tag: 'li',
                    props: {
                        className: 'item_detail comment',
                        comment,
                    }
                }))    
            )
            renderer(container,commentsLayout);

            if(!this.observable.getState().auth.isLogin) {

                // 상품평들이 있는데 로그인을 안 한 경우
                const addLayout = element('div', {
                    props: {
                        className: 'item_detail_comments_addLayout'
                    }
                });

                renderer(addLayout, element('p',{
                    content: "상품평을 쓰고 싶으신가요?"
                }))
                renderer(addLayout, new Link({
                    props: {
                        className:'in_link',
                        href: '/auth/login',
                        children: '로그인 하러 가기'
                    },
                }));
                //콘테이너에 로그인 추가창 렌더
                renderer(container,addLayout);
            } else {
                // 로그인을 했는데 상품평이 없는 경우
                if(!this.props.hasComment) {
                    const addLayout = element('div', {
                        props: {
                            className: 'item_detail_comments_addLayout'
                        }
                    });
    
                    renderer(addLayout, element('button',{
                        props: {
                            className: 'item_detail_comment_write',
                        },
                        content: '<i class="fas fa-pen"></i> 상품평 쓰기',
                        handler: {
                            onClick: this.toggleWriteComment
                        }
                    }));
                    renderer(container,addLayout);
                }
            }
           

            // 상품평이 없는 경우에
        } else {
            const layout = element('div', {
                props: {
                    className: 'item_detail_nocomment'
                }
            });
            renderer(layout, new Icon({
                iconName: 'fa-comment-slash',
                className: 'notify_icon'
            }));
            renderer(layout,element('p',{
                content: '해당 상품에 등록된 상품평이 없습니다!'
            }));
            // 로그인을 안했다면
            if(!this.observable.getState().auth.isLogin) {
                renderer(layout, new Link({
                    props: {
                        className:'in_link',
                        href: '/auth/login',
                        children: '로그인 하러 가기'
                    },
                }));
            } else {
                renderer(layout, element('h4', {
                    props: {
                        className: ''
                    },
                    content: '첫 상품평을 써보세요!!!!'
                }))
                renderer(layout, element('button',{
                    props: {
                        className: 'item_detail_comment_write',
                    },
                    content: '<i class="fas fa-pen"></i> 상품평 쓰기',
                    handler: {
                        onClick: this.toggleWriteComment
                    }
                }));
            }
            renderer(container,layout);
        }
        return container;

    }
}