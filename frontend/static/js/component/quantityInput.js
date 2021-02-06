import element from './element.js';
import renderer from './renderer.js';
import Component from './component.js';
/**
 * @props
 * @callback: (value) => void;
 * @limit:number;
 * @maxlength: number - html input property
 * @defaultValue?: number - default = 1; 
 */
class QuantityInput extends Component {
    constructor(props) {
        super(props);
        this.onInput = this.onInput.bind(this);
        this.onClick = this.onClick.bind(this);
        this.updateTooltip = this.updateTooltip.bind(this);
    }
    onInput(e) {
        const numRegex = /[0-9]/g;

        const value = e.target.value;
        if(!numRegex.test(value)) {
            e.target.value = '';
        } else if(value.length > this.props.limit) {
            e.target.value = value.slice(0, value.length - 1)
            return;
        } else {
            const numfiedValue = Number(value);
            if(numfiedValue > this.props.maxlength) {
                e.target.value = this.props.maxlength;
            } else {
                this.props.callback(e.target.value);
                return;
            }
        }
    }
    onClick(e) {
        e.preventDefault();
        const currValue = Number(e.currentTarget.previousSibling.value);
        if(e.target.classList.contains('inc')) {
            if(currValue < this.props.maxlength) {
                e.currentTarget.previousSibling.value = currValue + 1;
                this.props.callback( currValue + 1);
            }
        } else {
            if(currValue > 1) {
                e.currentTarget.previousSibling.value = currValue - 1;
                this.props.callback(currValue - 1);
            }
        }
    }
    updateTooltip(value) {

    }
    getHtml() {
        const container = this.container;
        renderer(container, element('input', {
            props: {
                className: 'quantity_input',
                value: this.props.defaultValue ? this.props.defaultValue : 1,
                maxlength: this.props.maxlength,
                type: 'text'
            },
            handler:{
                onInput: this.onInput,
            }
        }));
        const buttonHolder = element('div',{
            props: {
                className: 'quantity_input_buttons'
            },
            handler: {
                onClick: this.onClick
            }
        })
        //increase button
        renderer(buttonHolder, element('button', {
            props: {
                className: 'quantity_input_button inc'
            },
            content: '▲',
        }));
        //decrease button
        renderer(buttonHolder, element('button', {
            props: {
                className: 'quantity_input_button dec'
            },
            content: '▼',
          
        }));
        renderer(container,buttonHolder);
        return container;
    }
}

const quantityInput = ({
    defaultValue,
    limit,
    maxlength,
    callback
}) => new QuantityInput({
    tag: 'div',
    props: {
        className:'quantity_input_container',
        defaultValue,
        limit,
        maxlength,
        callback
    }
});

export default quantityInput;