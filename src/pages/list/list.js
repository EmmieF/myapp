import React,{Component} from 'react';
import {browserHistory} from 'react-router'
import utils from './../../static/utils';
import List from './../../components/list/index'
import {SearchBar,PullToRefresh, Toast} from 'antd-mobile'
import {HOC} from "../../HOC"
import styles from './list.scss'

let loading_more = false;
const load_list = function(){
    loading_more = true;
    let _this = this;
    _this.setState({
        is_view_load:true
    });
    Toast.loading('努力加载中',0);
    utils._fetch('/m/list.html',{method:'get',data:_this.state.params},function (res) {
        Toast.hide();
        loading_more = false;
        _this.setState({
            is_view_load:false
        });
        if(res.data_list && res.data_list.length > 1){
            if(_this.state.params.page > 1){
                res.data_list = [..._this.state.data_list,...res.data_list];
            }
        }else {
            res.data_list = [];
        }
        _this.setState(res);
    });
};

class list extends Component{
    constructor(props){
        super(props);
        let keyword = this.props.location.query.keyword;
        this.state = {
            searchSty:{paddingLeft:15,paddingRight:15,position:'fixed',left:0,top:0,width:'100%',zIndex:99,boxSizing:'border-box'},
            pagestyle:{paddingTop:54,position:'absolute',left:0,top:0,height:'100%',width:'100%',overflowY:'scroll',boxSizing:'border-box'},
            searchVal:keyword,
            is_view_load:false,
            params:{
                page:1,
                keyword:keyword
            },
            data_list:[],
            pager:{
                current:1,
                total:0
            },
            refreshing:false,
            height: document.documentElement.clientHeight,
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
    componentWillUnmount(){

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
    hand_search_submit(e){
        let params = this.state.params;
        params.keyword = e;
        params.page = 1;
        this.setState({params});
        load_list.call(this);
    }
    render(){
        const {searchSty,searchVal,params,data_list,is_view_load,pager} = this.state;
        return <div className={styles['list']}>
            <SearchBar defaultValue='' style={searchSty} placeholder='搜你想搜' onSubmit={this.hand_search_submit} onCancel={this.hand_search_cancel}
                       value={searchVal} cancelText='取消' onChange={this.hand_search_change} />
            <PullToRefresh style={{paddingTop:44}} direction='up' refreshing={this.state.refreshing}
                           onRefresh={this.handleScroll} distanceToRefresh={60}>
                <List params={params} data_list={data_list} {...this.props}/>
                {/*{is_view_load?<div className={styles['load_sty']}>加载中...</div>:''}*/}
                {!is_view_load && pager.current === pager.total?<div className={styles['load_sty']}>加载完了~</div>:''}
            </PullToRefresh>
        </div>
    }
}
export default HOC(list);