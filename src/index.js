import React from 'react'
import ReactDOM from 'react-dom'
// import 'whatwg-fetch'
// import Promise from 'promise-polyfill'
// import 'core-js/es6/promise'
// import 'isomorphic-fetch'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import toApp from './stores/reducers'
import Routers from './router/index'
import 'bee-mobile/dist/bee-mobile.min.css'
import 'weui'
import registerServiceWorker from './registerServiceWorker'

let store = createStore(toApp);
ReactDOM.render((
    <Provider store={store}>
        <Routers/>
    </Provider>
), document.getElementById('root'));

registerServiceWorker();
