import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import LevelCheckout from '../LevelCheckout';
import "./Payment.css";

function Payment(props) {

  /***********************/
  /* VARIABLES/USESTATES 
  /***********************/

  let navigate = useNavigate();

  console.log("PROPS IDENTIFY!!!", props.cart_data);

  /*****************/
  /*    USEFFECTS 
  /*****************/

  useEffect(() => {
    if (props.group_data.length == 0) {
      navigate("/compra/");
    }
  })

  return (
        <div className="payment_div">
          
          <div className="paymentOptions_div">
            <div className="paymentOption_template">
              <div className="payment_option"></div>
              <div className="payment_option_info"></div>
            </div>
            <div className="paymentOption_template">
              <div className="payment_option"></div>
              <div className="payment_option_info"></div>
            </div>
            <div className="paymentOption_template">
              <div className="payment_option"></div>
              <div className="payment_option_info"></div>
            </div>
          </div>

          <div className="paymentSummary_div">
            <div className="paymentSummary_title_div">
              <h2>Resumo do pedido</h2>
            </div>

            <div className="paymentSummary_info_div">
              <div className="paymentSummary_info">
                <span>Total em produtos {`( itens)`}</span>
                <span>R$ {}</span>
              </div>

              <div className="paymentSummary_info">
                <span>Frete</span>
                <span>R$ {}</span>
              </div>
              
              <div className="paymentSummary_info">
                <span>Você está economizando</span>
                <span>R$ {}</span>
              </div>

              <div className="paymentSummary_total_div">
                <h3></h3>
                <div className="paymentSummary_totalInfo">
                  <span>R$ {}</span>
                  <p>em até 8x de R$ {}</p>
                </div>
              </div>
            </div>

            <div className="paymentSummary_finish">
              <button>Finalizar Compra</button>
            </div>
          </div>
        
        </div>
  )
}

export default Payment;
