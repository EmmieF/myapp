import React, { Component } from 'react';
import {Router, Route, Link} from 'react-router'
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Link to='/index'>index</Link>
            </div>
        );
    }
}
export default App;
