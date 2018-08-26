import React,{Component} from 'react';
import PropTypes from 'prop-types'
import './index.css'

export default class list extends Component {
    constructor(props){
        // console.log('list constructor');
        super(props);
        this.state = {
            color:'#FC4773',
        };
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
        const {data_list,listClick} = this.props;
        return <div className="list clearFix" ref='scroller'>
            {data_list.map((item,ind) => {
                item.product.buy_price = this.props.price(item.product.buy_price);
                item.product.mktprice = this.props.price(item.product.mktprice);
                return (
                    <div className='left' key={ind}>
                    <div className='img-box' onClick={listClick(item.product.name)}>
                        <img className='img' src={item.product.image} alt=""/>
                    </div>
                    <p className="name ellipsis">{item.product.name}</p>
                    <p className='detail ellipsis' >{item.product.spec_info}</p>
                    <p className='price-money'>￥{item.product.mktprice}</p>
                    <p className='price'>￥{item.product.buy_price}</p>
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