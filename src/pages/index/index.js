import React, { Component } from 'react';
import Footer from './../../components/footer/footer'
import List from './../../components/list/index'
import Test from './../../components/test/test'
import utils from './../../static/utils'
import {SearchBar,Swiper,Indicator} from 'bee-mobile'
import {browserHistory} from 'react-router'

let loading_more = false;
const load_list = function(){
    loading_more = true;
    let _this = this;
    _this.setState({
        is_view_load:true
    });
    utils._fetch('/m/list.html',{method:'get',data:_this.state.params},function (res) {
        loading_more = false;
        _this.setState({
            is_view_load:false
        });
        if(res.data_list && res.data_list.length > 1){
            if(_this.state.params.page > 1){
                res.data_list = [..._this.state.data_list,...res.data_list];
            }
        }
        _this.setState(res);
    });
};

class index extends Component{
    constructor(props){
        super(props);
        console.log('index constructor');
        this.state = {
            searchSty:{paddingLeft:15,paddingRight:15,position:'fixed',left:0,top:0,width:'100%',zIndex:99,boxSizing:'border-box',
                backgroundColor:'#FFF'},
            pagestyle:{paddingBottom:60,paddingTop:54,position:'absolute',left:0,top:0,height:'100%',width:'100%',overflowY:'scroll',boxSizing:'border-box'},
            defaultValue:'',
            swiperH:{height:166},
            load_sty:{textAlign:'center',lineHeight:'40px'},
            is_view_load:false,
            params:{
                page:1
            },
            pager:{
                current:1,
                total:0
            },
            total:0
        };
        this.handler_change = this.handler_change.bind(this);
        this.handlerCancel = this.handlerCancel.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
        this.handlerListClick = this.handlerListClick.bind(this);
        this.handlerTotal = this.handlerTotal.bind(this);
    }
    componentWillMount(){
        console.log('index componentWillMount');
        load_list.call(this);
    }
    componentDidMount(){
        console.log('index componentDidMount');
        let _this = this;
        if(this.refs.scroller){
            this.refs.scroller.addEventListener('scroll',_this.handleScroll.bind(_this),false);
        }
    }
    componentWillReceiveProps(){
        console.log('index componentWillReceiveProps');
    }
    shouldComponentUpdate(){
        console.log('index shouldComponentUpdate');
        return true;
    }
    componentWillUpdate(){
        console.log('index componentWillUpdate');
    }
    componentDidUpdate(){
        console.log('index componentDidUpdate');
    }
    componentWillUnmount(){
        console.log('index componentWillUnmount');
    }
    handleScroll(event){
        let params = this.state.params;
        const clientHeight = event.target.clientHeight;
        const scrollHeight = event.target.scrollHeight;
        const scrollTop = event.target.scrollTop;
        if(scrollTop + clientHeight >= scrollHeight-10){
            if(loading_more || (this.state.pager && params.page === parseInt(this.state.pager.total))){
                return;
            }
            params.page += 1;
            this.setState({
                params
            });
            load_list.call(this);
        }
    }
    handler_change(event){
        this.setState({defaultValue:event})
    }
    handlerCancel(){
        this.setState({defaultValue:''})
    }
    handlerSubmit(e){
        browserHistory.push('/list?keyword='+e);
    }
    handlerListClick(msg){
        // console.log('list click',msg);
    }
    handlerTotal(num){
        this.setState({total:this.state.total+num});
    }
    render (){
        // console.log('index render');
        return <div style={this.state.pagestyle} ref="scroller">
            <SearchBar style={this.state.searchSty} value={this.state.defaultValue} placeholder="搜你想搜" cancelText="取消"
                       onCancel={this.handlerCancel} onChange={this.handler_change} onSubmit={this.handlerSubmit}>
            </SearchBar>
            {/*<Test onTotal={this.handlerTotal}/>*/}
            {/*<div>{this.state.total}</div>*/}
            <Swiper style={this.state.swiperH} spaceBetween={5} loop={true} slideWidth={0.9} centerMode={true} autoplay={true}>
                <img src="https://beta.huaboxiangdada.com/public/images/03/19/e2/97ae869bb6d3bad45c8012718906a463b6424713.jpg?45284_OW690_OH400" alt=""/>
                <img src="https://beta.huaboxiangdada.com/public/images/03/19/e2/97ae869bb6d3bad45c8012718906a463b6424713.jpg?45284_OW690_OH400" alt=""/>
            </Swiper>
            <List params={this.state.params} data_list={this.state.data_list} listClick={this.handlerListClick}/>
            {this.state.is_view_load?<div style={this.state.load_sty}>加载中...</div>:''}
            {this.state.pager.current === this.state.pager.total?<div style={this.state.load_sty}>加载完了~</div>:''}
            <Footer pathname={this.props.route.path} />
        </div>
    }
}
export default index;