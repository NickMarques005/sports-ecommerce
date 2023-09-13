//---BuyProductData.js---//
import { URL } from "../../App";

export const BuyProductData = (idData) => {
    return fetch(`${URL}/api/filterIdData`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: idData })
    })
        .then((res) => res.json())
        .then((json) => {
            //console.log("Id Product Result: ");
            //console.log(json);
            return json;
        })
        .catch((err) =>
            console.log("Error: ", err)      
        )
}