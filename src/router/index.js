import App from './../App'
import Index from './../pages/index/index'
const Router = [
    {
        path:'/',
        component:App,
        childRoutes:[
            {
                path:'/index',
                component:Index
            }
        ]
    }
];
export default Router;