require('es6-promise').polyfill();
require('polyfill');
// require('isomorphic-fetch');
const axios = require('axios');
const getCookie = function(name){
    var arr = document.cookie.replace(/\s/g, "").split(';');
    for (var i = 0; i < arr.length; i++) {
        var tempArr = arr[i].split('=');
        if (tempArr[0] === name) {
            return decodeURIComponent(tempArr[1]);
        }
    }
    return '';
};
const setCookie = function(name, value, days){
    var date = new Date();
    date.setDate(date.getDate() + days);
    document.cookie = name + '=' + value + ';expires=' + date;
};
const removeCookie = function(name){
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
const headers = function(header){
    header = header || {};
    //小应用特殊头
    header['X-Requested-isWEBAPP'] = 'YES';
    return header;
};
const _params = function (data) {
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
const _fetch = function (url,{method='GET',data = {}},callback=()=>{}) {
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
                callback(response.status);
                return console.info('Fail to get response with status ',response.status,response.statusText);
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
               return console.info('response error',error);
            });
        })
        .catch((error)=>{
            // console.log(333);
            return console.info('fetch url error',error);
    });
};
const _axios = function (params,callback) {
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
// 2位数金额转换
const price = function(price){
    let _price_str,rs;
    let _price = parseFloat(price);
    if (isNaN(_price)) return price;
    if (_price === 0) return '0.00';
    _price = Math.round(_price * 100) / 100;
    _price_str = _price.toString();
    rs = _price_str.indexOf('.');
    if (rs < 0) {
        rs = _price_str.length;
        _price_str += '.';
    }
    while (_price_str.length <= rs + 2) {
        _price_str += '0';
    }
    return _price_str;
};
// 格式化图片路径
const fix_img_url = function(url){
    if (url.match(/^http([s]*):/)) {
        return url;
    }
    return 'https:' + url;
}
// 懒加载图片
const lazyLoad = function(image_id,image_size='o'){
    let _this = this;
    if(['o', 'xs', 's', 'm', 'l'].indexOf(image_size) < 0) image_size = 'o';
    if(!_this.pages_images_ids){
        _this.pages_images_ids = {};
    }
    if(!_this.pages_loader_images_timers){
        _this.pages_loader_images_timers = {};
    }
    if(_this.state.images[image_id+'_'+image_size]) return;

    if(!_this.pages_images_ids[image_size]){
        _this.pages_images_ids[image_size] = [];
    }
    if(!_this.pages_loader_images_timers){
        _this.pages_loader_images_timers = {};
    }
    if(_this.pages_loader_images_timers[image_size] === undefined){
        _this.pages_loader_images_timers[image_size] = 0;
    }
    _this.pages_images_ids[image_size].push(image_id);

    clearTimeout(_this.pages_loader_images_timers[image_size]);
    _this.pages_loader_images_timers[image_size] = setTimeout(()=>{
        _fetch('/openapi/storager/'+image_size,{data:{images:_this.pages_images_ids[image_size]},method:'POST'},(res)=>{
            let result_images = res.data;
            let images = _this.state.images;
            for(let i = 0,len = result_images.length; i < len; i++){
                let val = result_images[i];
                if(images[_this.pages_images_ids[image_size][i]+'_'+image_size]){
                    continue;
                }
                images[_this.pages_images_ids[image_size][i]+'_'+image_size] = fix_img_url(val);
            }
            _this.setState({images});
            // console.log(_this.state.images, '$$$$$');
        })
    },200);
}
export default {
    _fetch,
    _axios,
    lazyLoad,
    fix_img_url,
    price,
}