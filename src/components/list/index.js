import React,{Component} from 'react';
import PropTypes from 'prop-types'
import styles from './index.scss'

export default class list extends Component {
    constructor(props){
        // console.log('list constructor');
        super(props);
        this.state = {
            color:'#FC4773',
        };
        // console.log(this.props,'$$$$$$$$$$$');
    }
    componentWillMount(){
        // console.log('list componentWillMount');
    }
    componentDidMount(){
        // console.log('list componentDidMount');
    }
    componentWillReceiveProps(nextProps){
        // console.log('list componentWillReceiveProps',nextProps);
    }
    shouldComponentUpdate(nextProps,nextState){
        // console.log('list shouldComponentUpdate',nextProps,nextState);
        return true;
    }
    componentWillUpdate(){
        // console.log('list componentWillUpdate');
    }
    componentDidUpdate(){
        // console.log('list componentDidUpdate');
    }
    componentWillUnmount(){
        // console.log('list componentWillUnmount');
    }
    render(){
        // console.log('list render');
        const {data_list,listClick,price} = this.props;
        return <div className={styles.list+' clearFix'} ref='scroller'>
            {data_list.map((item,ind) => {
                item.product.buy_price = price(item.product.buy_price);
                item.product.mktprice = price(item.product.mktprice);
                return (
                    <div className={styles.left} key={ind}>
                    <div className={styles['img-box']} onClick={listClick(item.product.name)}>
                        <img className={styles.img} src={item.product.image} alt=""/>
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
    listClick:()=>{}
};
//设置prop类型
list.propTypes = {
    data_list:PropTypes.array,
    listClick:PropTypes.func
};