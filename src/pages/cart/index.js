import React, { Component } from 'react';
import Footer from './../../components/footer/footer'
import Header from './../../components/header/header'
import util from './../../static/utils'
import {Enhance} from '../../HOC'
import './cart.css'

class cart extends Component{
    constructor(props){
        super(props);
        this.state = {
            headername:'购物车',
            cartDate:null,
            images:{},
        };
        this.handleQuantity = this.handleQuantity.bind(this);
        this.lazyLoad = this.lazyLoad.bind(this);
    }
    componentWillMount(){
        util._fetch('/m/cart.html',{},(result)=>{
            this.setState({cartDate:result});
        })
    }
    componentDidMount(){
        console.log(this, '$$$$$$$$$$$$');
    }
    handleQuantity(event){
        let index = event.target;
        let {cartDate} = this.state;
        if(event.target.type === 'number'){
            cartDate.data.objects.goods[event.target.name].quantity = event.target.value;
            this.setState({
                cartDate
            })
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
                let _set = _this.state.images;
                result_images.forEach((val,ind)=>{
                    _set[_this.pages_images_ids[image_size][ind]+'_'+image_size] = _this.props.fix_img_url(val);
                });
                _this.setState({images:_set});
                // console.log(_this.state.images, '$$$$$');
            })
        },200);
    }
    render (){
        let {headername,cartDate,images} = this.state;
        let {default_img_url} = this.props.data;
        let content = null;
        if(!cartDate){
            content = <div className="empty">加载中...</div>;
        }else if(cartDate && cartDate.redirect){
            content = <div className="empty">购物车空空的！</div>;
        }else {
            content = cartDate.data.objects.goods.map((item,index)=>{
                item.item.product.buy_price = this.props.price(item.item.product.buy_price);
                return (
                    <div className="weui-flex data" key={item.item.product.product_id}>
                        <div className="img-box">
                            <img className="cart-img" src={images[item.item.product.image_id+'_m']?images[item.item.product.image_id+'_m']:default_img_url} onLoad={this.lazyLoad.bind(this,item.item.product.image_id,'m')} alt={item.item.product.name}/>
                            <span className={images[item.item.product.image_id+'_m']?'cart-img-back active':'cart-img-back'}></span>
                        </div>
                        <div className="weui-flex__item box">
                            <div className="name">{item.item.product.name}</div>
                            <div className="spec">{item.item.product.spec_info}</div>
                            <div className="num">
                                <button className="minus disabled">-</button>
                                <input className="num-inp" type="number" value={item.quantity} onChange={this.handleQuantity} name={index}/>
                                <button className="add">+</button>
                            </div>
                        </div>
                        <div className="price">￥{item.item.product.buy_price}</div>
                        <div className="del"></div>
                    </div>
                )
            });
        }
        return <div className="cart">
            <Header headername={headername} istabbar={true} />
            {cartDate && cartDate.success?<div className="content">{content}</div>:content}
            <Footer pathname={this.props.route.path} />
        </div>
    }
}
export default Enhance(cart);