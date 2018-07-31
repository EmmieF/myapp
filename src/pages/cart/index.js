import React, { Component } from 'react';
import Footer from './../../components/footer/footer'
export default class cart extends Component{
    // constructor(props){
    //     super(props)
    // }
    render (){
        return <div>cart component
            <Footer pathname={this.props.route.path} />
        </div>
    }
}