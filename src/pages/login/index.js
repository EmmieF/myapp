import React, {Component} from 'react'
import {browserHistory} from 'react-router'
import './index.css'
import utils from './../../static/utils'
import {LoadMore,Toast} from 'react-weui'

export default class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uanme:'',
            password:'',
            showToast:false,
            toast:{
                icon:'loading',
                toastText:'登录中...'
            }
        };
        this.handle_submit = this.handle_submit.bind(this);
        this.handle_uname = this.handle_uname.bind(this);
        this.handel_password = this.handel_password.bind(this);
    }
    handle_submit(){
        let toast = this.state.toast;
        this.setState({
            showToast:true
        });
        let obj = {
            uname:this.state.uanme,
            password:this.state.password,
        };
        utils._fetch.call(this,'/m/passport-post_login.html',{
            method:'post',
            data:obj,
        },(res)=>{
            if(res.success=='登录成功'){
                browserHistory.push('/me');
            }else {
                toast.toastText = '登录失败';
                this.setState(toast);
                setTimeout(()=>{
                    this.setState({
                        showToast:false
                    });
                },1000)
            }
        });
    }
    handle_uname(event){
        this.setState({
            uanme:event.target.value
        })
    }
    handel_password(event){
        this.setState({
            password:event.target.value
        })
    }
    render() {
        return <div className="login">
            <div className="name">用户登录</div>
            <div className="content">
                <div className="user-name weui-flex">
                    <p>账号</p>
                    <div className="weui-flex__item">
                        <input type="text" placeholder="账号" value={this.state.uanme} onChange={this.handle_uname}/>
                    </div>
                </div>
                <div className="user-name weui-flex">
                    <p>密码</p>
                    <div className="weui-flex__item">
                        <input type="password" placeholder="请输入密码" value={this.state.password} onChange={this.handel_password}/>
                    </div>
                </div>
            </div>
            <div className="btn" onClick={this.handle_submit}>登录</div>
            <LoadMore showLine showDot>Emmie</LoadMore>
            <Toast icon={this.state.toast.icon} show={this.state.showToast}>{this.state.toast.toastText}</Toast>
        </div>
    }
}