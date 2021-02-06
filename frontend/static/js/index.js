// router dependencies
import Router from './router.js';
import Route from './router/route.js';
// state 
import { initObservable } from './state/index.js';
// components
import Nav from './app/nav/nav.js';
import TopBar from './app/topbar/index.js';
import NotFound from './app/notFound.js';
import Missile from './app/missile.js';
import Main from './app/main.js';
import ItemDetail from './app/item/detail.js';
import Auth from './app/auth/index.js';
// utils
import element from '../js/component/element.js';
import renderer from '../js/component/renderer.js';


const app_content = element('div',{
    props: {
        id: 'app_content'
    }
});
// code for the state management goes here.
export const getObservable = initObservable({
    sliderState: {
        currPage:0 
    },
    itemSection: {
        selectedSection: -1
    },
    auth: {
        isLogin: false
    },
    cart: []
});


// code for the router goes here.
const router = new Router();
// Not Found
new Route(router, app_content, '/notfound', NotFound, {
    tag: 'div'
}).registerToRouter();
// Main
new Route(router,app_content,'/',Main,{
    tag: 'section',
    props: {
        id: 'app_main'
    },
}).registerToRouter();
new Route(router,app_content,'/item/:category/:itemId',ItemDetail,{
    tag: 'section',
    props: {
        id: 'item_detail'
    },
}).registerToRouter();
// Missile
new Route(router,app_content,'/missile',Missile,{
    tag: 'section',
    props: {
        id: 'missile'
    }
}).registerToRouter();
// AuthForm
new Route(router,app_content, '/auth/:type', Auth, {
    tag: 'section',
    props: {
        id: 'auth'
    },
    observable: getObservable()
}).registerToRouter();
// render app by current route

router.documentLoaded();

// render navbar 
const app = document.getElementById('app');
renderer(app, new TopBar({
    tag: 'section',
    props: {
        className: 'topbar'
    },
    observable: getObservable()
}));
renderer(app, new Nav({
    tag: 'section',
    props: {
        id: 'main_nav'
    }
}));



renderer(app, app_content);
renderer(app,element('footer',{
    props: {
        id: 'footer'
    }
}))