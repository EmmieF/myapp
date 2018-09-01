import React, {Component} from 'react'
import {browserHistory} from 'react-router'
import {Indicator,MessageBox} from 'bee-mobile'
import styles from './index.scss'
import utils from './../../static/utils'

export default class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uanme:'',
            password:'',
        };
        this.handle_submit = this.handle_submit.bind(this);
        this.handle_uname = this.handle_uname.bind(this);
        this.handel_password = this.handel_password.bind(this);
    }
    handle_submit(){
        let obj = {
            uname:this.state.uanme,
            password:this.state.password,
        };
        Indicator.show({
            delay:3000,
            message:'登录中...',
            size:'sm',
            type:'circleRoundFade',
            onClose(res){
            }
        });
        utils._fetch.call(this,'/m/passport-post_login.html',{
            method:'post',
            data:obj,
        },(res)=>{
            if(res.success === '登录成功'){
                Indicator.close();
                browserHistory.push('/me');
            }else {
                Indicator.close();
                MessageBox.confirm({
                    title:'登录失败',
                    delay:2000,
                    message:'账号或者密码错误',
                    showCancelButton:false,
                })
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
        return <div className={styles.login}>
            <div className={styles.name}>用户登录</div>
            <div className={styles.content}>
                <div className={styles['user-name']+' weui-flex'}>
                    <p>账号</p>
                    <div className="weui-flex__item">
                        <input type="text" placeholder="账号" value={this.state.uanme} onChange={this.handle_uname}/>
                    </div>
                </div>
                <div className={styles['user-name']+' weui-flex'}>
                    <p>密码</p>
                    <div className="weui-flex__item">
                        <input type="password" placeholder="请输入密码" value={this.state.password} onChange={this.handel_password}/>
                    </div>
                </div>
            </div>
            <div className={styles.btn} onClick={this.handle_submit}>登录</div>
        </div>
    }
}