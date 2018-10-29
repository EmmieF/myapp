import React, { Component } from 'react';
import {Link} from 'react-router'
import Footer from './../../components/footer/footer'
import util from './../../static/utils'
import AddTodo from './../../reducers/containers/AddTodo'
import VisibleTodoList from './../../reducers/containers/VisibleTodoList'
import FooterLink from './../../reducers/containers/FootLink'
import {VisibleFilters} from './../../reducers/actions'
import {Button,Modal} from 'antd-mobile'

export default class member extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        util._fetch('/m/my-orders-all-1.html',{},function(res){
            // console.log(res);
        });
    }
    view_modal = ()=>{
        Modal.alert('提示','内容',[
            {text:'取消',onPress:()=>{console.log(111)}},
            {text:'确认',onPress:()=>{console.log(222)}}
        ])
    }
    componentDidMount(){
        
    }
    render (){
        return <div>
            me component
            <AddTodo></AddTodo>
            <VisibleTodoList></VisibleTodoList>
            <FooterLink filter={VisibleFilters.SHOW_ALL}>All</FooterLink>
            <FooterLink filter={VisibleFilters.SHOW_ACTIVE}>ACTIVE</FooterLink>
            <FooterLink filter={VisibleFilters.SHOW_COMPLETED}>COMPLETED</FooterLink>
            <Link to='dddd'> 404</Link>
            <Footer pathname={this.props.route.path} />
            <Button type="primary" onClick={this.view_modal}>Start</Button>
        </div>
    }
}