import React,{Component} from 'react'
import Header from './../../../components/header/header'
import util from "../../../static/utils";
import {Enhance} from './../../../HOC'
import './order.css'

let loading_more = false;
const load_list = function(page){
    loading_more = true;
    let _this = this;
    _this.setState({
        is_view_load:true,
    });
    util._fetch('/m/my-orders-all-'+page+'.html',{method:'get',data:_this.state.params},function (res) {
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
            order_list:null,
            order_items_group:null,
            images:{},
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
    lazyLoad(image_id,image_size='o'){
        let _this = this;
        if(['o', 'xs', 's', 'm', 'l'].indexOf(image_size) < 0) image_size = 'o';
        if(!_this.pages_images_ids){
            _this.pages_images_ids = {};
        }
        if(!_this.pages_loader_images_timers){
            _this.pages_loader_images_timers = {};
        }
        if(_this.state.images[image_id+'_'+image_size]) return;

        if(!_this.pages_images_ids[image_size]){
            _this.pages_images_ids[image_size] = [];
        }
        if(!_this.pages_loader_images_timers){
            _this.pages_loader_images_timers = {};
        }
        if(_this.pages_loader_images_timers[image_size] === undefined){
            _this.pages_loader_images_timers[image_size] = 0;
        }
        _this.pages_images_ids[image_size].push(image_id);

        clearTimeout(_this.pages_loader_images_timers[image_size]);
        _this.pages_loader_images_timers[image_size] = setTimeout(()=>{
            util._fetch('/openapi/storager/'+image_size,{data:{images:_this.pages_images_ids[image_size]},method:'POST'},(res)=>{
                let result_images = res.data;
                let images = _this.state.images;
                for(let i = 0,len = result_images.length; i < len; i++){
                    let val = result_images[i];
                    if(images[_this.pages_images_ids[image_size][i]+'_'+image_size]){
                        continue;
                    }
                    images[_this.pages_images_ids[image_size][i]+'_'+image_size] = _this.props.fix_img_url(val);
                }
                _this.setState({images});
                // console.log(_this.state.images, '$$$$$');
            })
        },200);
    }
    render(){
        const {headername,order_list,order_items_group,pager,images,pagestyle} = this.state;
        const {default_img_url} = this.props.data;
        let content = null;
        if(!order_list){
            content = <div className="empty">加载中...</div>
        }else if(order_list && order_list.length > 0){
            content = order_list.map((item,index)=>{
                return <li className="item" key={item.order_id}>
                    <div className="weui-flex item-head">
                        <div className="weui-flex__item">订单号：{item.order_id}</div>
                        <div className="status">status</div>
                    </div>
                    {order_items_group[item.order_id].map((val,ind)=>{
                        val.price = this.props.price(val.price);
                        return <div className="weui-flex item-main-inf" key={val.item_id}>
                            <div className="img-box">
                                <img className="item-img" src={images[val.image_id+'_m']?images[val.image_id+'_m']:default_img_url} alt="" onLoad={this.lazyLoad.bind(this,val.image_id,'m')} />
                                <span className={images[val.image_id+'_m']?'cart-img-back active':'cart-img-back'}></span>
                            </div>
                            <div className="weui-flex__item">
                                <p className="item-name">{val.name}</p>
                                <p className="item-price">¥{val.price}</p>
                            </div>
                            <div className="item-num">x{val.nums}</div>
                        </div>
                    })}
                    <div className="item-inf">共计 {item.quantity} 件 合计 （运费 ¥{item.cost_freight}）：¥{item.order_total}</div>
                    <div className="clearFix item-btns">
                        <span className="">订单详情</span>
                    </div>
                </li>
            })
        }else if(pager && parseInt(pager.total) === parseInt(pager.current)){
            content = <div className="empty">加载完</div>
        }
        return <div style={pagestyle} className="order" ref="scroller">
            <Header headername={headername} />
            {this.state.order_list && this.state.order_list.length > 0? <ul className="list">{content}</ul>:content}
        </div>
    }
}
export default Enhance(order);