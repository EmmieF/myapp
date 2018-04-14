
let num1 = 1;
let StateEle = React.createClass({
    getInitialState:function(){
        return {
            num:0
        }
    },
    //num ++
    addNum:function(){
        let obj = this.state;
        // obj.num += 1;
        // this.setState(obj);
        this.setState({
            num:this.state.num+1
        })
    },
    render:function () {
        let sty = {
            fontSize:20,
            color:'green'
        };
        return (
            <div style={sty}>
                <div onClick={this.addNum}>请点击我：</div>
                {this.state.num}
                <div>这是子元素</div>
                <div onClick={this.props.addNum1}>点击我查看props.num1:{this.props.num1}</div>
            </div>
        )
    }
});
let addNum1 = function(e){
    // e.stopPropagation();
    console.log(num1);
    num1++;
};

ReactDOM.render(
    <StateEle num1={num1} addNum1={addNum1} />,
    document.getElementById('app')
);