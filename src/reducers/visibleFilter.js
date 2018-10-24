import {VisibleFilters} from './actions';

const visibileFilter = (state = VisibleFilters.SHOW_ALL,action) => {
    switch (action.type){
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;

    }
}
export default visibileFilter