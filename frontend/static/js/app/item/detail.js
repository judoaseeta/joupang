import Component from '../../component/component.js';
import element from '../../component/element.js';
import renderer from '../../component/renderer.js';
import LoadingPage from '../../component/loadingPage.js';

import BreadCrumbs from './breadCrumbs.js';
import ItemImage from './image.js';
import Information from './information/index.js';
import Desc from './desc/desc.js';
import { api } from '../utils/index.js';

export default class extends Component {
    constructor(props) {
        super(props);
        this.requestItemData = this.requestItemData.bind(this);
    }
    afterMount() {
        this.requestItemData();
    }
    async requestItemData() {
        const category = this.router.getParams().category;
        const itemId = this.router.getParams().itemId;
        try {
            const url = api.getByItemUrl(category,itemId);
            const request = await fetch(url);
            const result = await request.json();
            const comments =  await fetch(api.getCommentsById(itemId));
            const parsedComments = await comments.json();
            this.update({
                data: result.items,
                comments: parsedComments.items
            });
        } catch(e) {
            console.log(e.message);
            alert('데이터 요청중에 문제가 있었습니다. 메인으로 돌아갑니다.');
        }
    }
    getBreadCrumbs() {
        return [
            '/main',
            '/items'
        ];
    }
    getHtml() {
        const container = this.container;
        const isRenderable = this.state.data && this.state.comments;
        if(isRenderable) {
            renderer(container, new BreadCrumbs({
                props: {
                    className: 'item_detail_breadcrumbs',
                    subCategory: this.state.data.subCategory,
                },
                router: this.router
            }))
            const detailFirst= element('content', {
                props: {
                    className: 'item_detail_first'
                }
            });
            renderer(detailFirst,new ItemImage({
                props: {
                    className: 'item_detail_image_container',
                    id: 'item_images'
                },
                state: {
                    image_urls: this.state.data.image_urls
                },
                isNoLifeCycle: false

            }));
            renderer(detailFirst,element('div', {
                props: {
                    className: 'item_detail_image_selector'
                }
            }));
            renderer(detailFirst,new Desc({
                props: {
                    className: 'item_detail_desc',
                    data: this.state.data,
                    comments: this.state.comments
                },
                isNoLifeCycle:false
            }));
            renderer(container,detailFirst);
            
            renderer(container,new Information({
                tag: 'section',
                props: {
                    id: 'item_detail_infos',
                    className: 'item_detail_infos',
                    data: this.state.data,
                    comments: this.state.comments
                },
                router: this.router
            }));
        } else {
            renderer(container,LoadingPage());
        }
        return container;

    }
}