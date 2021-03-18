// router dependencies
import Router from './router/router.js';
import Route from './router/route.js';
// state 
import { initObservable } from './state/index.js';
// components
import './component/cleanUp.js';
import Nav from './app/nav/nav.js';
import TopBar from './app/topbar/index.js';
import NotFound from './app/notFound.js';
import Main from './app/main.js';
import Items from './app/items/index.js';
import ItemDetail from './app/item/detail.js';
import Auth from './app/auth/index.js';
import TopAd from './app/ad/topAd.js';
import Footer from './app/footer/index.js';
import Cart from './app/cart/index.js';
// utils
import element from '../js/component/element.js';
import renderer from '../js/component/renderer.js';

import logAll from './log.js';

logAll();
const app_content = element('main',{
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
        userId: '',
        isLogin: false
    },
    mainNav: {
        isCategoryNavOn: false
    },
    cart: [],
    orders: []
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
// Items

new Route(router, app_content,'/items/:category', Items, {
    tag: 'section',
    props: {
        className: 'items_container',
        id: 'itemsByCategory'
    }
}).registerToRouter();

// Item Detail
new Route(router,app_content,'/item/:category/:itemId',ItemDetail,{
    tag: 'section',
    props: {
        id: 'item_detail'
    },
    observable: getObservable()
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

// Cart
new Route(router, app_content, '/cart', Cart, {
    tag: 'section',
    props: {
        id: 'cart_detail',
        className: 'cart_container'
    },
    observable: getObservable()
}).registerToRouter();
// router starts listening history states
router.documentLoaded();

// render topbar and navbar 
const app = document.getElementById('app');
renderer(app, new TopAd({
    tag: 'section',
    props: {
        className: 'topAd',
        id: 'topad'
    },
    isNoLifeCycle: true
}));
renderer(app, new TopBar({
    tag: 'section',
    props: {
        className: 'topbar',
        id: 'topbar'
    },
    observable: getObservable()
}));
renderer(app, new Nav({
    tag: 'section',
    props: {
        id: 'main_nav'
    },
    observable: getObservable()
}));


// app content render
renderer(app, app_content);
renderer(app,new Footer({
    tag: 'footer',
    props: {
        className: 'footer_container'
    }
}));

