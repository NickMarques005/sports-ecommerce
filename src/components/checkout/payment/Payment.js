import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { IoCart, IoMenuOutline, IoHeart } from 'react-icons/io5';
import "./Payment.css";
import { UseIdentification } from '../../../contexts/IdentificationContext';
import { HandleIdentityValidation } from '../../../utils/Validation';
import { loadStripe } from '@stripe/stripe-js';
import { stripeKey } from '../../../App';
import { PurchaseItems } from '../../../services/AuthenticationService';
import { UseAuth } from '../../../contexts/AuthContext';
import Lottie from 'lottie-react';
import LoadingData from '../../../imgs/loading_gif.json';

function Payment(props) {

  let navigate = useNavigate();
  const { authToken } = UseAuth();
  const { identificationData } = UseIdentification();
  const [paymentLoading, setPaymentLoading] = useState(false);

  const Purchase = async (cart, identityData) => {

    const items = Object.values(cart).map(product => ({
      id: product.id,
      name: product.name,
      quantity: product.count,
      image: product.img,
      price: product.final_price
    }));

    console.log("Stripe Key: ", stripeKey);
    if (!stripeKey) {
      return console.error("Chave do Stripe não providenciada! ");
    }

    setPaymentLoading(true);

    const response = await PurchaseItems(items, identityData, authToken);

    if (response && response.success) {
      const sessionId = response.data.id;
      const stripe = await loadStripe(stripeKey);
      stripe.redirectToCheckout({ sessionId: sessionId });
      setPaymentLoading(false);
    }
    else {
      setPaymentLoading(false);
      console.error("Erro ao iniciar processo de compra: ", response);
    }
  }

  useEffect(() => {
    const { success } = HandleIdentityValidation(identificationData);
    if (props.group_data.length === 0 || !success) {
      navigate("/compra/");
    }
  }, []);

  return (
    <div className="payment_div">

      <div className="paymentProducts_div">
        {
          props.group_data.length !== 0 ?
            <ul>
              {
                Object.values(props.group_data).map((item, index) => (
                  <li key={`${item.id}-${index}`} className="paymentProduct_item">
                    <img src={`/product_imgs/${item.img}`} alt={item.name} className="paymentProduct_img" />
                    <div className="paymentProduct_count">
                      <p>
                        {item.count}
                      </p>
                    </div>
                  </li>
                ))
              }
            </ul>
            : ""
        }
        <div className="paymentProducts_cartIcon_div">
          <IoCart className="cartIcon" />
        </div>
      </div>

      <div className="paymentSummary_div">
        <div className="paymentSummary_title_div">
          <h2>Resumo do pedido</h2>
        </div>

        <div className="paymentSummary_info_div">
          <div className="paymentSummary_info">
            <span>Total em produtos {`( itens)`}</span>
            <span>R$ {props.prices.subTotal}</span>
          </div>

          <div className="paymentSummary_info">
            <span>Frete</span>
            <span>R$ {`0.00`}</span>
          </div>

          <div className="paymentSummary_info">
            <span>Você está economizando</span>
            <span>R$ {props.prices.discountValue}</span>
          </div>

          <div className="paymentSummary_total_div">
            <h3>Valor:</h3>

            <div className="paymentSummary_totalInfo">
              <span>R$ {props.prices.totalPrice}</span>
              {
                props.prices.totalCondition && props.prices.totalConditionPrice !== 0 ?
                  <p>em até {props.prices.totalCondition}x de R$ {props.prices.totalConditionPrice}</p>
                  : ""
              }

            </div>

          </div>
        </div>

        <div className="paymentSummary_finish">
          <button onClick={() => Purchase(props.group_data, identificationData)}>
            {
              paymentLoading ? <Lottie animationData={LoadingData} loop={true} style={{ height: '100%' }} />
              :
              <span>
                Finalizar Compra
              </span>}
          </button>
        </div>
      </div>

    </div>
  )
}

export default Payment;
