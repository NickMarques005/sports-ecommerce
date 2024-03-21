import React from 'react';
import SearchMiniCard from './SearchMiniCard';

const SearchResults = ({ resultsData, suggestionsData, handleSuggestionClick, inputWorking }) => {
    return (
        <div className={`search_results_div ${resultsData.length == 0 && !inputWorking ? "off" : ""}`}>
            <div className="suggestions_div">
                <div className="suggestions_title_div">
                    <span>Sugestões</span>
                </div>
                <ul>
                    {
                        suggestionsData.length !== 0 ?
                            suggestionsData.map((result, index) => ( // Adicionado index para usar como key
                                <li key={index}>
                                    <label onClick={() => handleSuggestionClick(result)}>{result.suggestion.toLowerCase()}</label>
                                </li>
                            ))
                            : ""
                    }
                </ul>
            </div>
            <div className="searchProducts_div">
                <div className="searchProducts_title_div">
                    <span>Produtos</span>
                </div>
                <ul>
                    {
                        resultsData.length !== 0 ?
                            resultsData.map((result) => (
                                <li key={result._id}>
                                    <SearchMiniCard
                                        searchProductId={result._id}
                                        searchProductType={result.type}
                                        searchProductName={result.name}
                                        searchProductInitPrice={result.initial_price}
                                    />
                                </li>
                            ))
                            : ""
                    }
                </ul>
            </div>
        </div>
    );
};

export default SearchResults;