export default class Observable {
    constructor(initialState = {}) {
        this.state = initialState;
        this._observers = [];
        this.subscribe = this.subscribe.bind(this);
        this._notify = this._notify.bind(this);
        this.getState = this.getState.bind(this);
        this.update = this.update.bind(this);
    }
    subscribe(observer) {
        this._observers.push(observer);
    }
    _notify() {
        this._observers.forEach(observer => 
            observer(this.state)    
        )
    }
    getState() {
        return this.state;
    }
    update(updatedStateOrFunc){
        if(typeof updatedStateOrFunc === 'function') {
            this.state = updatedStateOrFunc(this.state);
        } else {
            this.state = {
                ...this.state,
                ...updatedStateOrFunc,
            }
        }
        this._notify();
    }
    unsubscribe(observer) {
        const index = this._observers.findIndex((v) => v === observer);
        if(index > -1) {
            this._observers = [...this._observers.slice(0, index),...this._observers.slice(index +1)];
        }
    }
}
