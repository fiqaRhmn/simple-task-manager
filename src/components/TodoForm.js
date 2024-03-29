import React from 'react'
import { useState } from 'react';

function TodoForm({ onAddTodo }) {
    const [newTodo, setNewTodo] = useState("");
    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('Medium');
    
    const handleSubmit = () => {
        onAddTodo({
            title,
            description: newTodo,
            dueDate,
            priority
        });
        // Reset form fields after submission
        setTitle('');
        setNewTodo('');
        setDueDate('');
        setPriority('Medium');
    };
  
    return (
      <div className='todo-form-container'>
        <div className='form-row'>
            <input 
                type='text'
                placeholder='Title'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <input 
                type="date"
                className='date-input'
                onChange={(e) => setDueDate(e.target.value)}
                value={dueDate}
            />
        </div>
        
        <div className='form-row'>
            <textarea
            placeholder="Description..."
            onChange={(e) => setNewTodo(e.target.value)}
            value={newTodo}
            />

            <select
                onChange={(e) => setPriority(e.target.value)}
                value={priority}
                className='priority-dropdown'
                >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>

        </div>

        
        <button onClick={handleSubmit}>Create Task</button>
      </div>
    );
  }
  
  export default TodoForm;