
let Component = React.createClass({
    getInitialState:function(){
        return {
            name:'Component',
            num:1
        }
    },
    getDefaultProps:function(){
        return{
            lastname:'222'
        }
    },
    propTypes:{

    },
    setNum:function(){
      this.setState({
          num:this.state.num++
      })
    },
    getLastName:function(){
        console.log(this.props.lastname);
        // this.setProps({
        //     lastname:this.lastname+'name'
        // })
    },
    componentWillMount:function(){
        console.log('componentWillMount');
    },
    componentDidMount:function(){
        console.log('componentDidMount');
    },
    componentWillReceiveProps:function(){
        console.log('componentWillReceiveProps');
    },
    shouldComponentUpdate:function(){
        console.log('shouldComponentUpdate');
    },
    componentWillUpdate:function(){
        console.log('componentWillUpdate');
    },
    componentDidUpdate:function(){
        console.log('componentDidUpdate');
    },
    componentWillUnmount:function(){
        console.log('componentWillUnmount');
    },
    render:function () {
        return (
            <div>
                这是{this.state.name}
                <div onClick={this.props.setlastname}>props lastname:{this.props.lastname}</div>
                <div onClick={this.getLastName}>查看lastname</div>
                <div onClick={this.setNum}>num:{this.state.num}</div>
            </div>
        )
    }
});
let lastname='component last';
let setlastname = function(){
    lastname += 'name'
    // setProps({
    //     lastname:'dddddddd'
    // })
};
ReactDOM.render(
    <Component lastname={lastname} setlastname={setlastname} />,
    document.getElementById('app')
);