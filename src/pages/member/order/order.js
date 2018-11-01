import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { Flex, Toast } from 'antd-mobile'
import PropTypes from 'prop-types'
import Header from './../../../components/header/header'
import util from "../../../static/utils"
import { HOC } from './../../../HOC'
import styles from './order.scss'

let loading_more = false;
const load_list = function(page){
    loading_more = true;
    let _this = this;
    _this.setState({
        is_view_load:true,
    });
    Toast.loading('努力加载中',0);
    util._fetch('/m/my-orders-'+ _this.state.order_type +'-'+page+'.html',{method:'get',data:_this.state.params},function (res) {
        Toast.hide();
        if(res.error === '未登录')
            browserHistory.push('/login');
        if(res.error){
            return;
        }
        loading_more = false;
        _this.setState({
            is_view_load:false
        });
        if(res.order_list && res.order_list.length > 1){
            if(page > 1){
                res.order_list = [..._this.state.order_list,...res.order_list];
            }
        }
        if(res.order_items_group && Object.keys(res.order_items_group).length > 1){
            if(page > 1){
                res.order_items_group = Object.assign({},_this.state.order_items_group,res.order_items_group);
            }
        }
        _this.setState(res);
    });
};

class order extends Component{
    constructor(props){
        super(props);
        this.state = {
            headername:'我的订单',
            pagestyle:{position:'absolute',left:0,top:0,height:'100%',width:'100%',overflowY:'scroll',boxSizing:'border-box'},
            order_list:true,
            order_items_group:null,
            images:{},
            order_type:props.location.query.orderType?props.location.query.orderType:'all',
            order_type_arr:[{name:'全部',type:'all'},{name:'待付款',type:'s1'},{name:'待发货',type:'s2'},{name:'待收货',type:'s3'},{name:'待评价',type:'s4'}]
        };
    }
    componentWillMount(){
        load_list.call(this,1);
    }
    componentDidMount(){
        let _this = this;
        if(this.refs.scroller){
            this.refs.scroller.addEventListener('scroll',_this.handleScroll.bind(_this),false);
        }
    }
    orderType_handle(order_type){
        if(order_type === this.state.order_type) return;
        this.setState({order_type,order_list:true},() => {
            load_list.call(this,1);
        });
    }
    handleScroll(event){
        const clientHeight = event.target.clientHeight;
        const scrollHeight = event.target.scrollHeight;
        const scrollTop = event.target.scrollTop;
        if(scrollTop + clientHeight >= scrollHeight-10){
            if(loading_more || (this.state.pager && parseInt(this.state.pager.current) === parseInt(this.state.pager.total))){
                return;
            }
            load_list.call(this,parseInt(this.state.pager.current)+1);
        }
    }
    render(){
        const {headername,order_list,order_items_group,pager,images,pagestyle,order_type,order_type_arr} = this.state;
        const {default_img_url} = this.props.data;
        let content = null;
        if(order_list && order_list.length > 0){
            content = order_list.map((item,index)=>{
                return <li className={styles.item} key={item.order_id}>
                    <div className={styles['item-head']+' weui-flex'}>
                        <div className="weui-flex__item">订单号：{item.order_id}</div>
                        <div className={styles.status}>status</div>
                    </div>
                    {order_items_group[item.order_id].map((val,ind)=>{
                        val.price = util.price(val.price);
                        return <div className={styles['item-main-inf']+' weui-flex'} key={val.item_id}>
                            <div className={styles['img-box']}>
                                <img className={styles['item-img']} src={images[val.image_id+'_m']?images[val.image_id+'_m']:default_img_url} alt="" onLoad={util.lazyLoad.bind(this,val.image_id,'m')} />
                                <span className={images[val.image_id+'_m']?'cart-img-back active':'cart-img-back'}></span>
                            </div>
                            <div className="weui-flex__item">
                                <p className={styles['item-name']}>{val.name}</p>
                                <p className={styles['item-price']}>¥{val.price}</p>
                            </div>
                            <div className={styles['item-num']}>x{val.nums}</div>
                        </div>
                    })}
                    <div className={styles['item-inf']}>共计 {item.quantity} 件 合计 （运费 ¥{item.cost_freight}）：¥{item.order_total}</div>
                    <div className={styles['item-btns']+' clearFix'}>
                        <span className="">订单详情</span>
                    </div>
                </li>
            })
        }else if(pager && parseInt(pager.total) === parseInt(pager.current)){
            content = <div className={styles['empty']}>加载完</div>
        }else if(pager && parseInt(pager.total) > parseInt(pager.current)){
            content = <div className={styles['empty']}>加载中...</div>
        }else if(!order_list){
            content = <div className={styles['empty']}>暂无数据</div>
        }
        return <div style={pagestyle} className={styles['order']} ref="scroller">
            <Flex className={styles['order-header']}>
            {order_type_arr.map((item,index)=>{
                return <Flex.Item onClick={this.orderType_handle.bind(this,item.type)} className={order_type===item.type?styles['active']:''} key={index}>
                    {item.name}
                </Flex.Item>
            })}
            </Flex>
            <Header headername={headername} />
            <div className={styles.list}>
                {this.state.order_list && this.state.order_list.length > 0? <ul>{content}</ul>:content}
            </div>
        </div>
    }
}
order.defaultProps = {
    
}
order.propTypes = {
    
}
export default HOC(order);