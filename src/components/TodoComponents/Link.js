import React,{Component} from 'react';
import PropTypes from 'prop-types'

class Link extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let {onclick,children,active} = this.props;
        return <button disabled={active} onClick={onclick}>
            {children}
        </button>
    }
}
Link.propTypes = {
    onclick:PropTypes.func.isRequired,
    children:PropTypes.node.isRequired,
    active:PropTypes.bool.isRequired
};
export default Link;