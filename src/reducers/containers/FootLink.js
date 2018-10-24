import { connect } from 'react-redux';
import Link from './../../components/TodoComponents/Link'
import { setVisibleFilter } from './../actions'

const mapStateToProps = (state,ownProps) => ({
    active:state.visibileFilter === ownProps.filter
})
const mapDispatchToProps = (dispatch,ownProps) => ({
    onclick: ()=>dispatch(setVisibleFilter(ownProps.filter))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Link);
