import renderer from '../component/renderer.js';

export default class Route {
    constructor(
        router, 
        target, 
        path, 
        Component, 
        componentProps = {

        }
    ) {
        this.path = path;
        this.router = router;
        this.target = target;
        this.Component = Component;
        this.componentProps = componentProps;
        this.render = this.render.bind(this);
        this.registerToRouter = this.registerToRouter.bind(this);
    }
    render() {
        if(this.target.firstChild) {
            while (this.target.firstChild) {
                this.target.removeChild(this.target.firstChild);
            }
        }
        renderer(this.target, new this.Component({
            ...this.componentProps,
            router: this.router
        }));
    }
    registerToRouter() {
        this.router.registerRoute({
            path: this.path,
            render: this.render
        })
    }
    
}