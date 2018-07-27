import index from './../pages/index/index'
import cart from './../pages/cart/index'
import member from './../pages/member/index'
import login from './../pages/login/index'

const Router = [
    {
        path:'/',
        component:index,
    },{
        path:'/login',
        component:login
    },{
        path:'/index',
        component:index,
    },{
        path:'/cart',
        component:cart,
    },{
        path:'/me',
        component:member,
    },
];
export default Router;