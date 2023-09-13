//---SearchFunction.js---//
import { URL } from "../../App";

export const SearchFunction = (searchData) => {
    return fetch(`${URL}/api/filterSearchData`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ search: searchData })
    })
        .then((res) => res.json())
        .then((json) => {
            //console.log("Search Results: ");
            //console.log(json);
            return json;
        })
        .catch((err) =>
            console.log("Error: ", err)
            
        )
}