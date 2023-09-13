import React, { createContext, useEffect, useState, useContext } from 'react';

const SearchContext = createContext();

export function SearchProvider({ children }) {

    const [searchQuery, setSearchQuery] = useState('');
    const [inputWorking, setInputWorking] = useState(false);

    useEffect(() => {
        const storedSearchQuery = localStorage.getItem('searchQuery');
        if(storedSearchQuery){
            console.log(storedSearchQuery);
            console.log("STORED SEARCH QUERY!!")
            setSearchQuery(storedSearchQuery);
        }
    }, []);

    /*****************/
    /*    RENDER 
    /*****************/

    return (
        <SearchContext.Provider value={{ searchQuery, setSearchQuery, inputWorking, setInputWorking }}>
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    return useContext(SearchContext);
}