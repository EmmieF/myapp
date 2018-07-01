import React,{Component} from 'react';
import './index.css'

export default class list extends Component {
    state = {
        color:'#FC4773'
    };
    constructor(props){
        super(props)
    }
    componentDidMount(){

    }
    render(){
        return <div className="list clearFix">
            <div className="left">
                <div className="img-box">
                    <img className="img" src="https://beta.huaboxiangdada.com/public/images/d4/c4/2f/4c1885787c91ec68ae1feda91272ac6929a9a3aa.png?12646_OW533_OH504" alt=""/>
                </div>
                <p className="name">香水</p>
                <p className="detail">香水简介</p>
                <p className="price">￥9.99</p>
                <p className="price-money">￥10.99</p>
            </div>
            <div className="left">
                <div className="img-box">
                    <img className="img" src="https://beta.huaboxiangdada.com/public/images/d4/c4/2f/4c1885787c91ec68ae1feda91272ac6929a9a3aa.png?12646_OW533_OH504" alt=""/>
                </div>
                <p className="name">香水</p>
                <p className="detail">香水简介</p>
                <p className="price">￥9.99</p>
                <p className="price-money">￥10.99</p>
            </div>
        </div>
    }
}