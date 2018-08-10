import React,{Component} from 'react'
import PropTypes from 'prop-types'
import Todo from './todo'

class todolist extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {todos,onTodoClick} = this.props;
        return <ul>
            {todos.map((item,ind)=>{
                <Todo key={item.id} {...todos} completed={item.completed} text={item.text} onClick={() => onTodoClick(item.id)}/>
            })}
        </ul>
    }
}
todolist.propTypes = {
    todos:PropTypes.arrayOf(PropTypes.shape({
        id:PropTypes.number.isRequired,
        completed:PropTypes.bool.isRequired,
        text:PropTypes.string.isRequired
    })).isRequired,
    onTodoClick:PropTypes.func.isRequired
};
export default todolist;


