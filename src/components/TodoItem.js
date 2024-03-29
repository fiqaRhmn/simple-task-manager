import React from 'react';
import { useState, useEffect } from 'react';

function TodoItem({ item, idx, editTodo, onEdit, onDelete, onUpdate, isEditing, editIdx, setEditTodo, onDone }) {
    // Local state for inputs to allow editing within this component
    const [localTitle, setLocalTitle] = useState(item.title);
    const [localDescription, setLocalDescription] = useState(item.description);
    const [localDueDate, setLocalDueDate] = useState(item.dueDate);
    const [localPriority, setLocalPriority] = useState(item.priority);

    // Update local state when item prop changes
    useEffect(() => {
        if (isEditing && editIdx === idx) {
            setLocalTitle(item.title);
            setLocalDescription(item.description);
            setLocalDueDate(item.dueDate);
            setLocalPriority(item.priority);
        }
    }, [item, isEditing, editIdx, idx]);

    // Handles the updating of the todo item
    const handleUpdate = () => {
        onUpdate({ 
            title: localTitle, 
            description: localDescription, 
            dueDate: localDueDate, priority: 
            localPriority, 
            id: item.id 
        }, idx);
        
        onEdit(null, -1); // Exit edit mode
    };

    // // Add a "Done" button handler in TodoItem.js
    // const handleMarkAsDone = () => {
    //     const updatedItem = { ...item, done: true };
    //     onUpdate(updatedItem, idx);
    // };

    return (
        <div className='todo--container'>
        <div className='todo--list'>
          <li>
            <h3>{item.title}</h3>
            <p>Description: {item.description}</p>
            <p>Due Date: {item.dueDate}</p>
            <p>Priority: {item.priority}</p>
          </li>
        </div>
        <div className='todo--buttons'>
          <button onClick={() => onDelete(idx)}>Delete</button>
          <button onClick={() => onEdit(item, idx)}>Edit</button>
          <button onClick={() => onDone(item)}>Done</button>
        </div>
      
        {editIdx === idx && (
          <div className="edit-fields">
            <input 
              type="text" 
              value={localTitle} 
              onChange={(e) => setLocalTitle(e.target.value)} 
            />
            <textarea 
              value={localDescription} 
              onChange={(e) => setLocalDescription(e.target.value)} 
            />
            <input 
              type="date" 
              value={localDueDate} 
              onChange={(e) => setLocalDueDate(e.target.value)} 
            />
            <select 
              value={localPriority} 
              onChange={(e) => setLocalPriority(e.target.value)}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={() => onEdit(null, -1)}>Cancel</button>
          </div>
        )}
      </div>
      

    );
  }
  
  export default TodoItem;