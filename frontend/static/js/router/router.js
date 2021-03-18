class Router {
    constructor() {
        this.routes = [
        ];
        this.back = this.back.bind(this);
        this.navigateTo = this.navigateTo.bind(this);
        this.addGlobalEvent = this.addGlobalEvent.bind(this);
        this.deleteQueryOfUrl = this.deleteQueryOfUrl.bind(this);
        this.setQueryToUrl = this.setQueryToUrl.bind(this);
        this.documentLoaded = this.documentLoaded.bind(this);
        this.pathToRegex = this.pathToRegex.bind(this);
        this.routing = this.routing.bind(this);
        this.getCurrentRoute = this.getCurrentRoute.bind(this);
        this.getParams = this.getParams.bind(this);
        this.getQueries = this.getQueries.bind(this);
        this.registerRoute = this.registerRoute.bind(this);
        this.getMatchFromPathname = this.getMatchFromPathname.bind(this);
        // start to listen.
        // 네비게이트 이벤트를 리슨
        this.addGlobalEvent();
    }
    deleteQueryOfUrl(key) {
        const url = new URL(window.location);
        url.searchParams.delete(key);
        window.history.pushState({}, '', url);
    }
    setQueryToUrl(key,value) {
        const url = new URL(window.location);
        url.searchParams.set(key, value);
        window.history.pushState({}, '', url);
    }
    // 뒤로 가기
    back() {
        history.back();
    }
    // 라우트를 라우터에 등록하는 펑션.
    registerRoute(pathObj) {
        this.routes.push(pathObj);
    }
    //  routing을 위한 Custom Event navigateTo를 리스닝.
    // 혹은 popstate event를 리스닝.
    addGlobalEvent() {
        document.body.addEventListener('navigateTo',e => {
            this.navigateTo(e.detail.href, e.detail.state);
        });
        window.addEventListener('popstate', this.routing);
    }
    documentLoaded() {
        this.routing();
    }
    // navigateTo event에 따라 특정한 url과 state로 pushState
    navigateTo(url, state) {
        history.pushState(state ? state : null ,'Joupang',url);
        if(state) {
            // state에 스크롤 탑이 있다면 
            if(typeof state.scrollTop === 'number') {
                window.scrollTo(0,state.scrollTop);
            }
        }   
        this.routing();
        
    }
    pathToRegex(path) {
        // filter index path '/' in order not to match any routes
        if(path === '/') {
            return new RegExp(/\/$/);
        }
        return new RegExp("^" + path.replace(/\//g,"\\/").replace(/:\w+/g,"(.+)"));
    }
    getCurrentRoute() {
        return location.pathname;
    }
    getQueries() {
        const queries = location.search.slice(1);
        const parsedQueries = queries.split('&');
        const parsed = {};
        if(queries && parsedQueries.length > 0) {
            parsedQueries.forEach(parsedQuery => {
                const splitted = parsedQuery.split('=');
                parsed[splitted[0]] = splitted[1];
            });
            return parsed;
        }
        return null;
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
        if(!match) {
            match = {
                route: {
                    path: '/notfound',
                    render: this.routes[0].render
                },
                result:this.pathToRegex('/notfound')
            }
        }
        if(match) {
            if(window.cleanUp && window.cleanUp.length() > 0) {
                window.cleanUp.cleanAll();
            }
            match.route.render();
        }
    }
}
export default Router;
