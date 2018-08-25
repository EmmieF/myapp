require('es6-promise').polyfill();
require('polyfill');
// require('isomorphic-fetch');
const axios = require('axios');
let getCookie = function(name){
    var arr = document.cookie.replace(/\s/g, "").split(';');
    for (var i = 0; i < arr.length; i++) {
        var tempArr = arr[i].split('=');
        if (tempArr[0] === name) {
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
let headers = function(header){
    header = header || {};
    //小应用特殊头
    header['X-Requested-isWEBAPP'] = 'YES';
    return header;
};
let _params = function (data) {
    let filter = '',
        keys = [];
    if(Object.keys(data).length > 0){
        keys = Object.keys(data);
        keys.forEach((val,ind)=>{
            filter += '&'+ val+'='+data[val];
        })
    }
    filter = filter.slice(1);
    return filter;
};
let _fetch = function (url,{method='GET',data = {}},callback=()=>{}) {
    let fetchOptions;
    let headers = {
        'Accept':'application/json',
        'Content-Type':'application/x-www-form-urlencoded',
        'X-Requested-isWXAPP':'YES',
    };
    if(getCookie('_SID')){
        headers['X-WxappStorage-SID'] = getCookie('_SID');
    }
    if(method.toUpperCase() === 'GET'){
        if(Object.keys(data).length > 0){
            url = url+'?'+_params(data);
        }
        fetchOptions = {
            method:'GET',
            headers:new Headers(headers),
            credentials: 'include',
        }
    }else{
        fetchOptions = {
            method:'POST',
            headers:new Headers(headers),
            body:_params(data),
            credentials: 'include',
        }
    }
    fetch(url,fetchOptions)
        .then((response)=>{
            // console.log(response, '##');
            if(response.status !== 200){
                // console.log(1111);
                // throw new Error('1111');
                callback(response.status);
                return console.info('Fail to get response with status ',response.status,response.statusText);
                // throw new Error('Fail to get response with status ',response.status,response.statusText);
            }
            // console.log(response.headers.get('x-wxappstorage'), '$$$$$$$$$$$');
            let x_wxappstorage = response.headers.get('x-wxappstorage') || false;
            if (x_wxappstorage) {
                let kv = x_wxappstorage.split('=');
                if (kv[0] && kv[1]) {
                    setCookie(kv[0], kv[1],0.5);
                } else if (kv[0]) {
                    removeCookie(kv[0]);
                }
            }
            response.json().then((response)=>{
                callback(response);
            }).catch((error)=>{
                // console.log(222);
                // throw new Error('2222');
               return console.info('response error');
            });
        })
        .catch((error)=>{
            // console.log(333);
            // throw new Error('3333');
            return console.info('fetch url error');
    });
};
let _axios = function (params,callback) {
    if (!params.headers) {
        params.headers = {};
    }
    headers(params.headers);
    params.headers['content-type'] = 'application/x-www-form-urlencoded';
    axios(params).then(function(response){
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
let price = function (_price) {
    _price = parseFloat(_price);
    if (isNaN(_price)) return price;
    if (_price === 0) return '0.00';
    _price = Math.round(_price * 100) / 100;
    var _price_str = _price.toString();
    var rs = _price_str.indexOf('.');
    if (rs < 0) {
        rs = _price_str.length;
        _price_str += '.';
    }
    while (_price_str.length <= rs + 2) {
        _price_str += '0';
    }
    return _price_str;
};
export default {
    _fetch,
    _axios,
    price
}