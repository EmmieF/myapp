import React,{Component} from 'react'
import PropTypes from 'prop-types'

class test extends Component {
    constructor(props){
        super(props)
    }
    render(){
        let {onClick,completed,text} = this.props;
        return <div>
            <ul>
                <li onClick={onClick} style={{textDecoration:completed?'line-through':'none'}}>{text}</li>
            </ul>
        </div>
    }
}
test.propTypes = {
    onClick:PropTypes.func.isRequired,
    completed:PropTypes.bool.isRequired,
    text:PropTypes.string.isRequired
};
export default test;