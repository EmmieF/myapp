import React,{ Component } from 'react'
import Linepost from './../../../../assion/images/order/linepost.png'
import { HOC } from './../../../../HOC'
import util from './../../../../static/utils'
import Header from './../../../../components/header/header'
import { Toast, Flex } from 'antd-mobile'
import styles from './detail.scss'

const load = function(){
    let _this = this;
    Toast.loading('努力加载中',0);
    util._fetch('/m/order-detail-'+_this.props.location.query.order_id+'.html',{},function(response){
        Toast.hide();
        _this.setState(response);
    })
};

class detail extends Component{
    constructor(props){
        super(props);
        this.state = {
            images:[],
            status_kvmap: {
                order_status: {
                    'active': '执行中',
                    'dead': '已作废',
                    'finish': '已完成'
                },
                pay_status: ['未支付', '已付款', '已付款至到担保方', '部分付款', '部分退款', '全额退款'],
                ship_status: ['未发货', '已发货', '部分发货', '部分退货', '已退货','已确认收货'],
            },
        }
    }
    componentWillMount(){
        load.call(this);
    }
    componentDidMount(){
    }
    render(){
        const {order,status_kvmap,images,payapp} = this.state;
        const {default_img_url} = this.props;
        let detail_head = null;
        let detail_item = null, detail_inf = null;
        if(order){
            order.order_total = util.price(order.order_total);
            order.cost_freight = util.price(order.cost_freight);
            detail_head = <div>
                <Flex className={styles['detail-order_id']}>
                    <Flex.Item>订单号：{order.order_id}</Flex.Item>
                    <div className={styles['status']}>{status_kvmap.order_status[order.status]}</div>
                </Flex>
                <div className={styles['addr']}>
                    <div className={styles['uname']}>{order.consignee.name} {order.consignee.mobile}</div>
                    <div className={styles['addr-inf']}>{order.consignee.area}{order.consignee.addr}</div>
                </div>
            </div>;
            detail_item = Object.keys(order.items).map((v)=>{
                let val = order.items[v];
                val.price = util.price(val.price);
                return <Flex className={styles['item-main-inf']} key={val.item_id}>
                    <div className={styles['img-box']}>
                        <img className={styles['item-img']} src={images[val.image_id+'_m']?images[val.image_id+'_m']:default_img_url} onLoad={util.lazyLoad.bind(this,val.image_id,'m')} alt="" />
                        <span className={images[val.image_id+'_m']?'cart-img-back active':'cart-img-back'}></span>
                    </div>
                    <Flex.Item>
                        <p className={styles['item-name']}>{val.name}</p>
                        <p className={styles['item-price']}>¥{val.price}</p>
                    </Flex.Item>
                    <div className={styles['item-num']}>x{val.nums}</div>
                </Flex>
            });
            detail_inf = <div>
                <Flex className={styles['other-inf']}>
                    <div>支付方式：</div>
                    <Flex.Item className={styles['payName']}>{payapp.display_name}</Flex.Item>
                </Flex>
                <Flex className={styles['other-inf']}>
                    <div>配送方式：</div>
                    <Flex.Item className={styles['payName']}>{order.dlytype && order.dlytype.dt_name?order.dlytype.dt_name:''}</Flex.Item>
                </Flex>
                <Flex className={styles['other-inf']}>
                    <div>下单时间：</div>
                    <Flex.Item className={styles['payName']}>{order.createtime}</Flex.Item>
                </Flex>
                <Flex className={styles['other-inf']+' '+styles['more']}>
                    <Flex.Item>商品总金额({order.quantity}件)：</Flex.Item>
                    <div className={styles['payName']}>￥12.00</div>
                </Flex>
                <Flex className={styles['other-inf']}>
                    <Flex.Item>运费：</Flex.Item>
                    <div className={styles['payName']}>￥{order.cost_freight}</div>
                </Flex>
                <div className={styles['total']}>订单实付款：<span>￥{order.order_total}</span></div>
            </div>
        }
        return <div className={styles['detail']}>
            <Header headername="订单详情" />
            {detail_head}
             {/*<img className={styles['linepost']} src={Linepost} alt=""/>*/}
            {detail_item}
            {detail_inf}
        </div>
    }
}
export default HOC(detail);

