import React,{Component} from 'react'
import PropTypes from 'prop-types'

class link extends Component{
    constructor(props){
        super(props);
    }
    render() {
        let {active,children,onClick} = this.props;
        if(active){
            return <span>{children}</span>
        }
        return <a href="" onClick={onClick}>
            {children}
        </a>
    }
}
link.propTypes = {
    active:PropTypes.bool.isRequired,
    children:PropTypes.string.isRequired,
    onClick:PropTypes.func.isRequired
};
export default link;