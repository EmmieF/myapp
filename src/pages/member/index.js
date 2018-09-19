import React, { Component } from 'react';
import {Link} from 'react-router'
import Footer from './../../components/footer/footer'
import Counter from './../../components/counter/counter'
import util from './../../static/utils'

export default class member extends Component{
    getChildContext(){
        return {store:this.store}
    }
    constructor(props,context){
        super(props,context);
        this.store = props.store;
    }
    componentWillMount(){
        util._fetch('/m/my-orders-all-1.html',{},function(res){
            // console.log(res);
        });
    }
    render (){
        // let {store} = this.props.store;
        return <div>
            me component
            <Link to='dddd'> 404</Link>
            <Counter  value={store.getState()} onIncrement={store.dispatch({type:'INCREMENT'})} onDecrement={store.dispatch({type:'DECREMENT'})}/>
            <Footer pathname={this.props.route.path} />
        </div>
    }
}