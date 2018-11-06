import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { Flex, Toast, PullToRefresh } from 'antd-mobile'
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
            order_list:true,
            order_items_group:null,
            images:{},
            order_type:props.location.query.orderType?props.location.query.orderType:'all',
            order_type_arr:[{name:'全部',type:'all'},{name:'待付款',type:'s1'},{name:'待发货',type:'s2'},{name:'待收货',type:'s3'},{name:'待评价',type:'s4'}],
            status_kvmap: {
                order_status: {
                    'active': '执行中',
                    'dead': '已作废',
                    'finish': '已完成'
                },
                pay_status: ['未支付', '已付款', '已付款至到担保方', '部分付款', '部分退款', '全额退款'],
                ship_status: ['未发货', '已发货', '部分发货', '部分退货', '已退货','已确认收货'],
            },
            refreshing:false
        };
        this.handleScroll = this.handleScroll.bind(this);
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
        // const clientHeight = event.target.clientHeight;
        // const scrollHeight = event.target.scrollHeight;
        // const scrollTop = event.target.scrollTop;
        // if(scrollTop + clientHeight >= scrollHeight-10){
            if(loading_more || (this.state.pager && parseInt(this.state.pager.current,0) === parseInt(this.state.pager.total,0))){
                return;
            }
            load_list.call(this,parseInt(this.state.pager.current,0)+1);
        // }
    }
    gotoPage(order_id,e){
        e.stopPropagation();
        e.preventDefault();
        browserHistory.push('order/detail?order_id='+order_id);
    }
    render(){
        const {headername,order_list,order_items_group,pager,images,pagestyle,order_type,order_type_arr,status_kvmap} = this.state;
        const {default_img_url} = this.props;
        let content = null;
        if(order_list && order_list.length > 0){
            content = order_list.map((item,index)=>{
                return <li className={styles.item} key={item.order_id}>
                    <Flex className={styles['item-head']}>
                        <Flex.Item>订单号：{item.order_id}</Flex.Item>
                        <div className={styles.status}>{item.status!=='dead'?status_kvmap.pay_status[item.pay_status]:''} {item.status!=='dead'?status_kvmap.ship_status[item.ship_status]:''} {status_kvmap.order_status[item.status]}</div>
                    </Flex>
                    {order_items_group[item.order_id].map((val,ind)=>{
                        val.price = util.price(val.price);
                        return <Flex className={styles['item-main-inf']} key={val.item_id}>
                            <div className={styles['img-box']}>
                                <img className={styles['item-img']} src={images[val.image_id+'_m']?images[val.image_id+'_m']:default_img_url} alt="" onLoad={util.lazyLoad.bind(this,val.image_id,'m')} />
                                <span className={images[val.image_id+'_m']?'cart-img-back active':'cart-img-back'}></span>
                            </div>
                            <Flex.Item>
                                <p className={styles['item-name']}>{val.name}</p>
                                <p className={styles['item-price']}>¥{val.price}</p>
                            </Flex.Item>
                            <div className={styles['item-num']}>x{val.nums}</div>
                        </Flex>
                    })}
                    <div className={styles['item-inf']}>共计 {item.quantity} 件 合计 （运费 ¥{item.cost_freight}）：¥{item.order_total}</div>
                    <div className={styles['item-btns']}>
                        <span className="" onClick={this.gotoPage.bind(this,item.order_id)}>订单详情</span>
                    </div>
                </li>
            })
        }else if(pager && parseInt(pager.total,0) === parseInt(pager.current,0)){
            content = <div className={styles['empty']}>加载完</div>
        }else if(pager && parseInt(pager.total,0) > parseInt(pager.current,0)){
            content = <div className={styles['empty']}>加载中...</div>
        }else if(!order_list){
            content = <div className={styles['empty']}>暂无数据</div>
        }
        return <div className={styles['order']}>
            <Flex className={styles['order-header']}>
            {order_type_arr.map((item,index)=>{
                return <Flex.Item onClick={this.orderType_handle.bind(this,item.type)} className={order_type===item.type?styles['active']:''} key={index}>
                    {item.name}
                </Flex.Item>
            })}
            </Flex>
            <Header headername={headername} />
            <PullToRefresh className={styles.list} direction='up' refreshing={this.state.refreshing}
                           onRefresh={this.handleScroll} distanceToRefresh={60}>
                {order_list && order_list.length > 0? <ul>{content}</ul>:content}
            </PullToRefresh>
        </div>
    }
}
order.defaultProps = {
    
}
order.propTypes = {
    
}
export default HOC(order);