import React, { Component } from 'react';
import styles from './index.scss'
import {Link} from 'react-router'
import Footer from './../../components/footer/footer'
import Header from './../../components/header/header'
import util from './../../static/utils'
import AddTodo from './../../reducers/containers/AddTodo'
import VisibleTodoList from './../../reducers/containers/VisibleTodoList'
import FooterLink from './../../reducers/containers/FootLink'
import {VisibleFilters} from './../../reducers/actions'
import {Flex} from 'antd-mobile'

export default class member extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        util._fetch('/m/my-orders-all-1.html',{},function(res){
            // console.log(res);
        });
    }
    render (){
        return <div className={styles['member']}>
            <Header headername="个人中心" istabbar={true}></Header>
            <div className={styles['avatar-head']}>
                <div><img className={styles['avatar-img']} src="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAABBSURBVFhH7c4hAQAwDMCw+1cwt7uGsIGC8LyZ2YuKqWKqmCqmiqliqpgqpoqpYqqYKqaKqWKqmCqmiqli6mhs9gMKJKtefbIylAAAAABJRU5ErkJggg==" alt=""/></div>
                <div className={styles['avatart-name']}>name</div>
            </div>
            <div className={styles['order']}>
                <Flex>
                    <Flex.Item>我的订单</Flex.Item>
                    <div className={styles['more']}>查看全部订单</div>
                </Flex>
            </div>
            <Footer pathname={this.props.route.path} />
            {/* <AddTodo></AddTodo>
            <VisibleTodoList></VisibleTodoList>
            <FooterLink filter={VisibleFilters.SHOW_ALL}>All</FooterLink>
            <FooterLink filter={VisibleFilters.SHOW_ACTIVE}>ACTIVE</FooterLink>
            <FooterLink filter={VisibleFilters.SHOW_COMPLETED}>COMPLETED</FooterLink> */}
        </div>
    }
}