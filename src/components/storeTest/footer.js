import React,{Component} from 'react'
import FilterLink from './../../pages/filterlink'

class footer extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return <div>
            SHOW {' '} <FilterLink filter="SHOW_ALL" >All</FilterLink>
            {', '}<FilterLink filter="SHOW_ACTIVE" >Active</FilterLink>
            {', '}<FilterLink filter="SHOW_COMPLETED" >Completed</FilterLink>
        </div>
    }
}
export default footer;