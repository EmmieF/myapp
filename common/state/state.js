
let StateEle = React.createClass({
    getInitialState:function(){
        return {
            num:0
        }
    },
    //num ++
    addNum:function(){
        let obj = this.state;
        obj.num += 1;
        this.setState(obj);
    },
    render:function () {
        let sty = {
            fontSize:20,
            color:'green'
        };
        return (
            <div onClick={this.addNum} style={sty}>
                请点击我：
                {this.state.num}
                <div>这是子元素</div>
            </div>
        )
    }
});
ReactDOM.render(
    <StateEle />,
    document.getElementById('app')
);