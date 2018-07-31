import React,{Component} from 'react';
import utils from './../../static/utils';
import List from './../../components/list/index'
import {SearchBar} from 'bee-mobile'

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
            _this.setState(res);
        }
    });
};

class list extends Component{
    constructor(props){
        super(props);
        let keyword = this.props.location.query.keyword;
        this.state = {
            searchSty:{paddingLeft:15,paddingRight:15,position:'fixed',left:0,top:0,width:'100%',zIndex:99,boxSizing:'border-box',
                backgroundColor:'#FFF'},
            pagestyle:{paddingTop:54,position:'absolute',left:0,top:0,height:'100%',width:'100%',overflowY:'scroll',boxSizing:'border-box'},
            defaultValue:keyword,
            load_sty:{textAlign:'center',lineHeight:'40px'},
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
        };
        this.handlerCancel = this.handlerCancel.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
        this.handler_change = this.handler_change.bind(this);
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
    handlerSubmit(event){
        let params = this.state.params;
        params.keyword = event;
        params.page = 1;
        this.setState({params});
        load_list.call(this);
    }
    render(){
        return <div style={this.state.pagestyle} ref="scroller">
            <SearchBar style={this.state.searchSty} value={this.state.defaultValue} defaultValue={this.state.defaultValue} placeholder="搜你想搜" cancelText="取消"
                       onCancel={this.handlerCancel} onChange={this.handler_change} onSubmit={this.handlerSubmit}>
            </SearchBar>
            <List params={this.state.params} data_list={this.state.data_list}/>
            {this.state.is_view_load?<div style={this.state.load_sty}>加载中...</div>:''}
            {this.state.pager.current === this.state.pager.total?<div style={this.state.load_sty}>加载完了~</div>:''}
        </div>
    }
}
export default list;