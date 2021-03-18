import element from '../../component/element.js';
import renderer from '../../component/renderer.js';
import clearElement from '../../component/clearElement.js';
import Component from '../../component/component.js';
import Loading from '../../component/loadingPage.js';
import api from '../utils/api.js';
import Controller from './controller.js';
import Item from './item/index.js';

export default class extends Component {
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
        this.getQueries = this.getQueries.bind(this);
        this.sortList = this.sortList.bind(this);
        this.renderList = this.renderList.bind(this);
    }
    afterMount() {
        if(!this.state.data) {
            this.getData();
        }
    }
    async getData(){
        const { category } = this.router.getParams();
        const sub = this.router.getQueries() 
        ?  !!this.router.getQueries().subcategory 
        ? decodeURIComponent(this.router.getQueries().subcategory ) 
        : undefined
        :undefined;
        try {
            const result = await fetch(api.getItemsByCategory(category, sub));
            const parsed = await result.json();
            this.update(state => ({
                ...state,
                loading: false,
                data: parsed.items
            }));
            this.sortList();
        } catch(e) {
            alert(e.message);
        }
    }    
    getQueries() {
        return this.router.getQueries();
    }
    sortList() {
        const queries = this.getQueries();
        let newData;
        if(queries) {
            const data = this.state.data.slice(0);
            if(queries.priceSort && queries.priceSort === 'low') {
                //아이템 내의 가격이 여러 개 일 수도 있기 때문에 맥스값을 구해서 비교
                // If multiple item prices, get the highest price and compare
                newData = data.sort((a,b) => {
                    const aPrices = Math.min(...a.saleprices);
                    const bPrices = Math.min(...b.saleprices);
                    return aPrices - bPrices;
                });
            } else if(queries.priceSort && queries.priceSort === 'high') {
                newData = data.sort((a,b) => {
                    const aPrices = Math.max(...a.saleprices);
                    const bPrices = Math.max(...b.saleprices);
                    return bPrices - aPrices;
                }); 
            }
            if(!queries.priceSort) {
                newData = data;
            }
            if(queries.dateSort && queries.dateSort  === 'late') {
                // if datas are previously sorted,  sort newData by date 
                if(newData) {
                    newData = newData.sort((a,b) => {
                        return b.createdAt - a.createdAt;
                    });
                } else {
                    newData = data.sort((a,b) => {
                        return b.createdAt - a.createdAt;
                    });
                }
            }
            if(queries.isMissile && queries.isMissile === 'true') {
                 // if datas are previously sorted, filter newData by missile
                if(newData) {
                    newData = newData.filter( d => d.isMissile );
                } else {
                    newData = data.filter( d => d.isMissile );
                }
            }
            
        }
        
        const container = document.getElementById(this.props.id);
        if(container) {
            const list = container.querySelector('.items_item_list');
            // if there is sorted new data
            // 데이터가 정렬되었다면
            if(newData) {
                this.renderList(list,newData);
            } else {
                this.renderList(list,this.state.data);
            }
        }
    }
    renderList(container,data) {
        const { category } = this.router.getParams();
        clearElement(container);
        data.forEach(d => {
            renderer(container, new Item({
                tag: 'li',
                props: {
                    className: 'items_list_item',
                    data: d,
                    href: `/item/${category}/${d.SK}`
                }
            }))
        });
    }
    getHtml() {
        const container = this.container;
        const { loading } = this.state;
        if(loading) {
            renderer(container, Loading());
        } else {
            renderer(container, new Controller({
                tag: 'form',
                props: {
                    className: 'items_controllers',
                    id: 'items_controllers',
                    sortList: this.sortList
                },
                router: this.router
            }));
            renderer(container, element('ul',{
                props: {
                    className: 'items_item_list'
                }
            }));
        }
        return container;
    }
}