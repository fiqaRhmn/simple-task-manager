import React from 'react';

function OverdueList({todos, markAsDone}) {

return(
    <div className='todo--container'>
      <ul className='todo--list'>
        {todos.map((todo, idx) => (
            <div className='todo--container overdue'>
                <li key={idx}>
                    <h3>{todo.title}</h3>
                    <p>Description: {todo.description}</p>
                    <p>Due Date: {todo.dueDate}</p>
                    <p>Priority: {todo.priority}</p>
                </li>

                <button onClick={() => markAsDone(todo)}>Done</button>
            </div>

        ))}
      </ul>
    </div>
)

}

export default OverdueList;
