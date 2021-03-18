import { getByText  } from '@testing-library/dom';
import Component from '../component.js';
import renderer from '../renderer.js';
class Example extends Component {
    constructor(props) {
        super(props);
    }
    getHtml() {
        const container = this.container;
        if(this.state.name) {
            renderer(container,`<h2>${this.state.name}</h2>`);
            return container;
        } else {
            renderer(container,`<h2>No Name</h2>`);
            return container;
        }
    }
}
class Example2 extends Component {
    constructor(props) {
        super(props);
    }
    afterMount() {
        this.update({
            name: 'Gabriel'
        });
    }
    getHtml() {
        const container = this.container;
        if(this.state.name) {
            renderer(container,`<h2>${this.state.name}</h2>`);
        } else {
            renderer(container,`<h2>No Name</h2>`);
        }
        return container;
    }
}

describe('Testing Component',() => {
    beforeEach(() => {
        jest.useFakeTimers();
    })
    it('the render method of a base component should return default element', () => {
        const component = new Component({});
        const container = document.createElement('div');
        renderer(container, component)
        const expected = getByText(container, 'This is a default rendered element');
        expect(expected).toBeTruthy();
    });
    it('the rendred element of extend component can be changed by its own state', () => {
        const component = new Example({
            state: {
                name: ''
            },
            props: {
                id: 'example'
            }
        });
        const container = document.createElement('div');
        container.id = 'container';
        document.body.appendChild(container);
        renderer(document.getElementById('container'), component);
        const expected = getByText(container, 'No Name');
        // without state.name it should return 'No Name'
        expect(expected).toBeTruthy();
        // update by functional state updater;
        component.update(state => ({
            ...state,
            name:'Roy'
        }));
        const expected2 = getByText(document.getElementById('container'), 'Roy');
        expect(expected2).toBeTruthy();
        // update by common state merging.
        component.update(state => ({
            ...state,
            name:'Falca'
        }));
        const expected3 = getByText(document.getElementById('container'), 'Falca');
        expect(expected3).toBeTruthy();

        // update by nor function or state should throw error.
        expect(() => component.update('cewwe')).toThrow();
    });
});