import React, { Component } from "react";
import TodoHeader from "./TodoHeader";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

class TodoApp extends Component{   
    constructor( ...args){
        super(...args);
        this.state = {
             todos: []
        }
    }

   toggleItemList( todos, id ){
        let target = todos.find(( todo ) => {
            return todo.id === id;
        });

        target.checked = !target.checked;
        return todos;
    }

    // TODO: 删除
    deleteItemList( todos, id ){
        // 1. 先找到要删除的Item的索引
        let idx = todos.findIndex((todo) => {
            return todo.id === id;
        });
        // 按照索引进行删除
        todos.splice(idx, 1);
        return todos; 
    }

    // TODO: 新增
    createItem( todos, title ){
        let idx = todos.length ? todos[todos.length -1].id + 1 : 100;
        todos.push({
            id: idx,
            title,
            checked: false
        });
        
        return todos;
    }

    // 状态编辑的模式
    editItemList( todos, id, title ){
        let target = todos.find((todo) => {
            return todo.id === id;
        });
        target.title = title;
        return todos;
    }
 
    // 只读模式
    onLyRead(){
        const { todos } = this.state;
        // filter 是一人过滤器 
        let todoCount = todos.filter( ( todo ) => !todo.checked).length;
        return (
            <div>
                <TodoHeader name="Alan" todoCount={ todoCount } />               
                <TodoInput 
                    style={{width:200, height:30}}
                    placeholder="请输入代办内容..."
                    type="text"
                    autoFocus={true}
                    onKeyDown={(e) => {
                        // 打印键盘的代码值  console.log(e.keyCode);
                        console.log(e.keyCode);

                        // 判断 13 是 Enter 解盘的确认键
                        if( e.keyCode === 13 && e.target.value !== ""){
                            console.log(e.target.value);
                            this.setState({
                                todos:this.createItem( todos, e.target.value )
                            });

                            e.target.value = "";
                        }
                    }}
                />
                <TodoList 
                    todos={todos}
                    toggleItemList={ (id) => {
                        this.setState({
                            todos:this.toggleItemList( todos, id)
                        })
                    }}
                    deleteItemList={(id) => {
                        this.setState({
                            todos:this.deleteItemList( todos, id )
                        })
                    }}
                    editItemList={(id, title) => {
                        this.setState({
                            todos: this.editItemList( todos, id, title)
                        });
                    }}
                />
            </div>
        )
    }

    
    // TODO: 渲染
    render(){               
        //return this.onLyRead();
        return this.onLyRead();
    }

    // 加载完成    
    componentDidMount(){
        // 读取数据
        fetch("todos.json")
            // 解析成json数据
            .then((data) => data.json())
            // 获取到的数据 
            .then(( todos ) => {
                // 取得的todos数据
                this.setState({ todos })
                console.log( todos );
            });        
    }
}

export default TodoApp;
// 兼容性的写法
// module.exports = TodoApp;