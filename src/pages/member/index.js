import React, { Component } from 'react';
import {Link} from 'react-router'
import Footer from './../../components/footer/footer'
import util from './../../static/utils'

export default class member extends Component{
    constructor(props){
        super(props)
    }
    componentWillMount(){
        util._fetch('/m/my-orders-all-1.html',{},function(res){
            // console.log(res);
        });
    }
    render (){
        return <div>
            me component
            <Link to='dddd'> 404</Link>
            <Footer pathname={this.props.route.path} />
        </div>
    }
}