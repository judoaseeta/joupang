import Component from '../../component/component.js';
import element from '../../component/element.js';
import renderer from '../../component/renderer.js';
import select from '../../component/select.js';
import clearElement from '../../component/clearElement.js';

// 
import Link from '../../router/link.js';

//
import debounce from '../utils/debounce.js';
import { api, categoryConversion, trappableTypes   } from '../utils/index.js';

export default class extends Component {
    constructor(props) {
        super(props);
        this.searchCategories = [
            '패션의류',
            '신선식품',
            '전자제품',
            '여행',
            '서적',
            '홈데코',
            '캠핑'
        ];
        this.requestSearch = this.requestSearch.bind(this);
        this.renderItems = this.renderItems.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.highlightText = this.highlightText.bind(this);
        this.clearList = this.clearList.bind(this);

        // 온 클릭 이용해서 링크를 따로 따야함.
        this.onBlur = this.onBlur.bind(this);
        this.onClick = this.onClick.bind(this);
        // 디바운스로 서치 펑션을 이벤트 핸들러에 할당
        this.onChange = debounce(400,this.requestSearch);
        this.onTab = this.onTab.bind(this);
        //초기 카테고리
        this.state = {
            category: '패션의류'
        }
        window.addEventListener('click',this.onClick);
        this.container.addEventListener('keydown',this.onTab)
    }
    clearList() {
        const container = document.getElementById(this.props.id);
        const list= container.querySelector('.main_nav_search_result');
        if(list) {
            clearElement(list);
        }
    }
    async requestSearch(e) {
        const keyword = e.target.value;
        // only if keyword is more than two characters.
        // 검색어가 2글자 이상인 경우만 api request
        if(keyword.length >= 2) {
            try {
                const result= await fetch(api.searchItems(categoryConversion[this.state.category],keyword));
                const parsed = await result.json();
                if(parsed.items.length > 0) {
                    this.state.items = parsed.items;
                    this.renderItems(parsed.items,keyword);
                }
            } catch(e) {
                console.log(e);
            }
        } else {
            this.clearList();
        }
    }
    // api로 불러온 아이템들과 검색키워드가 인자
    renderItems(items,keyword) {
        const container = document.getElementById(this.props.id);
        const list= container.querySelector('.main_nav_search_result');
        if(list) {
            this.clearList();
            items.forEach((item) => {
                // item이 속한 카테고리
                // category the item belongs to
                const category = item.PK.split('#')[1];
                // item id
                const itemId = item.SK
                const itemContainer = element('li', {
                    props: {
                        className: 'main_nav_search_result_item ',
                    },
                });
                renderer(itemContainer, element('p',{
                    content: this.highlightText(item.name,keyword)
                }));
                renderer(itemContainer,element('p',{
                    content: this.highlightText(item.content,keyword)
                }));
                renderer(list,new Link({
                    props: {
                        className:'main_nav_search_result_link',
                        children: itemContainer,
                        href: `/item/${category}/${itemId}`,
                        attributes: {
                            tabindex: "0"
                        }
                    }
                }));
            });
        }
    }
    highlightText(text,keyword) {
        //키워드로 레겍스 만듬.
        const regex = new RegExp(`(${keyword})`,'g');
        //레겍스의 부분집합으로 걸린 키워드는 span사이에 끼어줌.
        return text.replace(regex,'<span>$1</span>');
    }
    onBlur(e) {
        e.preventDefault();
    }
    onClick(e) {
        const container = document.getElementById(this.props.id);
        const list = container.querySelector('.main_nav_search_result');
        // 만약 인풋이 포커스중이라면
        if(list.classList.contains('on')) {
            // 클릭 대상이 인풋 스스로라면 포커스를 유지
            if(e.target.className === 'main_nav_search_input') {
           
            // 그외엔 포커스 제거
            } else {
                list.classList.remove('on');
            }
        }
        
    }
    onFocus(e) {
        const container = document.getElementById(this.props.id);
        const list = container.querySelector('.main_nav_search_result');
        list.classList.add('on');
    }
    onSelect(e) {
        this.state.category = e.target.value;
        this.clearList();
    }
    onSubmit(e) {
        e.preventDefault();
    }
    onTab(e) {
        const container = document.getElementById(this.props.id);
        const list = container.querySelector('.main_nav_search_result');
        // trappable(tabindex를 가지고 있거나 포커싱이 가능한) 엘리먼트들을 찾는다.
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
            // 탭을 통해 포커싱된 엘리먼트가 서치 결과 아이템이고
            // 엔터키가 눌렸다면 클릭() ==> 링크타고 이동하게 됨. 
            if(document.activeElement.className === 'main_nav_search_result_link') {
                document.activeElement.click();
            }
        }
        if(e.key === 'Esc' ||e.key === 'Escape') {
            //ESC를 누른 경우(맥은 Escape);
            // 현재 포커싱 된 엘리먼트를 블러함.
            // 또한 인풋 또한 블러함과 동시에
            // 서치 리스트를 숨김
            document.activeElement.blur();
            container.querySelector('.main_nav_search_input').blur();
            list.classList.remove('on');
        }
    }
    getHtml() {
        const container = this.container;
        container.addEventListener('submit',this.onSubmit);
        const searchInput = element('input', {
            props: {
                className:'main_nav_search_input'
            },
            handler: {
                onInput: this.onChange,
                onFocus: this.onFocus,
                onBlur: this.onBlur,
            }
        });
        //커스텀 <select>
        const category = select({
            options: this.searchCategories,
            handler: this.onSelect
        });
        renderer(container, category);
        renderer(container,searchInput);
        // 찾은 아이템들 렌더링할 리스트
        renderer(container, element('ul', {
            props: {
                className: 'main_nav_search_result'
            },
        }));
        return container;
    }
}