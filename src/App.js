import React, { Component } from 'react';

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