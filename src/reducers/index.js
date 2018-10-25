import { combineReducers } from 'redux';
import todos from './todos';
import visibileFilter from './visibleFilter'

//combineReducers 所做的只是生成一个函数，这个函数来调用你的一系列 reducer，每个 reducer 根据它们的 key 来筛选出 state 中的一部分数据并处理，然后这个生成的函数再将所有 reducer 的结果合并成一个大的对象
export default combineReducers({
    todos,
    visibileFilter
})
