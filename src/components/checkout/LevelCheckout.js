import React, {useState, useEffect} from 'react';
import "../../styles/Checkout.css";
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import handleCheckoutPageFunc from '../component_functions/handleCheckoutPageFunc';


function LevelCheckout(props) {

    /***********************/
    /* VARIABLES/USESTATES 
    /***********************/

    let cartData = useCart();
    let navigate = useNavigate();

    const [checkoutPage, setCheckoutPage] = useState("");

    /*****************/
    /*   FUNCTIONS
    /*****************/
    
    const handlePageChange = (page) => {
        
        if(page === props.page)
        {
            console.log("SAME PAGE");
            return;
        }
        else{
            if(cartData.length === 0)
            {
                if(page != "carrinho")
                {   
                    navigate(`/compra/${page}`);
                }
                else{
                    navigate("/login");
                }
            }
            
            else{
                navigate(`/compra/${page}`);
            }
        }
        
    }

    /*****************/
    /*   USEEFFECTS
    /*****************/

    useEffect(() => {
        setCheckoutPage(props.page);
    }, [checkoutPage]);
    
    return (
        <div className="level_checkout_div">
            <div className={`level_checkout_template ${checkoutPage == "carrinho" ? "next" : "off"}`}>
                <button className="level_number_div" onClick={() => {handlePageChange("carrinho")}}><span>1</span></button>
                <span>Carrinho</span>
            </div>
            <div className={`level_checkout_template ${checkoutPage == "identificação" ? "next" : "off"}`}>
                <button className="level_number_div" onClick={() => {handlePageChange("identifica%C3%A7%C3%A3o")}}><span>2</span></button>
                <span>Identificação</span>
            </div>
            <div className={`level_checkout_template ${checkoutPage == "pagamento" ? "next" : "off"}`}>
                <button className="level_number_div" onClick={() => {handlePageChange("pagamento")}}><span>3</span></button>
                <span>Pagamento</span>
            </div>
        </div>
    )
}

export default LevelCheckout