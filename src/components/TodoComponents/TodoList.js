import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

export default class TodoList extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {todos,toggleTodo} = this.props;
        return <ul>
                {todos.map(todo=>
                    <Todo key={todo.id} toggleTodoClick={()=>toggleTodo(todo.id)} {...todo}></Todo>
                )}
            </ul>
    }
}
TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        completed: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired
      }).isRequired).isRequired,
    toggleTodo:PropTypes.func.isRequired,
}