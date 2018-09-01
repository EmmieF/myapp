import React, { Component } from 'react';

import Footer from './components/footer/footer'

class App extends Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){
        // console.log(this,'APP');
    }
    render() {
        return (
            <div>
                {/*<Footer />*/}
                {this.props.children}
            </div>
        );
    }
}
export default App;