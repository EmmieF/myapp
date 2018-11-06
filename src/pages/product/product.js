import React, { Component } from 'react'
import util from './../../static/utils'
import Header from './../../components/header/header'
import { HOC } from './../../HOC'
import styles from './product.scss'

const load = function () {
    let _this = this;
    util._fetch('/m/item-'+_this.props.location.query.product_id+'.html',{},function (response) {
        _this.setState(response);
    })
};

class product extends Component{
    constructor(props){
        super(props);
        this.state = {
            images:[],
        }
    }
    componentWillMount(){
        load.call(this)
    }
    render(){
        const {} = this.state;
        const { default_img_url } = this.props;
        return <div className={styles['product']}>
            <Header headername="商品详情"/>
        </div>
    }
}
export default HOC(product);