import { connect } from 'react-redux';
import { toggleTodo,VisibleFilters } from './../actions'
import TodoList from './../../components/TodoComponents/TodoList'

const visibileTodoList = (todos,filter)=> {
    switch (filter) {
        case VisibleFilters.SHOW_ALL:
            return todos;
        case VisibleFilters.SHOW_COMPLETED:
            return todos.filter(todo=>todo.completed);
        case VisibleFilters.SHOW_ACTIVE:
            return todos.filter(todo=>!todo.completed);
        default:
            throw new Error('Unknown filter: ' + filter)
    }
}

const mapStateToProps = state => ({
    todos: visibileTodoList(state.todos,state.visibileFilter)
})
const mapDispatchToProps = dispatch => ({
    toggleTodo: id => dispatch(toggleTodo(id))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);