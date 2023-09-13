//---ProductsData.js---//
import { URL } from "../../App";

const ProductsData = async () => {
    try {
        let response = await fetch(`${URL}/api/productsData`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        return data;
    } catch (err) {
        console.log("Error fetching products data: ", err);
        return null;
    }


}

export default ProductsData;