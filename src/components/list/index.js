import React,{Component} from 'react';
import './index.css'
import utils from './../../static/utils'
export default class list extends Component {
    constructor(props){
        super(props);
        this.state = {
            color:'#FC4773',
        };
        this.price = this.price.bind(this);
    }
    componentWillMount(){
        console.log(this.props,'props');
    }
    componentDidMount(){
        // let _this = this,
        //     filter = '',
        //     keys = [];
        //
        // if(Object.keys(this.props.params).length > 0){
        //     keys = Object.keys(this.props.params);
        //     keys.forEach((val,ind)=>{
        //         filter += '&'+ val+'='+this.props.params[val];
        //     })
        // }
        // filter = filter.slice(1);
        // utils._axios({
        //     url:'/m/list.html?'+filter,
        //     method:'get',
        //     },
        //     function (res) {
        //         console.log(res);
        //         _this.setState({
        //             data_list:res.data.data_list
        //         })
        //     }
        // )
    }
    price(price){
        var _price = parseFloat(price);
        if (isNaN(_price)) return price;
        if (_price === 0) return '0.00';
        _price = Math.round(_price * 100) / 100;
        var _price_str = _price.toString();
        var rs = _price_str.indexOf('.');
        if (rs < 0) {
            rs = _price_str.length;
            _price_str += '.';
        }
        while (_price_str.length <= rs + 2) {
            _price_str += '0';
        }
        return _price_str;
    }
    render(){
        return <div className="list clearFix" ref='scroller'>
            {this.props.data_list.map((item,ind) => {
                item.product.buy_price = this.price(item.product.buy_price);
                item.product.mktprice = this.price(item.product.mktprice);
                return (
                    <div className="left" key={ind}>
                    <div className="img-box">
                        <img className="img" src={item.product.image} alt=""/>
                    </div>
                    <p className="name">{item.product.name}</p>
                    <p className="detail">{item.product.spec_info}</p>

                    <p className="price-money">￥{item.product.mktprice}</p>
                    <p className="price">￥{item.product.buy_price}</p>
                </div>
                )
            })}
        </div>
    }
}