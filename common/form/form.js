
let InpEle = React.createClass({
    getInitialState(){
        return{
            name:'li'
        }
    },
    getDefaultProps(){
        return {
            con:'li con'
        }
    },
   render(){
        return(
            <div>
                <input type="text" value={this.props.inpVal} onChange={this.props.inputupdate} placeholder="child input"/>
            </div>
        )
   }
});

let FormEle = React.createClass({
    getInitialState(){
        return{
            name:'Form',
            inpVal:'val'
        }
    },
    getDefaultProps(){
        return {}
    },
    propTypes:{
    },
    input_change(e){
        this.setState({
            inpVal:e.target.value
        });
    },
    click_fun(e){
        console.log(e.currentTarget.dataset.str);
    },
    render(){
        let sty = {
            color:'orange',
            fontSize:20
        };
        return (
            <div>
                <div style={sty} onClick={this.click_fun} data-str="444">{this.state.name}</div>
                {/*<input type="text" placeholder="请输入input_val值" data-inp="111"*/}
                       {/*value={this.state.inpVal} onChange={this.input_change}/>*/}
                <InpEle inpVal={this.state.inpVal} inputupdate={this.input_change}/>
                {this.state.inpVal}
            </div>
        )
    }
});
ReactDOM.render(
  <FormEle />,
  document.getElementById('app')
);