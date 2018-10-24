import React from 'react'
import ReactDOM from 'react-dom'
// import 'whatwg-fetch'
// import Promise from 'promise-polyfill'
// import 'core-js/es6/promise'
// import 'isomorphic-fetch'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import Routers from './router/index'
import registerServiceWorker from './registerServiceWorker'
import 'bee-mobile/dist/bee-mobile.min.css'
import './App.css';
import rootReducer from './reducers';

const store = createStore(rootReducer);

ReactDOM.render((
    <Provider store={store}>
        <Routers/>
    </Provider>
), document.getElementById('root'));

registerServiceWorker();
