import { getByText } from '@testing-library/dom';
import renderer from '../renderer.js';

describe('testing renderer function', () => {
    it('should render both string and Node to target element', () => {
        const target = document.createElement('section');
        const stringNode = `<h1>String Node</h1>`;
        renderer(target,stringNode);
        const result = getByText(target, 'String Node');
        expect(result).toBeTruthy();
    });
    it('should replace the original element to new one', () => {

        // assume we create element with id 'target' append it to body
        const target = document.createElement('section');
        target.id = 'target';
        const stringNode = `<h1>String Node</h1>`;
        renderer(target,stringNode);
        document.body.appendChild(target);
        const result = getByText(document.getElementById('target'), 'String Node');
        expect(result).toBeTruthy();
        //
        const replacer = document.createElement('h2');
        const replaceText = document.createTextNode('Replace Node');
        replacer.appendChild(replaceText);
        renderer('target', replacer);
        const replacedResult = getByText(document.getElementById('target'), 'Replace Node');
        expect(replacedResult).toBeTruthy();
    })
});