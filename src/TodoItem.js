import React, { Component, PropTypes } from "react";
import TodoInput from "./TodoInput";

class TodoItem extends Component{
    constructor(...args){
        super(...args);
        this.state = {
            isEditable: false
        }
    }


    static get defaultProps(){
        return {           
            title:"逻辑思维",
            checked: true,
            id:100,
            toggleItem(){},
            deleteItem(){},
            editItem(){}
        }
    }

    static propsType = {       
        tltle: PropTypes.string.isRequired,
        checked: PropTypes.bool.isRequired,
        id: PropTypes.number.isRequired,
        toggleItem: PropTypes.func.isRequired,
        deleteItem: PropTypes.func.isRequired,
        editItem: PropTypes.func.isRequired
    }


    // 修改状态模式
    changeEditableValue(){
        this.setState({
            isEditable: !this.state.isEditable
        });
    }


    // 编辑模式
    editMoe(){
        const {title, checked, toggleItem, id, deleteItem, editItem } = this.props;

        return (
             <div>
                <input 
                    type="checkbox"  
                    defaultChecked={checked}
                    onChange={ () => {
                       toggleItem(id)
                    }}
                />
                <TodoInput
                    autoFocus={true}
                    style={{width:200, height:25}}
                    defaultValue={ title }
                    onBlur={() => {
                        this.changeEditableValue();
                        console.log("=====");
                    }}
                    onKeyDown={(e) => {
                        if(e.keyCode === 13 && e.target.value !== ""){
                            editItem( id, e.target.value );
                            this.changeEditableValue();
                        }                        
                    }}
                    
                />
                <button onClick={() => {
                    deleteItem(id)                                     
                }}>x</button>
           </div>
        )
    }

     // 只读模式
    onLyRead(){
        const {title, checked, toggleItem, id, deleteItem } = this.props;
        return (
           <div>
                <input 
                    type="checkbox"  
                    defaultChecked={checked}
                    onChange={ () => {
                       toggleItem(id)
                    }}
                />
                <span onDoubleClick={() => {
                    this.changeEditableValue();
                }} >{ title }</span>

                <button onClick={() => {
                    deleteItem(id);                    
                }}>x</button>
           </div>
        );
    }

   // TODO: 渲染
    render(){
        return this.state.isEditable ? this.editMoe() : this.onLyRead();
    }
}

export default TodoItem;