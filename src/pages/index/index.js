import React, { Component } from 'react';
import Footer from './../../components/footer/footer'
import List from './../../components/list/index'
import {SearchBar,Swiper} from 'react-weui'
import utils from './../../static/utils'
class index extends Component{
    state = {
        defaultValue:''
    };
    constructor(props){
        super(props)
    }
    componentDidMount(){
        utils._fetch('/m/list.html?keyword=11',{
            method:'GET'
        },function (response) {
            console.log(response, 'response');
        });
        // utils._axios({
        //     url:'/m/list.html?keyword=11',
        //     method:'get'
        //     },function (res) {
        //     console.log(res);
        // })
    }
    evt_Handler_change(value,e){

    }
    render (){
        return <div>
            <SearchBar
                onChange={this.evt_Handler_change.bind(this)}
                defaultValue={this.state.defaultValue}
                placeholder='搜你想搜'
                lang={{
                    cancel: '取消'
                }}
            />
            <Swiper
                height={150}>
                <img src="https://beta.huaboxiangdada.com/public/images/03/19/e2/97ae869bb6d3bad45c8012718906a463b6424713.jpg?45284_OW690_OH400"
                     role="presentation"
                     alt=""/>
                <img src="https://beta.huaboxiangdada.com/public/images/6c/ec/2e/890a37dc885eb46b67c2ccfad369eb9ba73b94ca.png?67530_OW750_OH636"
                     role="presentation"
                     alt=""/>
                <div style={{ background: '#39CCCC' }} />
            </Swiper>
            <List />
            <Footer pathname={this.props.route.path} />
        </div>
    }
}
export default index;