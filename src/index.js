import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, browserHistory, hashHistory,Link,IndexRoute} from 'react-router'
import './index.css'
import routeconfig from './router/index'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render((
    <Router history={browserHistory} routes={routeconfig}>
    </Router>
), document.getElementById('root'));

registerServiceWorker();
