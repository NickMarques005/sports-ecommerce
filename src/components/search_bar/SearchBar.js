import React from 'react';
import { IoSearch } from 'react-icons/io5';

const SearchBar = ({ search, handleChangeSearchInput, handleMobileSearch, resultsData, handleSearchKeyPress, isMobile }) => {
    return (
        <div className={`input_section ${resultsData.length === 0 ? "" : "activeshadow"}`}>
            {
                !isMobile ?
                    <>
                        <input
                            className="input_search"
                            maxLength="32"
                            type="text"
                            placeholder="Buscar"
                            value={search}
                            onChange={(e) => handleChangeSearchInput(e)}
                            onKeyDown={handleSearchKeyPress}
                        />
                        <IoSearch className="icon_scale icon_search" />
                    </>
                    :
                    <button onClick={handleMobileSearch} className="search button">
                        <IoSearch className="icon_scale icon_search" />
                    </button>


            }

        </div>
    );
};

export default SearchBar;