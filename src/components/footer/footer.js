import React,{Component} from 'react';
import {Link} from 'react-router'
import './footer.css'

import IndexIcon from './../../assion/images/tabbar/home.png'
import IndexFillIcon from './../../assion/images/tabbar/home_active.png'
import MeIcon from './../../assion/images/tabbar/member.png'
import MeFillIcon from './../../assion/images/tabbar/member_active.png'
import CartIcon from './../../assion/images/tabbar/cart.png'
import CartFillIcon from './../../assion/images/tabbar/cart_active.png'

export default class footer extends Component {
    state={
        pathIndex:0,
    };
    pathnamearr=[
        '/','/cart','/me'
    ];
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.setState({
            pathIndex:this.pathnamearr.indexOf(this.props.pathname)
        })
    }
    componentWillUnmount(){
    }
    render (){
        return <footer>
            <div className="weui-flex">
                <Link to='/' className="weui-flex__item">
                    <img className="label-img" src={this.state.pathIndex === 0?IndexFillIcon:IndexIcon}/>
                    <div className={this.state.pathIndex === 0?'label active':'label'}>首页</div>
                </Link>
                <Link to='/cart' className="weui-flex__item">
                    <img className="label-img" src={this.state.pathIndex === 1?CartFillIcon:CartIcon}/>
                    <div className={this.state.pathIndex === 1?'label active':'label'}>购物车</div>
                </Link>
                <Link to='/me' className="weui-flex__item">
                    <img className="label-img" src={this.state.pathIndex === 2?MeFillIcon:MeIcon}/>
                    <div className={this.state.pathIndex === 2?'label active':'label'}>我的</div>
                </Link>
            </div>
        </footer>
    }
}