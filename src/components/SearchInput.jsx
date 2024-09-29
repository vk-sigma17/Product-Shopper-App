
import React from 'react';

const SearchInput = ({ searchItem, onSearchChange }) => {
    return (
        <input 
            type="text" 
            placeholder="Search products..." 
            value={searchItem} 
            onChange={onSearchChange} 
            className='search-input'
        />
        
    );
};

export default SearchInput;
