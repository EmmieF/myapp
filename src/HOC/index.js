import React,{Component} from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'

export const HOC = (WrappedComponent) => {
    class HOC extends Component{
        constructor(props){
            super(props);
            this.state = {
                default_img_url:'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAABBSURBVFhH7c4hAQAwDMCw+1cwt7uGsIGC8LyZ2YuKqWKqmCqmiqliqpgqpoqpYqqYKqaKqWKqmCqmiqli6mhs9gMKJKtefbIylAAAAABJRU5ErkJggg==',
            };
        }
        render(){
            return <WrappedComponent data={this.state} {...this.props}/>
        }
    }
    hoistNonReactStatics(HOC,WrappedComponent);
    return HOC;
};