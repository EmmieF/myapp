//style
let sty = {
    color:'red',
    fontSize:15
};
//标签数组
let ele = [
    <span>这是ele 1</span>,
    <span>这是ele 2</span>,
];
//基本写入
// ReactDOM.render(
//     <div>
//         <p style={sty}>这是第一个React</p>
//         <p>{2+2}</p>
//         {/*这是注释，需要写在花括号中*/}
//         <p>{1?'这是true':'这是false'}</p>
//         {ele}
//     </div>,
//     document.getElementById('app')
// );
//html组件
let eleHtml = <div>这是eleHtml</div>;
// ReactDOM.render(
//     eleHtml,
//     document.getElementById('app')
// );
//react组件
let EleReact = React.createClass({
    render:function () {
        return <div>这是reactHtml
                    <div>这是{this.props.name}</div>
                </div>
    }
});
// ReactDOM.render(
//     <EleReact name="props name:reactHtml child" />,
//     document.getElementById('app')
// );
let LiOne = React.createClass({
    render:function () {
        return <li>这是第一个li {this.props.content}</li>
    }
});

let LiTwo = React.createClass({
    render:function () {
        return <li>这是第二个li {this.props.content}</li>
    }
});
let UlEle = React.createClass({
    render:function () {
        return <ul>
                <LiOne content={this.props.lione}></LiOne>
                <LiTwo content={this.props.litwo}></LiTwo>
            </ul>
    }
});
ReactDOM.render(
    <UlEle lione="lione content" litwo="litwo content"/>,
    document.getElementById('app')
);