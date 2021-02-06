class Router {
    constructor() {
        this.routes = [
        ];
        this.back = this.back.bind(this);
        this.navigateTo = this.navigateTo.bind(this);
        this.addGlobalEvent = this.addGlobalEvent.bind(this);
        this.documentLoaded = this.documentLoaded.bind(this);
        this.pathToRegex = this.pathToRegex.bind(this);
        this.routing = this.routing.bind(this);
        this.getParams = this.getParams.bind(this);
        this.getQueries = this.getQueries.bind(this);
        this.registerRoute = this.registerRoute.bind(this);
        this.getMatchFromPathname = this.getMatchFromPathname.bind(this);
        this.addGlobalEvent();
    }
    back() {
        history.back();
    }
    registerRoute(pathObj) {
        this.routes.push(pathObj);
    }
    addGlobalEvent() {
        document.body.addEventListener('navigateTo',e => {
            this.navigateTo(e.detail.href);
        });
        window.addEventListener('popstate', this.routing);
    }
    documentLoaded() {
        console.log(this.routes);
        this.routing();
    }
    navigateTo(url) {
        history.pushState(null,'test',url);
        this.routing();
    }
    pathToRegex(path) {
        // filter index path '/' in order not to match any routes
        if(path === '/') {
            return new RegExp(/\/$/);
        }
        return new RegExp("^" + path.replace(/\//g,"\\/").replace(/:\w+/g,"(.+)"));
    }
    getQueries() {
        const queries = location.search.match(/\w+=\w+[,\w]*/g);
        const parsed = {};
        if(queries && queries.length > 0) {
            for(let query of queries) {
                const [ key, value ] = query.split('=');
                parsed[key] = value.includes(',') ? value.split(',') : value;
            }
        }
        return parsed;
    }
    // find matched route with location.pathname
    getMatchFromPathname() {
        const candidates = this.routes.map(route => ({
            route,
            result: location.pathname.match(this.pathToRegex(route.path))
        }));
        return candidates.find( candidate => candidate.result !== null);
    }
    getParams() {
        let { result,route } = this.getMatchFromPathname();
        const params = result.slice(1);
        const paramKeys = Array.from(route.path.matchAll(/:(\w+)/g)).map(res => res[1]);
        const paramObj = {

        }
        paramKeys.forEach((key,i) => {
            paramObj[key] = params[i];
        })

        return paramObj;
        
    }
    routing() {
        let match = this.getMatchFromPathname();
        console.log(match);
        if(!match) {
            console.log('not');
            match = {
                route: {
                    path: '/notfound',
                    render: this.routes[0].render
                },
                result:this.pathToRegex('/notfound')
            }
        }
        if(match) {
            match.route.render();
        }
    }
}
export default Router;
