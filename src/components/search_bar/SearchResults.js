import React from 'react';
import SearchMiniCard from './SearchMiniCard';

const SearchResults = ({ search, resultsData, suggestionsData, handleSuggestionClick, inputWorking, isSearching }) => {
    return (
        <div className={`search_results_div ${resultsData.length === 0 && !inputWorking ? "off" : ""}`}>

            {!isSearching ?

                <>
                    <div className="suggestions_div">
                        <div className="suggestions_title_div">
                            <span>Sugestões</span>
                        </div>

                        {
                            suggestionsData.length !== 0 ?
                                <ul>
                                    {
                                        suggestionsData.map((result, index) => ( // Adicionado index para usar como key

                                            <li key={index}>
                                                <label onClick={() => handleSuggestionClick(result)}>{result.suggestion.toLowerCase()}</label>
                                            </li>
                                        ))
                                    }
                                </ul>
                                :

                                <label>{`Nenhuma sugestão encontrada`}</label>
                        }

                    </div>
                    <div className="searchProducts_div">
                        <div className="searchProducts_title_div">
                            <span>Produtos</span>
                        </div>

                        {
                            resultsData.length !== 0 ?
                                <ul>
                                    {
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
                                    }
                                </ul>

                                :

                                <label>
                                    {`Nenhum resultado encontrado para ${search}`}
                                </label>
                        }

                    </div>
                </>
                : ""
            }

        </div>
    );
};

export default SearchResults;