import React, { Component } from 'react';
import Footer from './../../components/footer/footer'
import AddTodo from './../addTodo'
import Filterlink from './../filterlink'
import VisibleTodoList from './../visibleTodoList'

export default class cart extends Component{
    constructor(props){
        super(props);
        this.state = {
            completed:false,
            test:'这是test'
        }
    }
    handlerStoreClick(){
        console.log(33);
    }
    render (){
        let {completed,test} = this.state;
        return <div>
            cart component
            <AddTodo />
            <VisibleTodoList />
            <Filterlink />
            <Footer pathname={this.props.route.path} />
        </div>
    }
}