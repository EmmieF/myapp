import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import index from './../pages/index/index'
import cart from './../pages/cart/index'
import member from './../pages/member/index'
import order from './../pages/member/order/order'
import login from './../pages/login/index'
import list from './../pages/list/list'
import test from './../pages/test/test'
import notfound from './../pages/notfound/notfound'
import App from "../App";

const RouterConfig1 = [
    {
        path:'/',
        exact:true,
        component:App,
        childrens:[
            {
                path:'index',
                component:index
            },
            {
                path:'/login',
                component:login
            },{
                path:'/cart',
                component:cart,
            },{
                path:'/me',
                component:member,
            },{
                path:'/list',
                component:list,
            },{
                path:'/test',
                component:test,
            },{
                path:'*',
                component:notfound
            }
        ]
    }
    ,{
        path:'/login',
        component:login
    },{
        path:'/cart',
        component:cart,
    },{
        path:'/me',
        component:member,
    },{
        path:'/list',
        component:list,
    },{
        path:'/test',
        component:test,
    },{
        path:'*',
        component:notfound
    }
];

const RouterConfig = <Route path='/' component={App}>
    <IndexRoute component={index}/>
    <Route path='index' component={index} />
    <Route path='login' component={login} />
    <Route path='cart' component={cart} />
    <Route path='me' component={member} />
    <Route path='order' component={order} />
    <Route path='list' component={list} />
    <Route path='test' component={test} />
    <Route path='*' component={notfound} />
</Route>;
const Routers = ()=>(
    <Router history={browserHistory} routes={RouterConfig}></Router>
);
export default Routers;