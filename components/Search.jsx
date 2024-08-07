import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import useProductStore from '@/store/useProductStore';

const SearchBar = () => {
    const { setSearchTerm } = useProductStore();
    const [inputValue, setInputValue] = useState('');

    const handlePress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    const handleSearch = () => {
        setSearchTerm(inputValue.trim());
        setInputValue('');
    }


    return (
        <div className="relative flex items-center">
            <input
                type="text"
                placeholder="Search..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handlePress}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <SearchIcon 
                size={20} 
                className="absolute left-3 text-gray-400 pointer-events-none"
            />
            <button
                onClick={handleSearch}
                className="absolute right-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar;