import index from './../pages/index/index'
import cart from './../pages/cart/index'
import member from './../pages/member/index'
import login from './../pages/login/index'
import list from './../pages/list/list'

const Router = [
    {
        path:'/',
        exact:true,
        component:index,
    },{
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
    },
];
export default Router;