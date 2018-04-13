let title = '123';
let Props = React.createClass({
    //初始化state
    getInitialState:function(){
      return{
          num:1
      }
    },
    //设置默认props
    getDefaultProps:function(){
        return {
            type:'defaule type'
        }
    },
    propTypes:{
        name:React.PropTypes.string.isRequired,
        title:React.PropTypes.number
    },
    render:function () {
        let sty = {
            fontSize:22,
            color:'orange'
        };
        return (
            <div>
                <div style={sty}>这是state：</div>
                <div>num:{this.state.num}</div>
                <div style={sty}>下面是props：</div>
                <div>name:{this.props.name}</div>
                <div>type:{this.props.type}</div>
                <div>title:{this.props.title}</div>
            </div>
        )
    }
});
ReactDOM.render(
    <Props  title={title}/>,
    document.getElementById('app')
);