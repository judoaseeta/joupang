class CleanUp {
    constructor() {
        //@ cleanUps: Function[]
        this.cleanUps = [];
        this.addCleanUp = this.addCleanUp.bind(this);
        this.cleanAll = this.cleanAll.bind(this);
        this.length = this.length.bind(this);
    }
    addCleanUp (cleanUpFunction) {
        this.cleanUps.push(cleanUpFunction);
    }
    cleanAll() {
        // Excute every added cleanup functions
        this.cleanUps.forEach( cleanUp => cleanUp());
        // initialize cleanup list
        this.cleanUps = [];
    }
    length() {
        return this.cleanUps.length;
    }
}
window.cleanUp = new CleanUp();