import React, { Component } from 'react'
import { MessageBox } from 'bee-mobile'
import { Modal } from 'antd-mobile'
import Footer from './../../components/footer/footer'
import Header from './../../components/header/header'
import util from './../../static/utils'
import {HOC} from '../../HOC'
import styles from './cart.scss'

const update_cart = function(url,method='get',data={}){
    let _this = this;
    util._fetch(url,{method:method,data:data},(result)=>{
        if(result.redirect.indexOf('cart-blank')!==-1 || result.success){
            _this.setState({cartDate:result});
            return;
        }
        Modal.alert(result.error,'',[{text:'确定'}],'ios');
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
    }
    componentWillMount(){
        update_cart.call(this,'/m/cart.html','get');
    }
    update_cart(ident,quantity,type){
        if(!(1 + type) && parseInt(quantity,0) === 1 ) {
            MessageBox.alert({
                title:'修改购买数量',
                message:'最小购买数量为1',
                showConfirmButton:true,
            });
            return; 
        }
        let action = '/m/cart-update-' + ident+'-' + (parseInt(quantity,0)+type) + '.html';
        update_cart.call(this,action);
    }
    del_cart(ident,e){
        // e.preventDefault();
        let _this = this;
        Modal.alert('删除购物车','确定删除该商品？',[
            {text:'不删除',onPress:()=>{}},
            {text:'删除',onPress:()=>{
                let action = '/m/cart-remove-' + ident + '.html'
                update_cart.call(_this,action);
            }},
        ],'ios')
    }
    update_cart_nums(ident,quantity){
        console.log(this);
        Modal.prompt('修改购买数量','',[
            {text:'取消'},
            {text:'修改',onPress:value=>{
                console.log(value);
                console.log(this);
                let action = '/m/cart-update-'+ident+'-'+ value+'.html';
                update_cart.call(this,action);
            }}
        ],'default',quantity)
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
                                <button className={styles.minus+' '+ (item.quantity===1?styles.disabled:'')} onClick={this.update_cart.bind(this,item.obj_ident,item.quantity,-1)}>-</button>
                                <input className={styles['num-inp']} type="number" readOnly placeholder={item.quantity} value={item.quantity} name={index} onClick={this.update_cart_nums.bind(this,item.obj_ident,item.quantity)}/>
                                <button className={styles.add} onClick={this.update_cart.bind(this,item.obj_ident,item.quantity,+1)}>+</button>
                            </div>
                        </div>
                        <div className={styles.price}>￥{item.item.product.buy_price}</div>
                        <div className={styles.del} onClick={this.del_cart.bind(this,item.obj_ident)}></div>
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