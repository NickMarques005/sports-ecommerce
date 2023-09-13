import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LevelCheckout from './LevelCheckout';
import "../../styles/Checkout.css";

function Identification(props) {

    /***********************/
    /* VARIABLES/USESTATES 
    /***********************/

    let navigate = useNavigate();

    console.log("PROPS IDENTIFY!!!", props.cart_data);

    /*****************/
    /*    USEFFECTS 
    /*****************/

    useEffect(() => {
        if (props.group_data.length === 0) {
            navigate("/compra/");
        }
    }, [props.cart_data, navigate])


    /*****************/
    /*    RENDER 
    /*****************/

    return (
        <div className="cartPage_div">

            <div className="checkoutProduct_main_div">

                <LevelCheckout page={props.route} />

                <div className="checkout_identificationInfo_div">
                    <div className="checkout_personalData_div">
                        <div className="checkout_personalData_title">
                            <h2>Dados Pessoais</h2>
                        </div>
                        <div className="checkout_personalData_template_div">
                            <div className="checkout_personalData_info">
                                <div className="checkout_personalData_name"></div>
                                <div className="checkout_personalData_input"></div>
                            </div>
                            <div className="checkout_personalData_info">
                                <div className="checkout_personalData_name"></div>
                                <div className="checkout_personalData_input"></div>
                            </div>
                        </div>

                        <div className="checkout_personalData_template_div">
                            <div className="checkout_personalData_info">
                                <div className="checkout_personalData_name"></div>
                                <div className="checkout_personalData_input"></div>
                            </div>
                            <div className="checkout_personalData_info">
                                <div className="checkout_personalData_name"></div>
                                <div className="checkout_personalData_input"></div>
                            </div>
                        </div>

                        <div className="checkout_personalData_template_div">
                            <div className="checkout_personalData_info">
                                <div className="checkout_personalData_name"></div>
                                <div className="checkout_personalData_input"></div>
                            </div>
                            <div className="checkout_personalData_info">
                                <div className="checkout_personalData_name"></div>
                                <div className="checkout_personalData_input"></div>
                            </div>
                        </div>

                        <div className="checkout_personalData_next">
                            <button>Ir para pagamento</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        )
}

                    export default Identification