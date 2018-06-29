import App from './../App'
import index from './../pages/index/index'
import about from './../pages/about/index'
import cart from './../pages/cart/index'
import member from './../pages/member/index'
const Router = [
    {
        path:'/',
        component:index,
    },{
        path:'/index',
        component:index,
    },{
        path:'/about',
        component:about,
    },{
        path:'/cart',
        component:cart,
    },{
        path:'/me',
        component:member,
    },
];
export default Router;