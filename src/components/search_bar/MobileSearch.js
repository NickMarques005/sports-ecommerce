import React from 'react';
import SearchResults from './SearchResults';

const MobileSearch = ({ 
    search,
    handleChangeSearchInput,
    handleSearchKeyPress,
    resultsData,
    suggestionsData,
    handleSuggestionClick,
    inputWorking                
}) => {
    return (
        <div className="mobile_search_div" >
            <input 
                className="input_search"
                maxLength="32"
                type="text"
                placeholder="Buscar"
                value={search}
                onChange={(e) => handleChangeSearchInput(e)}
                onKeyDown={handleSearchKeyPress}
            />
            <SearchResults
                resultsData={resultsData}
                suggestionsData={suggestionsData}
                handleSuggestionClick={handleSuggestionClick}
                inputWorking={inputWorking}
            />
        </div>
    );
};

export default MobileSearch;