import React,{Component} from 'react'
import Header from './../../../components/header/header'
import util from "../../../static/utils";
import './order.css'

const list = function(){
    let _this = this;
    util._fetch('/m/my-orders-all-1.html',{},function(res){
        console.log(res);
    });
};

export default class order extends Component{
    constructor(props){
        super(props);
        this.state = {
            headername:'我的订单'
        }
    }
    componentWillMount(){
        list.call(this);
    }
    render(){
        const {headername} = this.state;
        return <div className="order">
            <Header headername={headername} />
            <ul className="list">
                <li className="item">
                    <div className="weui-flex item-head">
                        <div className="weui-flex__item">订单号：111</div>
                        <div className="status">status</div>
                    </div>
                    <div className="weui-flex item-main-inf">
                        <img className="item-img" src="" alt=""/>
                        <div className="weui-flex__item">
                            <p className="item-name">抗菌男短袜1+1</p>
                            <p className="item-price">¥50.00</p>
                        </div>
                        <div className="item-num">x1</div>
                    </div>
                    <div className="item-inf">共计 1 件 合计 （运费 ¥0.00）：¥50.00</div>
                    <div className="clearFix item-btns">
                        <span className="">订单详情</span>
                    </div>
                </li>
            </ul>
        </div>
    }
}