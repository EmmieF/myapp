import React,{Component} from 'react';
import PropTypes from 'prop-types'
import styles from './index.scss'
import util from './../../static/utils'

class list extends Component {
    constructor(props){
        super(props);
        this.state = {
            color:'#FC4773',
            images:{}
        };
        this.lazyLoad = this.lazyLoad.bind(this);
    }
    lazyLoad(image_id,image_size='o'){
        util.lazyLoad(image_id,image_size);
    }
    render(){
        const {images} = this.state;
        const {data_list,default_img_url,gotoPage} = this.props;
        return <div className={styles.list+' clearFix'} ref='scroller'>
            {data_list.map((item,ind) => {
                item.product.buy_price = util.price(item.product.buy_price);
                item.product.mktprice = util.price(item.product.mktprice);
                return (
                    <div className={styles.left} key={ind} onClick={gotoPage.bind(this,item.product.product_id)}>
                    <div className={styles['img-box']}>
                        <img className={styles.img} src={images[item.product.image_id+'_m']?images[item.product.image_id+'_m']:default_img_url} onLoad={util.lazyLoad.bind(this,item.product.image_id,'m')} alt={item.product.name}/>
                        <span className={images[item.product.image_id+'_m']?styles['img-back'] +' '+ styles.active:styles['img-back']}></span>
                    </div>
                    <p className={styles.name +' ellipsis'}>{item.product.name}</p>
                    <p className={styles.detail + ' ellipsis'}>{item.product.spec_info}</p>
                    <p className={styles['price-money']}>￥{item.product.mktprice}</p>
                    <p className={styles.price}>￥{item.product.buy_price}</p>
                </div>
                )
            })}
        </div>
    }
}
//设置prop默认值
list.defaultProps = {
    data_list:[],
};
//设置prop类型
list.propTypes = {
    data_list:PropTypes.array,
};
export default list;