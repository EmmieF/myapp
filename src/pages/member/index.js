import React, { Component } from 'react';
import styles from './index.scss'
import {Link,browserHistory} from 'react-router'
import Footer from './../../components/footer/footer'
import Header from './../../components/header/header'
import util from './../../static/utils'
// import AddTodo from './../../reducers/containers/AddTodo'
// import VisibleTodoList from './../../reducers/containers/VisibleTodoList'
// import FooterLink from './../../reducers/containers/FootLink'
// import {VisibleFilters} from './../../reducers/actions'
import {Flex} from 'antd-mobile'

export default class member extends Component{
    constructor(props){
        super(props);
        this.state = {
            default_img_url:'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAABBSURBVFhH7c4hAQAwDMCw+1cwt7uGsIGC8LyZ2YuKqWKqmCqmiqliqpgqpoqpYqqYKqaKqWKqmCqmiqli6mhs9gMKJKtefbIylAAAAABJRU5ErkJggg==',
            images:[]
        };
    }
    componentWillMount(){
        // util._fetch('/m/my-orders-all-1.html',{},function(res){
        //     // console.log(res);
        // });
        let _this = this;
        util._fetch('m/my.html',{},function(response){
            _this.setState(response);
        })
    }
    logout_haddle = () => {
        util._fetch('/m/passport-logout.html',{},function(response){
            if(response.success){
                browserHistory.push('/login');
            }
        })
    };
    render (){
        let {member,default_img_url,images} = this.state;
        let userLogin = null,logout = null,avatar = null;
        if(member){
            userLogin = <div className={styles['avatart-name']}>{member.name?member.name:member.uname}</div>;
            logout = <div className={styles.logout} onClick={this.logout_haddle}>退出登录</div>;
            avatar = <img className={styles['avatar-img']} src={images[member.avatar+'_m']?images[member.avatar+'_m']:default_img_url} alt="" onLoad={util.lazyLoad.bind(this,member.avatar,'m')} />;
        }else{
            userLogin = <Link className={styles['avatart-name']} to="/login">登录</Link>;
            avatar = <img className={styles['avatar-img']} src={default_img_url} alt="" />
        }
        return <div className={styles['member']}>
            <Header headername="个人中心" istabbar={true}></Header>
            <div className={styles['avatar-head']}>
                <div>
                    {member?<img className={styles['avatar-img']} src={images[member.avatar+'_m']?images[member.avatar+'_m']:default_img_url} alt="1" onLoad={util.lazyLoad.bind(this,member.avatar,'m')} />:<img className={styles['avatar-img']} src={default_img_url} alt="2" />}
                </div>
                {userLogin}
            </div>
            <div className={styles['order']}>
                <Flex>
                    <Flex.Item>我的订单</Flex.Item>
                    <Link className={styles['more']} to='/order?orderTpe=all'>查看全部订单</Link>
                </Flex>
                <Flex>
                    <Flex.Item className={styles.item}>
                        <Link to='/order?orderType=s1'>
                            <div className={styles.icon +' iconfont icon-daifukuan'}>
                                {/* <i className={styles['order-nums']}>1</i> */}
                            </div>
                            <div className={styles['text']}>待付款</div>
                        </Link>
                    </Flex.Item>
                    <Flex.Item className={styles.item}>
                        <Link to='/order?orderType=s2'>
                            <div className={styles.icon +' iconfont icon-icon-test'}>
                                {/* <i className={styles['order-nums']}></i> */}
                            </div>
                            <div className={styles['text']}>待发货</div>
                        </Link>
                    </Flex.Item>
                    <Flex.Item className={styles.item}>
                        <Link to='/order?orderType=s3'>
                            <div className={styles.icon +' iconfont icon-daishouhuo'}>
                                {/* <i className={styles['order-nums']}></i> */}
                            </div>
                            <div className={styles['text']}>待收货</div>
                        </Link>
                    </Flex.Item>
                    <Flex.Item className={styles.item}>
                        <Link to='/order?orderType=s4'>
                            <div className={styles.icon +' iconfont icon-daipingjia01'}>
                                {/* <i className={styles['order-nums']}></i> */}
                            </div>
                            <div className={styles['text']}>待评价</div>
                        </Link>
                    </Flex.Item>
                </Flex>
            </div>
            {logout}
            <Footer pathname={this.props.route.path} />
            {/* <AddTodo></AddTodo>
            <VisibleTodoList></VisibleTodoList>
            <FooterLink filter={VisibleFilters.SHOW_ALL}>All</FooterLink>
            <FooterLink filter={VisibleFilters.SHOW_ACTIVE}>ACTIVE</FooterLink>
            <FooterLink filter={VisibleFilters.SHOW_COMPLETED}>COMPLETED</FooterLink> */}
        </div>
    }
}