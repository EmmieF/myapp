import React from 'react'
import {connect} from 'react-redux'
import {setVisibilityFilter} from './../stores/actions/index'
import Link from './../components/storeTest/link'

const mapStateToProps = (state,ownProps)=>{
    return{
        active:ownProps.filter === state.visibilityFilter,
        children:'22',
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(setVisibilityFilter(ownProps.filter))
        }
    }
};
const FilterLink = connect(
    mapStateToProps,
    mapDispatchToProps
)(Link);

export default FilterLink
