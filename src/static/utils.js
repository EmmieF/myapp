require('es6-promise').polyfill();
require('isomorphic-fetch');
let headers = function(header){
    header = header || {};
    //小应用特殊头
    header['X-Requested-isWEBAPP'] = 'YES';
    //session_id , vmc_uid 处理
    var session_id = getCookie('_SID'),
        vmc_uid = getCookie('_VMC_UID');
    // SID
    // if (session_id)
    //     header['X-WxappStorage-SID'] = session_id;

    // UID
    // if (vmc_uid)
    //     header['X-WxappStorage-VMC-UID'] = vmc_uid;
    return header;
};
let getCookie = function(name){
    var arr = document.cookie.replace(/\s/g, "").split(';');
    for (var i = 0; i < arr.length; i++) {
        var tempArr = arr[i].split('=');
        if (tempArr[0] == name) {
            return decodeURIComponent(tempArr[1]);
        }
    }
    return '';
};
let setCookie = function(name, value, days){
    var date = new Date();
    date.setDate(date.getDate() + days);
    document.cookie = name + '=' + value + ';expires=' + date;
};
let removeCookie = function(name){
    // 设置已过期，系统会立刻删除cookie
    if(name){
        this.setCookie(name, '1', -1);
    }else{
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if(keys) {
            //for(var i = keys.length; i--;)
            //document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
            for(var i=0; i<keys.length; i++){
                document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
            }
        }
    }
};

let _fetch = function(url,params,callback){
    let _this = this;
    if (!params.headers) {
        params.headers = {};
    }
    headers(params.headers);
    params.headers['content-type'] = 'application/x-www-form-urlencoded';
    params.mode = 'no-cors';    //跨域
    fetch(url,params).then(function(response){
        let x_wxappstorage = response.headers['x-wxappstorage'] || false;
        if (x_wxappstorage) {
            let kv = x_wxappstorage.split('=');
            if (kv[0] && kv[1]) {
                setCookie(kv[0], kv[1],0.5);
            } else if (kv[0]) {
                removeCookie(kv[0]);
            }
        }
        if (response.data && response.data.error) {
            let res_error = response.data.error;
            let res_redirect = response.data.redirect;
            if (res_redirect && res_redirect.match(/passport-login/i)) {
                //服务端登录状态丢失,重新登录
                console.log('重新登录');
                // _this.$router.push('/pages/member/login/login');
            }
        }
        callback(response);
    })
};
export default {
    _fetch:_fetch
}