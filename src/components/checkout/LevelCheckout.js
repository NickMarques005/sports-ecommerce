import React, { useState, useEffect } from 'react';
import "./LevelCheckout.css";
import { useCart } from '../../contexts/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import HandleLevelCheckoutPage from '../../utils/CheckoutHandling';
import { UseAuth } from '../../contexts/AuthContext';
import { VerifyToken } from '../../services/AuthenticationService';
import { UseIdentification } from '../../contexts/IdentificationContext';


function LevelCheckout(props) {

    const { authToken } = UseAuth();
    let cartData = useCart();
    const { identificationData } = UseIdentification();
    let navigate = useNavigate();

    return (
        <div className="level_checkout_div">
            <div className={`level_checkout_template ${props.page == "carrinho" ? "next" : "off"}`}>
                <button className="level_number_div" onClick={() => { HandleLevelCheckoutPage(navigate, "carrinho", props.page, {cartDataLength: cartData.length}, authToken) }}><span>1</span></button>
                <span>Carrinho</span>
            </div>
            <div className={`level_checkout_template ${props.page == "identificação" ? "next" : "off"}`}>
                <button className="level_number_div" onClick={() => { HandleLevelCheckoutPage(navigate, "identifica%C3%A7%C3%A3o", props.page, {cartDataLength: cartData.length}, authToken) }}><span>2</span></button>
                <span>Identificação</span>
            </div>
            <div className={`level_checkout_template ${props.page == "pagamento" ? "next" : "off"}`}>
                <button className="level_number_div" onClick={() => { HandleLevelCheckoutPage(navigate, "pagamento", props.page, {cartDataLength: cartData.length, identificationData: identificationData}, authToken) }}><span>3</span></button>
                <span>Pagamento</span>
            </div>
        </div>
    )
}

export default LevelCheckout;