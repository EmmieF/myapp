import React, {Component} from 'react'
import './index.css'
import utils from './../../static/utils'
import {} from 'react-weui'

export default class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uanme:'',
            password:''
        };
        this.handle_submit = this.handle_submit.bind(this);
        this.handle_uname = this.handle_uname.bind(this);
        this.handel_password = this.handel_password.bind(this);
    }
    handle_submit(){
        let _this = this;
        let obj = {
            uname:this.state.uanme,
            password:this.state.password,
            vcode:''
        };
        let formData = new FormData();
        formData.append("uname",""+this.state.uanme+"");
        formData.append("password",""+this.state.password+"");
        formData.append("forward","");
        utils._fetch.call(this,'/m/passport-post_login.html',{
            method:'post',
            body:formData,
        },function(response){
            console.log(response,'responseresponse');
        });
        // utils._axios.call(this,{
        //     url:'/m/passport-post_login.html',
        //     method:'POST',
        //     data:obj,
        // },function (response) {
        //     console.log(response,'responseresponse');
        // })
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
        </div>
    }
}