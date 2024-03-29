import React from 'react';
import TodoItem from '../components/TodoItem';

function TodoList({ todos, editTodo, onEdit, onDelete, onUpdate, editIdx, editBtnActive, setEditTodo, onDone }) {
    return (
      <ul className="TodoList">
        {todos.map((item, idx) => (
            <li className="TodoList-item" key={idx}>
            <TodoItem
            key={idx}
            item={item}
            idx={idx}
            editTodo={editTodo}
            onEdit={onEdit}
            onDelete={onDelete}
            onUpdate={onUpdate}
            isEditing={editBtnActive}
            editIdx = {editIdx}
            setEditTodo = {setEditTodo}
            onDone={() => onDone(item)}
            />  
            </li>

        ))}
      </ul>
    );
  }
  
  export default TodoList;