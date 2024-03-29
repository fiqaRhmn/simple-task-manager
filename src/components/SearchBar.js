import React, { useState } from 'react';

function SearchBar({ onSearch, onFilterChange, currentFilter }) {
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault(); // Prevent form submission from reloading the page
      onSearch(searchTerm);
    };

    const handleClearSearch = () => {
        setSearchTerm(''); // Clear the local input
        onSearch(''); // Reset the search in the parent component
    };
    

  return (
    <div className="SearchBar">
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Search</button>
            <button type="button" onClick={handleClearSearch}>Clear Search</button>
        </form> 

        <select onChange={onFilterChange} value={currentFilter}>
            <option value="All">All</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
            <option value="Completed">Completed</option>
            <option value="Active">Active</option>
            <option value="Overdue">Overdue</option>
      </select>
    </div>

  );
}

export default SearchBar;
