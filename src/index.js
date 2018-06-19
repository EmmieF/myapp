import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, Link} from 'react-router'
import './index.css';
import App from './App';
import IndexEle from './pages/index/index'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App} />
        <Route path="/index" component={IndexEle} />
    </Router>
), document.getElementById('root'));

// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
