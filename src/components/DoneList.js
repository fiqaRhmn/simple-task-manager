import React from 'react'

function DoneList({ todos, onDelete, onClear }) {
  return (
    <div className='todo--container'>
      <ul className='todo--list'>
          {todos.map((todo) => (
            <li key={todo.id}>
              <h3>{todo.title}</h3>
              <p>Description: {todo.description}</p>
              <p>Due Date: {todo.dueDate}</p>
              <p>Priority: {todo.priority}</p>
              <button onClick={() => onDelete(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
        {todos.length > 0 && (
          <button onClick={onClear} className="clear-button">
            Clear Completed Tasks
          </button>
        )}
    </div>
  );
}

export default DoneList
