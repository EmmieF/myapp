import React from 'react'
import ReactDOM from 'react-dom'
// import 'whatwg-fetch'
// import Promise from 'promise-polyfill'
// import 'core-js/es6/promise'
// import 'isomorphic-fetch'
import {Router, browserHistory} from 'react-router'
import routeconfig from './router/index'
import 'bee-mobile/dist/bee-mobile.min.css'
import 'weui'
// import 'react-weui/build/packages/react-weui.css'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render((
    <Router history={browserHistory} routes={routeconfig}>
    </Router>
), document.getElementById('root'));

registerServiceWorker();
