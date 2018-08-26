import React,{Component} from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'

export const Enhance = (WrappedComponent) => {
    class Enhance extends Component{
        constructor(props){
            super(props);
            this.state = {
                default_img_url:'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAABBSURBVFhH7c4hAQAwDMCw+1cwt7uGsIGC8LyZ2YuKqWKqmCqmiqliqpgqpoqpYqqYKqaKqWKqmCqmiqli6mhs9gMKJKtefbIylAAAAABJRU5ErkJggg=='
            };
            this.price = this.price.bind(this);
            this.fix_img_url = this.fix_img_url.bind(this);
        }
        price(price){
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
        }
        fix_img_url(url){
            if (url.match(/^http([s]*):/)) {
                return url;
            }
            return 'https:' + url;
        }
        render(){
            return <WrappedComponent data={this.state} {...this.props} price={this.price} fix_img_url={this.fix_img_url}/>
        }
    }
    hoistNonReactStatics(Enhance,WrappedComponent);
    return Enhance;
};