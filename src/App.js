import React, { Component } from 'react';
import {Router, Route, Link} from 'react-router'
import {Button} from 'react-weui'
import 'weui'
import 'react-weui/build/packages/react-weui.css'
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Button>这是Button</Button>
                <div><Link to='/index'>index</Link></div> 
            </div>
        );
    }
}
export default App;