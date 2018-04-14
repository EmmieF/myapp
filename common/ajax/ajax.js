
let LiEle = React.createClass({
    render(){
        return (
            <li>{this.props.item.comments}</li>
        )
    }
});

let AjaxEle = React.createClass({
    getInitialState(){
      return {
          name:'ajax',
          sourceData:[{name:1},{name:2}]
      }
    },
    getDefaultProps(){
        return {
        }
    },
    propTypes:{
    },
    //组件渲染结束
    componentWillMount(){
        $.get(this.props.source,(re)=>{
            this.setState({
                sourceData:re
            });
            console.log(this.state.sourceData);
        })
    },
    render:function () {
        let sty = {
            fontSize:20,
            color:'red'
        };
        return (
            <div style={sty}>
                <div>{this.state.name}</div>
                {/*<div>{this.state.sourceData[0].name}</div>*/}
                <ul>
                    {this.state.sourceData.map((item=><LiEle item={item}/>))}
                </ul>
            </div>
        )
    }
});
ReactDOM.render(
    <AjaxEle source="https://api.github.com/users/octocat/gists" />,
    document.getElementById('app')
);