import React, { Component } from 'react';
import logo from './logo.svg';
import {Router, Route, Link} from 'react-router'
import Index from './pages/index/index'
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <div className="div">这是一个react</div>
            </div>
        );
    }
}
export default App;
