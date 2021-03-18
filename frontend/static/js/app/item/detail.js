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
        this.hasComment = this.hasComment.bind(this);
    }
    afterMount() {
        this.requestItemData();
    }
    async requestItemData() {
        const category = this.router.getParams().category;
        const itemId = this.router.getParams().itemId;
        const isLogin = this.observable.getState().auth.isLogin;
        try {
            const url = api.getByItemUrl(category,itemId);
            const request = await fetch(url);
            const result = await request.json();
            const comments =  await fetch(api.getCommentsById(category,itemId));
            const parsedComments = await comments.json();
            let hasComment = false;
            if(isLogin) {
                hasComment = await this.hasComment(category,itemId);
            }
            this.update({
                data: result.items,
                comments: parsedComments.item,
                hasComment
            });
        } catch(e) {
            console.log(e.message);
            alert('데이터 요청중에 문제가 있었습니다. 메인으로 돌아갑니다.');
        }
    }
    async hasComment(category,itemId) {
        try {
            const hasComment = await api.fetchWithAuthorization(api.hasComment(category,itemId));
            return await hasComment.json();
            //if error assume there is no comment.
        } catch(e) {
            console.log(e);
            return false;
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
                    className: `item_detail_first${this.state.data.image_urls.length > 1 ? ' multi_item': ''}`
                }
            });
            const maginified = element('div',{
                props: {
                    id:'image_detail_maginified'
                }
            });
            const maginifiedOuter = element('div',{
                props: {
                    className: 'outer'
                }
            });
            renderer(maginifiedOuter,element('div',{
                props: {
                    className: 'inner'
                }
            }));
            renderer(maginified,maginifiedOuter);
            renderer(detailFirst,maginified);
            renderer(detailFirst,new ItemImage({
                props: {
                    className: 'item_detail_image_container',
                    id: 'item_images',
                    image_urls: this.state.data.image_urls,
                    thumb_urls: this.state.data.thumb_urls,
                    isMultiItem: this.state.data.isMultiItem,
                    alts: this.state.data.descriptions
                },
            }));
            
            renderer(detailFirst,new Desc({
                props: {
                    className: 'item_detail_desc',
                    data: this.state.data,
                    comments: this.state.comments
                },
                router: this.router
            }));
            renderer(container,detailFirst);
            
            renderer(container,new Information({
                tag: 'section',
                props: {
                    id: 'item_detail_infos',
                    className: 'item_detail_infos',
                    data: this.state.data,
                    comments: this.state.comments,
                    hasComment: this.state.hasComment
                },
                router: this.router
            }));
        } else {
            renderer(container,LoadingPage());
        }
        return container;

    }
}