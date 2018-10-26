import React, { Component } from 'react';
import Footer from './../../components/footer/footer'
import Header from './../../components/header/header'
import util from './../../static/utils'
import {HOC} from '../../HOC'
import styles from './cart.scss'

const update_cart = function(url,method='get',data={}){
    let _this = this;
    util._fetch(url,{method:method,data:data},(result)=>{
        _this.setState({cartDate:result});
    })
}

class cart extends Component{
    constructor(props){
        super(props);
        this.state = {
            headername:'购物车',
            cartDate:null,
            images:{},
        };
        this.handleQuantity = this.handleQuantity.bind(this);
        // this.update_cart = this.update_cart.bind(this);
        // this.lazyLoad = this.lazyLoad.bind(this);
    }
    componentWillMount(){
        // util._fetch('/m/cart.html',{},(result)=>{
        //     this.setState({cartDate:result});
        // })
        update_cart.call(this,'/m/cart.html','get');
    }
    componentDidMount(){
        
    }
    handleQuantity(e){
        console.log(e.target.value);
        let index = e.target;
        let {cartDate} = this.state;
        if(e.target.type === 'number'){
            cartDate.data.objects[0].objects.goods[e.target.name].quantity = e.target.value;
            this.setState({
                cartDate
            })
        }
    }
    lazyLoad(image_id,image_size='o'){
        util.lazyLoad.call(this,image_id,image_size);
    }
    update_cart(ident,quantity,type,e){
        if((!1+type) && parseInt(quantity) ===1 ) {
            console.log('最小值为0');
            return; 
        }
        let action = '/m/cart-update-'+ident+'-'+ (parseInt(quantity)+type)+'.html'
        update_cart.call(this,action);
    }
    componentWillUnmount(){
        
    }
    render (){
        let {headername,cartDate,images} = this.state;
        let {default_img_url} = this.props.data;
        let content = null;
        if(!cartDate){
            content = <div className={styles.empty}>加载中...</div>;
        }else if(cartDate && cartDate.redirect && cartDate.redirect==='/m/cart-blank.html'){
            content = <div className={styles.empty}>购物车空空的！</div>;
        }else {
            content = cartDate.data.objects[0].objects.goods.map((item,index)=>{
                item.item.product.buy_price = util.price(item.item.product.buy_price);
                return (
                    <div className={styles.data+' weui-flex'} key={item.item.product.product_id}>
                        <div className={styles['img-box']}>
                            <img className={styles['cart-img']} src={images[item.item.product.image_id+'_m']?images[item.item.product.image_id+'_m']:default_img_url} onLoad={util.lazyLoad.bind(this,item.item.product.image_id,'m')} alt={item.item.product.name}/>
                            <span className={images[item.item.product.image_id+'_m']?styles['cart-img-back'] +' '+ styles.active:styles['cart-img-back']}></span>
                        </div>
                        <div className={styles.box+' weui-flex__item'}>
                            <div className={styles.name}>{item.item.product.name}</div>
                            <div className={styles.spec}>{item.item.product.spec_info}</div>
                            <div className={styles.num}>
                                <button className={styles.minus+' '+ (item.quantity==1?styles.disabled:'')} onClick={this.update_cart.bind(this,item.obj_ident,item.quantity,-1)}>-</button>
                                <input className={styles['num-inp']} type="number" placeholder={item.quantity} value={item.quantity} onChange={this.handleQuantity} name={index}/>
                                <button className={styles.add} onClick={this.update_cart.bind(this,item.obj_ident,item.quantity,+1)}>+</button>
                            </div>
                        </div>
                        <div className={styles.price}>￥{item.item.product.buy_price}</div>
                        <div className={styles.del}></div>
                    </div>
                )
            });
        }
        return <div className={styles.cart}>
            <Header headername={headername} istabbar={true} />
            {cartDate && cartDate.success?<div className={styles.content}>{content}</div>:content}
            <Footer pathname={this.props.route.path} />
        </div>
    }
}
export default HOC(cart);