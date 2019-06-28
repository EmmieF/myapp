import React from 'react'
import ReactDOM from 'react-dom'
import 'whatwg-fetch'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import Routers from './router/index'
import registerServiceWorker from './registerServiceWorker'
import './App.css';
import rootReducer from './reducers';
import { addTodo } from './reducers/actions';

const store = createStore(rootReducer);

const unsubscribe = store.subscribe(()=>{
    console.log(store.getState(),'subscribe');
});
setTimeout(()=>{
    unsubscribe();
},5000);

store.dispatch(addTodo('这是测试的'));

ReactDOM.render((
    <Provider store={store}>
        <Routers/>
    </Provider>
), document.getElementById('root'));

registerServiceWorker();
