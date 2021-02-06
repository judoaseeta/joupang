import Observable from './observable.js';

export function initObservable(initialState = {}) {
    const observable = new Observable(initialState);
    return () => observable;
} 

export function getObservable() {
    return window.observable;
}