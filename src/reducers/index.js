import { combineReducers } from 'redux';
import todos from './todos';
import visibileFilter from './visibleFilter'

export default combineReducers({
    todos,
    visibileFilter
})
