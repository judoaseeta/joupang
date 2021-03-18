import Component from '../../../component/component.js';
import element from '../../../component/element.js';
import renderer from '../../../component/renderer.js';
import starGazerForm from '../../../component/starGazerForm.js';
import { trappableTypes } from '../../utils/tabTrap.js';
import { api } from '../../utils/index.js';
export default class extends Component {
    constructor(props) {
        super(props);
        this.hoverStar = this.hoverStar.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.returnToComment = this.returnToComment.bind(this);
        this.onTap = this.onTap.bind(this);
        this.postComment = this.postComment.bind(this);
    }
    afterMount() {
        const container = document.getElementById(this.props.id);
        // 렌더링 마운트 이후에 텍스트 에어리어를 포커스 시킴. 탭트랩에 가두기 위한 목적.
        const textArea = container.querySelector(".item_detail_write_comment_textarea");
        if(textArea) {
            textArea.focus();
        }
    }
    // 탭트랩과 ESC기능을 위한 키보트 이벤트 리스너
    onTap(e) {
        const container = document.getElementById(this.props.id);
        const tappable = Array.from(container.querySelectorAll(trappableTypes));
        const firstTab = tappable[0];
        const lastTab = tappable[tappable.length - 1];
        if(e.key === 'Tab') {
            if(e.shiftKey) {
                if(document.activeElement === firstTab) {
                    e.preventDefault();
                    lastTab.focus();
                }

            } else {
                if(document.activeElement === lastTab) {
                    e.preventDefault();
                    firstTab.focus();
                }
            }
        } 
        if(e.key === 'Enter') {
            if(document.activeElement.className === 'item_detail_write_comment_button submit') {
                document.activeElement.click();
            }
        }
        if(e.key === 'Esc' ||e.key === 'Escape') {
            console.log('esc');
            this.returnToComment();
        }
    }
    hoverStar(rating) {
        return (e) => {
            // 타겟은 개별 star element
            const target = e.target;
            const selectedRating = Number(e.target.dataset.rating);
            this.state.selectedRating = selectedRating;
            // stars loop
            const stars = target.parentElement.children;
            Array.from(stars).forEach(star => {
                const starRating = Number(star.dataset.rating);
                star.classList.toggle('on',starRating <= selectedRating);
            });
        }
    }
    onSubmit(e) {
        e.preventDefault();
        this.postComment();
    }
    async postComment() {
        const container = document.getElementById(this.props.id);
        const textArea = container.querySelector(".item_detail_write_comment_textarea");
        const { category, itemId } = this.router.getParams();
        const comment = textArea.value;
        const rating = this.state.selectedRating; 
        if(rating && comment.length >= 15 ) {
            try {           
                const result = await api.fetchWithAuthorization(api.createComment,
                'POST', {
                    comment,
                    category,
                    itemId,
                    rating
                });
                this.returnToComment();
                this.router.navigateTo(this.router.getCurrentRoute(), {
                    scrollTop:window.scrollY
                })
            } catch(e) {
                console.log(e);
                alert('상품평 등록과정 중에 문제가 발생하였습니다 ㅠㅠ');
            }
        }
        
    }
    returnToComment() {
        // 상품평 쓰기 엘리먼트를 삭제. 바디에 락을 거는 클래스 제거
        const writeComment = document.getElementById(this.props.id);
        writeComment.remove();
        document.body.classList.remove('onModalOpen');
    }
    getHtml() {
        const container = this.container;
        // 유저 id
        const { auth: { userId }} = this.observable.getState();
        container.addEventListener('keydown',this.onTap);
        const form = element('form', {
            props: {
                className: 'item_detail_write_comment_form'
            },
            handler: {
                onSubmit: this.onSubmit
            }
        });
        // render title
        renderer(form, element('h3', {
            props : {
                className: 'item_detail_write_comment_title',
            },
            content: `<span>${this.props.productName}</span>에 관한 상품평을 남겨주세요!`
        }))

        const starContainer = element('div', {
            props: {
                className: 'form_star_container'
            }
        });
        starGazerForm(starContainer, this.hoverStar);
        const ratingPart =element('div', {
            props: {
                className: 'item_detail_write_comment_rating'
            },
        });
        renderer(ratingPart, element('h5', {
            props: {
                
            },
            content: `<span>${userId}</span>고객님의 평점: `
        }))
        renderer(ratingPart, starContainer);
        renderer(form, ratingPart);
        const textPart = element('div', {
            props: {
                className: 'item_detail_write_comment_text'
            }
        });
        renderer(textPart, element('h5', {
            props: {
                
            },
            content: `<span>${userId}</span>고객님의 평: `
        }))
        const textArea = element('textarea', {
            props: {
                className:'item_detail_write_comment_textarea',
                placeholder: '상품평은 최소 15자 이상이셔야 합니다.'
            }
        });
        renderer(textPart , textArea);
        renderer(form,textPart);

        const buttons = element('div', {
            props: {
                className: 'item_detail_write_comment_buttons'
            }
        });
        renderer(buttons, element('button', {
            props: {
                className :'item_detail_write_comment_button submit',
                type: 'submit'
            },
            content: '제출하기'
        }));
        renderer(buttons, element('button', {
            props: {
                className :'item_detail_write_comment_button return',
            },
            content: '돌아가기',
            handler: {
                onClick: this.returnToComment
            }
        }));
        renderer(form, buttons);
        renderer(container,form);
        return container;
    }
}