import React, { Component, PropTypes } from "react";

class TodoHeader extends Component{
    static get defaultProps(){
        return {
            name:"呈琛",
            todoCount:98
        };
    }

    static propTypes = {
        name: PropTypes.string.isRequired,
        todoCount: PropTypes.number.isRequired
    }

    render(){
        const { name, todoCount } = this.props; 
        return (
            <div>
                <h1>我的任务清单</h1>
                <h3>Hello! { name }，你有 { todoCount } 任务未处理</h3>
            </div>             
        )
    }
}

export default TodoHeader;