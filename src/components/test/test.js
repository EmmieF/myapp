import React,{Component} from 'react';
class test extends Component{
    constructor(props){
        super(props);
        this.state = {
            num1:0,
            num2:0
        };
        this.handlerNum1Add = this.handlerNum1Add.bind(this);
        this.handlerNum2Add = this.handlerNum2Add.bind(this);
    }
    componentWillReceiveProps(){
        // console.log('test componentWillReceiveProps');
    }
    handlerNum1Add(){
        let _this = this;
        this.setState({num1:this.state.num1+1});
        this.props.onTotal(1);
    }
    handlerNum2Add(){
        let _this = this;
        this.setState({num2:this.state.num2+1});
        this.props.onTotal(1);
    }
    render(){
        return <div>
            <div>{this.state.num1}</div><button onClick={this.handlerNum1Add}>+num1</button>
            <div>{this.state.num2}</div><button onClick={this.handlerNum2Add}>+num2</button>
        </div>
    }
}
export default test;


