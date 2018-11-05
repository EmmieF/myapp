import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import index from './../pages/index/index'
import cart from './../pages/cart/index'
import member from './../pages/member/index'
import order from './../pages/member/order/order'
import detail from './../pages/member/order/detail/detail'
import login from './../pages/login/index'
import list from './../pages/list/list'
import Product from './../pages/product/product'
import notfound from './../pages/404/404'
import App from "../App";

const RouterConfig = <Route path='/' component={App}>
    <IndexRoute component={index}/>
    <Route path='index' component={index} />
    <Route path='login' component={login} />
    <Route path='cart' component={cart} />
    <Route path='me' component={member} />
    <Route path='order' component={order} />
    <Route path='order/detail' component={detail} />
    <Route path='list' component={list} />
    <Route path='product' component={Product} />
    <Route path='*' component={notfound} />
</Route>;
const Routers = ()=>(
    <Router history={browserHistory} routes={RouterConfig}></Router>
);
export default Routers;