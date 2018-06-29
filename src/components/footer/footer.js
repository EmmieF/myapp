import React,{Component} from 'react';
import {Router, Route, browserHistory, hashHistory,Link,IndexRoute} from 'react-router'
import {TabBar,TabBarItem,TabBarIcon,TabBarLabel} from 'react-weui'
import './footer.css'

import IndexIcon from './../../assion/images/tabbar/home.png'
import IndexFillIcon from './../../assion/images/tabbar/home_active.png'
import MeIcon from './../../assion/images/tabbar/member.png'
import MeFillIcon from './../../assion/images/tabbar/member_active.png'
import CartIcon from './../../assion/images/tabbar/cart.png'
import CartFillIcon from './../../assion/images/tabbar/cart_active.png'

class footer extends Component {
    state={
        tab:0
    };
    constructor(props){
        super(props);
    };
    componentDidMount(){
        console.log('componentDidMount');
        console.log(this.Props);
    }
    componentWillUnmount(){
        console.log('componentWillUnmount');
    }
    render (){
        return <footer>
            <TabBar>
                <TabBarItem active={this.state.tab == 0} onClick={e=>this.setState({tab:0})}>
                    <Link to="/index">
                        <TabBarIcon>
                            <img src={this.state.tab==0?IndexFillIcon:IndexIcon}/>
                        </TabBarIcon>
                        <TabBarLabel>首页</TabBarLabel>
                    </Link>
                </TabBarItem>
                <TabBarItem active={this.state.tab == 1} onClick={e=>this.setState({tab:1})}>
                    <Link to="/cart">
                        <TabBarIcon>
                            <img src={this.state.tab == 1?CartFillIcon:CartIcon}/>
                        </TabBarIcon>
                        <TabBarLabel>购物车</TabBarLabel>
                    </Link>
                </TabBarItem>
                <TabBarItem active={this.state.tab == 3} onClick={e=>this.setState({tab:2})}>
                    <Link to="/me">
                        <TabBarIcon>
                            <img src={this.state.tab == 3?MeFillIcon:MeIcon}/>
                        </TabBarIcon>
                        <TabBarLabel>我的</TabBarLabel>
                    </Link>
                </TabBarItem>
            </TabBar>
        </footer>
    }
}
export default footer;