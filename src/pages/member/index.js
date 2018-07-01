import React, { Component } from 'react';
import Footer from './../../components/footer/footer'
export default class member extends Component{
    constructor(props){
        super(props)
    }
    render (){
        return <div>
        me component
            <Footer pathname={this.props.route.path} />
        </div>
    }
}