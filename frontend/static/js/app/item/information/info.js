import Component from '../../../component/component.js';
import element from '../../../component/element.js';
import renderer from '../../../component/renderer.js';

export default class extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick(e) {
        const info = e.target.parentElement;
        //인포 컴퍼넌트 확장을 위한 클래스 추가
        info.classList.add('on');
    }
    getHtml() {
        const container = this.container;
        const { 
            name,
            category, 
            subCategory,
            createdAt,
            brand, 
            seller,
            content,
            image_urls
        } = this.props.data;
        const table = `
            <h3 class="item_detail_tab_title">상품 관련 정보.</h3>
            <table>
                <tbody>
                    <tr>
                        <th>상품명</th>
                        <td>${name}</td>
                        <th>종류</th>
                        <td>${category}</td>
                    </tr>
                    <tr>
                        <th>세부분류</th>
                        <td>${subCategory}</td>
                        <th>등록일</th>
                        <td>${new Date(createdAt).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                        <th>브랜드</th>
                        <td>${brand}</td>
                        <th>판매자</th>
                        <td>${seller}</td>
                    </tr>
                </tbody>
            </table>
            <content>
                <p>${content}</p>
            </content>
        `;
        renderer(container, table);
        image_urls.forEach( url => 
            renderer(container, element('img',{
                props:{
                    src: url
                }
            })) 
        );
        renderer(container,element('button', {
            props: {
                className: 'openButton'
            },
            handler: {
                onClick: this.onClick
            },
            content: '모두 보기'
        }))
        return container;
    }
}