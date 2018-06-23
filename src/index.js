import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, Link} from 'react-router'
import './index.css';
import App from './App';
import IndexEle from './pages/index/index'
import routeConfig from './router/index'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <Router history={browserHistory} routes={routeConfig}>
        {/*<Route path="/" component={App} >*/}
            {/*<Route path='about' component={IndexEle} />*/}
        {/*</Route>*/}
    </Router>
), document.getElementById('root'));

registerServiceWorker();
