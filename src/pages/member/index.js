import React, { Component } from 'react';
import {Link} from 'react-router'
import Footer from './../../components/footer/footer'
import util from './../../static/utils'
import AddTodo from './../../reducers/containers/AddTodo'
import VisibleTodoList from './../../reducers/containers/VisibleTodoList'
import FooterLink from './../../reducers/containers/FootLink'
import {VisibleFilters} from './../../reducers/actions'

export default class member extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        util._fetch('/m/my-orders-all-1.html',{},function(res){
            // console.log(res);
        });
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
        </div>
    }
}