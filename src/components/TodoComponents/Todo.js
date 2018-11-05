import React from 'react';
import PropTypes from 'prop-types';

// export default class Todo extends Component{
//     constructor(props){
//         super(props);
//     }
//     render(){
//         let {toggleTodoClick,text,completed} = this.props;
//         return <li onClick={toggleTodoClick} style={{ textDecoration : completed ? 'line-through' : 'none'}}>
//                 {text}
//         </li>
//     }
// }

const Todo = ({toggleTodoClick,text,completed})=>(
    <li onClick={toggleTodoClick} style={{ textDecoration : completed ? 'line-through' : 'none'}}>
    {text}
    </li>
)
export default Todo

Todo.prototype = {
    toggleTodoClick:PropTypes.func.isRequired,
    text:PropTypes.string.isRequired,
    completed:PropTypes.bool.isRequired
}