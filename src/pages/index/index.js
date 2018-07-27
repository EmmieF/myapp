import React, { Component } from 'react';
import Footer from './../../components/footer/footer'
import List from './../../components/list/index'
import {SearchBar,Swiper} from 'react-weui'
import utils from './../../static/utils'

const load_list = function(){
    let _this = this;
    utils._fetch('/m/list.html',{method:'get',data:_this.state.params},function (res) {
        _this.setState(res);
    });
};

class index extends Component{
    constructor(props){
        super(props);
        this.state = {
            pagestyle:{paddingBottom:60},
            defaultValue:'',
            params:{
                keyword:'',
                page:1
            },
            data_list:[]
        };
        this.handler_change = this.handler_change.bind(this);
        this.handler_scroll = this.handler_scroll.bind(this);
        // this.initScroll = this.initScroll.bind(this);

    }
    componentWillMount(){
        load_list.call(this);
    }
    componentDidMount(){
        this.initScroll();
    }
    handler_change(){

    }
    on_scroll(){
        console.log(this);
    }
    onLoadMore(){

    }
    handler_scroll(){
        console.log(333);
    }
    initScroll(){
        let _this = this;
        console.log(_this.refs, '############');
        _this.refs.scroller.addEventListener('scroll',scrolling,false);
        function scrolling() {
            console.log(333);
        }
    }
    render (){
        return <div style={this.state.pagestyle} ref="scroller">
            <SearchBar
                onChange={this.handler_change}
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
            <List params={this.state.params} data_list={this.state.data_list}/>
            <Footer pathname={this.props.route.path} />
        </div>
    }
}
export default index;