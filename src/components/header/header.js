import React,{Component} from 'react'
import {Link,browserHistory} from 'react-router'
import './header.css'

class header extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {headername,istabbar} = this.props;
        return <header>
            {istabbar?null:<Link onClick={()=>browserHistory.goBack()} className="back"></Link>}
            {headername}
            {/*<span className="header-more"></span>*/}
        </header>
    }
}
export default header