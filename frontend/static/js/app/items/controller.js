import element from '../../component/element.js';
import renderer from '../../component/renderer.js';
import Component from '../../component/component.js';
import checkbox from '../../component/checkbox.js';

export default class extends Component {
    constructor(props) {
        super(props);
        this.onInput = this.onInput.bind(this);
        this.checkInputs = this.checkInputs.bind(this);
        this.getQueries = this.getQueries.bind(this);
    }
    afterMount() {
        this.checkInputs();
    }
    getQueries() {
        return this.router.getQueries();
    }
    onInput(e) {
        const { checked , value } = e.target;
        if(checked) {
            if(value === "low" || value === "high") {
                this.router.setQueryToUrl('priceSort',value);
            }
            if(value === "late") {
                this.router.setQueryToUrl('dateSort',value);
            }
            if(value === "true") {
                this.router.setQueryToUrl('isMissile',value);
            }
        } else {
            if(value === "low" || value === "high") {
                this.router.deleteQueryOfUrl('priceSort');
            }
            if(value === "late") {
                this.router.deleteQueryOfUrl('dateSort');
            }
            if(value === "true") {
                this.router.deleteQueryOfUrl('isMissile');
            }
        }
        /// update input checked status.
        // 체크박스 업데이트
        this.checkInputs();
        this.props.sortList();
    }
    checkInputs() {
        const queries = this.getQueries();
        if(queries) {
            const container = document.getElementById(this.props.id);
            const checkboxes = container.getElementsByClassName('checkbox_input');
            for(let i = 0; i < checkboxes.length; i++) {
                const val =  checkboxes[i].value;
                checkboxes[i].checked = false;
                if(queries.priceSort && queries.priceSort  === val) {
                    checkboxes[i].checked = true;
                }
                if(queries.dateSort && queries.dateSort === val) {
                    checkboxes[i].checked = true;
                } 
                if(queries.isMissile && queries.isMissile === val) {
                    checkboxes[i].checked = true;
                }
            }   
        }
    }
    getHtml() {
        const container = this.container;
        container.addEventListener('input',this.onInput);
        renderer(container, checkbox({
            desc: '가격 높은 순',
            value: 'high',
        }));
        renderer(container, checkbox({
            desc: '가격 낮은 순',
            value: "low",
        }));
        renderer(container, checkbox({
            desc: '최신 상품 순',
            value: "late",
        }));
        renderer(container, checkbox({
            desc: '<i class="fas fa-rocket missile"></i> 미사일 배송',
            value: "true",
        }));
        return container;
    }
}