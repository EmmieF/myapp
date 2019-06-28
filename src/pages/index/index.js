import React, { Component } from 'react'
import styles from './index.scss'
import Footer from './../../components/footer/footer'
import List from './../../components/list/index'
import util from './../../static/utils'
import {HOC} from './../../HOC'
import { Carousel, SearchBar, PullToRefresh, Toast } from 'antd-mobile'
import {browserHistory} from 'react-router'

let loading_more = false;
const load_list = function(){
    loading_more = true;
    let _this = this;
    _this.setState({
        is_view_load:true
    });
    Toast.loading('努力加载中',0);
    util._fetch('/m/list.html',{method:'get',data:_this.state.params},function (res) {
        Toast.hide();
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
        this.state = {
            searchSty:{paddingLeft:15,paddingRight:15,position:'fixed',left:0,top:0,width:'100%',zIndex:99,boxSizing:'border-box'},
            searchVal:'',
            is_view_load:false,
            params:{
                page:1
            },
            pager:{
                current:1,
                total:0
            },
            refreshing:false
        };
        this.hand_search_submit = this.hand_search_submit.bind(this);
        this.hand_search_change = this.hand_search_change.bind(this);
        this.hand_search_cancel = this.hand_search_cancel.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }
    componentWillMount(){
        load_list.call(this);
    }
    componentDidMount(){
        let _this = this;
        if(this.refs.scroller){
            this.refs.scroller.addEventListener('scroll',_this.handleScroll.bind(_this),false);
        }
    }
    handleScroll(event){
        let params = this.state.params;
        // const clientHeight = event.target.clientHeight;
        // const scrollHeight = event.target.scrollHeight;
        // const scrollTop = event.target.scrollTop;
        // if(scrollTop + clientHeight >= scrollHeight-10){
            if(loading_more || (this.state.pager && params.page === parseInt(this.state.pager.total,0))){
                return;
            }
            params.page += 1;
            this.setState({
                params
            });
            load_list.call(this);
        // }
    }
    hand_search_cancel(){
        this.setState({searchVal:''})
    }
    hand_search_change(val){
        this.setState({searchVal:val})
    }
    hand_search_submit(val){
        browserHistory.push('/list?keyword='+val);
    }
    render (){
        let {searchSty,params,data_list,is_view_load,pager,searchVal} = this.state;
        return <div>
            <SearchBar defaultValue='' style={searchSty} placeholder='搜你想搜' onSubmit={this.hand_search_submit} onCancel={this.hand_search_cancel}
                       value={searchVal} cancelText='取消' onChange={this.hand_search_change} />
            <Carousel frameOverflow="visible" autoplay infinite afterChange={(index,e) => {this.setState({ slideIndex: index })}}
                      cellSpacing={5} slideWidth={0.9} dots dotStyle={{backgroundColor:'#FFF'}} dotActiveStyle={{backgroundColor:'#8f8f94'}} style={{overflow:'hidden',paddingTop:44}} >
                <img src="https://beta.huaboxiangdada.com/public/images/03/19/e2/97ae869bb6d3bad45c8012718906a463b6424713.jpg?45284_OW690_OH400" alt=""/>
                <img src="https://beta.huaboxiangdada.com/public/images/03/19/e2/97ae869bb6d3bad45c8012718906a463b6424713.jpg?45284_OW690_OH400" alt=""/>
                <img src="https://beta.huaboxiangdada.com/public/images/03/19/e2/97ae869bb6d3bad45c8012718906a463b6424713.jpg?45284_OW690_OH400" alt=""/>
            </Carousel>
            <PullToRefresh direction='up' refreshing={this.state.refreshing}
                           onRefresh={this.handleScroll} distanceToRefresh={60}>
                <List params={params} data_list={data_list} {...this.props}/>
                {/*{is_view_load?<div className={styles['load_sty']}>加载中...</div>:''}*/}
                {pager.current === pager.total?<div className={styles['load_sty']}>加载完了~</div>:''}
            </PullToRefresh>
            <Footer pathname={'/index'} />
        </div>
    }
}
export default HOC(index);