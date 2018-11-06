import React,{Component} from 'react'
import { browserHistory } from 'react-router'
import hoistNonReactStatics from 'hoist-non-react-statics'

export const HOC = (WrappedComponent) => {
    class HOC extends Component{
        constructor(props){
            super(props);
            this.state = {
                default_img_url:'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAABBSURBVFhH7c4hAQAwDMCw+1cwt7uGsIGC8LyZ2YuKqWKqmCqmiqliqpgqpoqpYqqYKqaKqWKqmCqmiqli6mhs9gMKJKtefbIylAAAAABJRU5ErkJggg==',
            };
        }
        gotoProduct(product_id,e){
            e.stopPropagation();
            browserHistory.push('/product?product_id='+product_id);
        }
        render(){
            return <WrappedComponent {...this.state} {...this.props} gotoProduct={this.gotoProduct}/>
        }
    }
    hoistNonReactStatics(HOC,WrappedComponent);
    return HOC;
};