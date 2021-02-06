import element from './element.js';
import renderer from './renderer.js';
import Component from './component.js';

class CheckBox extends Component {
    constructor(props) {
        super(props);
    }
    getHtml() {
        const container =  this.container;
        const generatedId = `checkbox_${Math.floor(Math.random() * 100)}`;
        const img = element('img', {
            props: {
                className: 'checkbox_img',
                src: this.props.src
            }
        });
        renderer(container,img);
        const input = element('input', {
            props: {
                className: 'checkbox_input',
                type:'checkbox',
                id: generatedId,
                value: `${this.props.index}`
            }
        });
        const Label = element('label',{
            props: {
                className: 'checkbox_label',
                attributes: {
                    for:generatedId
                }
            },
        })
        renderer(container,input);
        renderer(container, Label);
        renderer(container, element('p', {
            props: {
                className: 'checkbox_content'
            },
            content: this.props.desc
        }))
        return container;
    }
}

export default function checkBox(desc,src,index) {
    return new CheckBox({
        tag: 'div',
        props: {
            className: 'checkbox_container',
            desc,
            src,
            index
        }
    });
}