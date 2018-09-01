import React,{Component} from 'react';
import {Link} from 'react-router'
import styles from './footer.scss'
import IndexIcon from './../../assion/images/tabbar/home.png'
import IndexFillIcon from './../../assion/images/tabbar/home_active.png'
import MeIcon from './../../assion/images/tabbar/member.png'
import MeFillIcon from './../../assion/images/tabbar/member_active.png'
import CartIcon from './../../assion/images/tabbar/cart.png'
import CartFillIcon from './../../assion/images/tabbar/cart_active.png'

export default class footer extends Component {
    pathnamearr=[
        '/index','cart','me'
    ];
    constructor(props){
        super(props);
        this.state = {
            pathIndex:0,
        }
    }
    componentDidMount(){
        // console.log(this,'footer');
        this.setState({
            pathIndex:this.pathnamearr.indexOf(this.props.pathname)
        })
    }
    componentWillUnmount(){
    }
    render (){
        return <footer className={styles.footerEle}>
            <div className="weui-flex">
                <Link to='/index' className="weui-flex__item" activeClassName={styles.active}>
                    <img className={styles['label-img']} src={this.state.pathIndex === 0?IndexFillIcon:IndexIcon}/>
                    <div className={styles.label}>首页</div>
                </Link>
                <Link to='/cart' className="weui-flex__item" activeClassName={styles.active}>
                    <img className={styles['label-img']} src={this.state.pathIndex === 1?CartFillIcon:CartIcon}/>
                    <div className={styles.label}>购物车</div>
                </Link>
                <Link to='/me' className="weui-flex__item" activeClassName={styles.active}>
                    <img className={styles['label-img']} src={this.state.pathIndex === 2?MeFillIcon:MeIcon}/>
                    <div className={styles.label}>我的</div>
                </Link>
            </div>
        </footer>
    }
}