import React, { Component } from 'react';
import Footer from './../../components/footer/footer'
import Header from './../../components/header/header'
import util from './../../static/utils'
import {HOC} from '../../HOC'
import styles from './cart.scss'

class cart extends Component{
    constructor(props){
        super(props);
        this.state = {
            headername:'购物车',
            cartDate:null,
            images:{},
        };
        this.handleQuantity = this.handleQuantity.bind(this);
        // this.lazyLoad = this.lazyLoad.bind(this);
    }
    componentWillMount(){
        util._fetch('/m/cart.html',{},(result)=>{
            this.setState({cartDate:result});
        })
    }
    componentDidMount(){
        
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
        util.lazyLoad.call(this,image_id,image_size);
    }
    componentWillUnmount(){
        
    }
    render (){
        let {headername,cartDate,images} = this.state;
        let {default_img_url} = this.props.data;
        let content = null;
        if(!cartDate){
            content = <div className={styles.empty}>加载中...</div>;
        }else if(cartDate && cartDate.redirect){
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
                                <button className={styles.minus+' '+styles.disabled}>-</button>
                                <input className={styles['num-inp']} type="number" value={item.quantity} onChange={this.handleQuantity} name={index}/>
                                <button className={styles.add}>+</button>
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