import React, { Component, PropTypes } from "react";
import TodoItem from "./TodoItem";

class TodoList extends Component{
    static get defaultProps(){
        return {
           todos:[],
           toggleItemList(){},
           deleteItemList(){},
           editItemList(){}
        }
    }

    static propsType = {
       todos: PropTypes.arrayOf(PropTypes.object).isRequired,
       toggleItemList: PropTypes.func.isRequired,
       deleteItemList: PropTypes.func.isRequired,
       editItemList: PropTypes.func.isRequired

    }

    render(){       
        return (
           <ul>
               {
                   this.props.todos.map( (todo) => {
                       return (
                           <li key={todo.id}>
                                 <TodoItem 
                                    id={todo.id}
                                    title={todo.title}
                                    checked={todo.checked} 
                                    toggleItem={(id) => {
                                        this.props.toggleItemList(id);                                      
                                    }}
                                    deleteItem={(id) => {
                                        this.props.deleteItemList(id);
                                    }}
                                    editItem={( id, title ) => {
                                        this.props.editItemList(id, title);
                                    
                                    }}
                                    
                                 />
                           </li>
                       )
                   })
               }
           </ul>
        );
    }
}

export default TodoList;