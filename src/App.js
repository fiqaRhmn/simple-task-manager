import './App.css';
import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import DoneList from './components/DoneList';
import OverdueList from './components/OverdueList'; 
import SearchBar from './components/SearchBar';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [editTodo, setEditTodo] = useState("");
  const [editIdx, setEditIdx] = useState(-1);
  const [editBtnActive, setEditBtnActive] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const priorityLevels = { "High": 1, "Medium": 2, "Low": 3 };
  const [sortedTodos, setSortedTodos] = useState([]);


    // Load initial data from local storage
    useEffect(() => {
      const loadedTodoList = JSON.parse(localStorage.getItem('todoList'));
      const loadedCompletedTodos = JSON.parse(localStorage.getItem('completedTodos'));
    
      console.log('Loaded todoList:', loadedTodoList);
      console.log('Loaded completedTodos:', loadedCompletedTodos);
    
      if (loadedTodoList) {
        setTodoList(loadedTodoList);
      }
      if (loadedCompletedTodos) {
        setCompletedTodos(loadedCompletedTodos);
      }
    }, []);
    
    // Save to local storage
    const saveToLocalStorage = () => {
      localStorage.setItem('todoList', JSON.stringify(todoList));
      localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
    };
    

  // Update filteredTasks based on the search and new filter option
  const getFilteredTasks = () => {
    let filtered = sortedTodos.filter(todo => {
      if (filter === 'High' || filter === 'Medium' || filter === 'Low') {
        return todo.priority === filter;
      }
      if (filter === 'Completed') {
        return todo.done;
      }
      if (filter === 'Active') {
        return !todo.done;
      }
      if (filter === 'Overdue') {
        return !todo.done && new Date(todo.dueDate) < today;
      }
      return true;
    });

    if (searchTerm) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    return filtered;
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTasks = getFilteredTasks();

  // Assume today's date, stripped of the time component for accurate comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);




  // Sort todos whenever the todoList changes
  useEffect(() => {
    const sorted = [...todoList].sort((a, b) => {
      // Sort by priority
      if (priorityLevels[a.priority] !== priorityLevels[b.priority]) {
        return priorityLevels[a.priority] - priorityLevels[b.priority];
      }
      // If priorities are the same, sort by dueDate (earliest first)
      return new Date(a.dueDate) - new Date(b.dueDate);
    });

    setSortedTodos(sorted);
  }, [todoList]);

  const editItem = (item, idx) => {
    // Implementation for editItem
    if (editIdx === idx) {
      setEditIdx(-1);
      setEditTodo("");
      setEditBtnActive(false); // Disable edit mode
    } else {
      // Else, set up for editing this item
      setEditTodo(todoList[idx]);
      setEditIdx(idx);
      setEditBtnActive(true); // Enable edit mode
    }
  };

  const deleteItem = (item) => {
    // Implementation for deleteItem
    setTodoList(todoList.filter((_, index) => index !== item));
    saveToLocalStorage();
  };

  const updateTodo = (item, idx) => {
    // Implementation for updateTodo

    const updatedList = todoList.map((todo, index) => index === idx ? {...todo, ...item} : todo);
    setTodoList(updatedList);
    
    // Reset edit states after update
    setEditIdx(-1);
    setEditTodo(""); // Assuming editTodo is no longer needed in this context
    setEditBtnActive(false); // Exit edit mode
    saveToLocalStorage();
    
  };

  const handleAddTodo = (todo) => {
    const newTodo = {
      ...todo,
      title: todo.title || 'Untitled',
      description: todo.description || '',
      id: Date.now()
    };
    // Implementation for handleAddTodo
    setTodoList((prevTodos) => [
      ...prevTodos,
      { ...todo, id: Date.now() } // Assuming an 'id' for key prop usage
    ]);
    // Update state with title, date, and priority from the todo object
    setTitle(todo.title);
    setDate(todo.dueDate);
    setPriority(todo.priority);

  };
    
  const markAsDone = (task) => {
    // Set 'done' property to true
    const newCompletedTodo = { ...task, done: true };
  
    // Remove the task from the todoList, regardless of its overdue status
    const newTodoList = todoList.filter((item) => item.id !== task.id);
  
    // Add the task to the completedTodos array
    setCompletedTodos([...completedTodos, newCompletedTodo]);
  
    // Update the state with the new lists
    setTodoList(newTodoList);
    console.log('setCompletedTodos');

  };
  
  
  const handleSearch = (query) => { 
    setSearchTerm(query);
  };
  
  const searchFilteredTasks = sortedTodos.filter(todo =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchTerm.toLowerCase()));

  const activeNonOverdueTodos = searchFilteredTasks.filter(todo => !todo.done && new Date(todo.dueDate) >= today);
  const overdueTodos = searchFilteredTasks.filter(todo => !todo.done && new Date(todo.dueDate) < today);

  const filteredCompletedTodos = completedTodos.filter(todo =>
    todo.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    todo.description?.toLowerCase().includes(searchTerm.toLowerCase()));


    const deleteCompletedTodo = (id) => {
      setCompletedTodos((prevCompletedTodos) => 
        prevCompletedTodos.filter((todo) => todo.id !== id)
      );
    };
  
    const clearCompletedTodos = () => {
      setCompletedTodos([]);
    };
  
  return (
    <div className='main--content'>
      <SearchBar onSearch={handleSearch} />
      
      <h1>Create New Task</h1>
      <TodoForm 
        onAddTodo={handleAddTodo} 
      />

      <div className='tasks-container'>
        <div className='task-category'>
          <h2>Upcoming Tasks</h2>
          <TodoList
            todos={filteredTasks.filter(todo => !todo.done && new Date(todo.dueDate) >= today)}
            editTodo={editTodo}
            setEditTodo={setEditTodo}
            onEdit={editItem}
            onDelete={deleteItem}
            onUpdate={updateTodo}
            editIdx={editIdx}
            editBtnActive={editBtnActive}
            onDone={markAsDone}
          />
        </div>
       
        <div className='task-category'>
          <h2>Overdue Tasks</h2>
          <OverdueList 
          todos={filteredTasks.filter(todo => !todo.done && new Date(todo.dueDate) < today)} 
          markAsDone={markAsDone}
          />
        </div>
              
        <div className='task-category'>
          <h2>Completed Tasks</h2>
          <DoneList 
            todos={filteredCompletedTodos}
            onDelete={deleteCompletedTodo}
            onClear={clearCompletedTodos}
          />
        </div> 
              

        
      </div>
      <button onClick={()=>saveToLocalStorage()}>Save</button>
    </div>
  );
}

export default App;