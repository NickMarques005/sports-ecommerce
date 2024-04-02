import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Cart.css";
import { useCart, useDispatchCart } from '../../../contexts/CartContext';
import LevelCheckout from '../LevelCheckout';
import CalcPrices from '../../../utils/CalcPrices';
import handleCheckout from '../../../utils/CheckoutHandling';
import "react-multi-carousel/lib/styles.css";
import MobileCart from './MobileCart';
import DesktopCart from './DesktopCart';
import { useDevice } from '../../../contexts/DeviceContext';
import { UseAuth } from '../../../contexts/AuthContext';
import HandleLevelCheckoutPage from '../../../utils/CheckoutHandling';

function Cart(props) {

  let cartData = useCart();
  let dispatch = useDispatchCart();

  const { isMobile } = useDevice();
  const { authToken } = UseAuth();

  let navigate = useNavigate();

  const [totalPrice, setTotalPrice] = useState(null);
  const [totalCondition, setTotalCondition] = useState(null);
  const [totalConditionPrice, setTotalConditionPrice] = useState(null);

  const calculateTotalValues = () => {
    let calculatedTotalPrice = 0;
    let calculatedTotalCondition = 0;
    let calculatedTotalConditionPrice = 0;
    const maxInstallments = 10;
    let totalInstallments = 0;

    Object.values(props.group_data).forEach(data => {
      console.log("DADOS DO PRODUTO: ", data);
      const price = parseFloat(data.final_price.replace(",", "."));
      const condition = data.final_condition;
      if (data.count) {
        if (data.count > 1) {
          let updatedPrice = 0;
          let updatedCondition = 0;
          updatedPrice = CalcPrices.calcTotalPrice(updatedPrice, (price * data.count));
          calculatedTotalPrice = calculatedTotalPrice + updatedPrice;
          if (data.final_condition) {
            updatedCondition = CalcPrices.calcTotalConditionPrice(calculatedTotalCondition, (condition * data.count));
            calculatedTotalCondition = updatedCondition;
          }

        }
        else {
          let first_condition = 0;
          calculatedTotalPrice = CalcPrices.calcTotalPrice(calculatedTotalPrice, price);
          if (data.final_condition) {
            first_condition = CalcPrices.calcTotalConditionPrice(calculatedTotalCondition, condition);
            calculatedTotalCondition = first_condition;

          }
        }
        totalInstallments = Math.min(calculatedTotalCondition, maxInstallments);
      }
    });

    setTotalPrice(CalcPrices.toStringPrice(calculatedTotalPrice));
    setTotalConditionPrice(CalcPrices.toStringPrice(calculatedTotalPrice / totalInstallments));
    setTotalCondition(totalInstallments);
    console.log("TOTAL ITEM PRICES: ", calculatedTotalPrice);
  };

  const handleDecrement = async (productId, size, color) => {
    const indexToRemove = cartData.findIndex(item => item.id === productId && item.size === size && item.color === color);
    if (indexToRemove !== -1) {
      await dispatch({ type: "REMOVE", index: indexToRemove });
      const updatedCartData = cartData.slice();
      updatedCartData.splice(indexToRemove, 1);
      localStorage.setItem('cart', JSON.stringify(updatedCartData));
    }
  };

  const handleIncrement = async (data) => {
    console.log("QUANTIDADE: ", data.id, data.quantity, " COUNT: ", data.count);
    if (data.count < data.quantity) {
      console.log("INCREASING GROUPEDDATA");

      const newItem = {
        id: data.id,
        name: data.name,
        img: data.img,
        init_price: data.init_price,
        final_price: data.final_price,
        final_condition: data.final_condition,
        descount: data.descount,
        size: data.size,
        color: data.color,
        quantity: data.quantity,
        count: data.count
      }

      const updatedCartData = [...cartData, newItem];
      await dispatch({ type: "ADD", item: newItem });
      localStorage.setItem('cart', JSON.stringify(updatedCartData));
    }
  };

  const handleDeleteItems = async (productId, size, color) => {

    const updatedCartData = cartData.filter(item => !(item.id === productId && item.size === size && item.color === color))
    await dispatch({ type: "SET", cart: updatedCartData });
    localStorage.setItem('cart', JSON.stringify(updatedCartData));
  }

  useEffect(() => {
    calculateTotalValues();
  }, [props.group_data]);

  return (

    <>
      {
        Object.values(props.group_data).length > 0 ?
          <>
            <div className="checkout_info_div">
              <div className="checkout_cart_div">
                {
                  isMobile ?

                    <MobileCart groupedData={props.group_data}
                      handleDecrement={handleDecrement}
                      handleIncrement={handleIncrement}
                      handleDeleteItems={handleDeleteItems}
                    />

                    :

                    <DesktopCart groupedData={props.group_data}
                      handleDecrement={handleDecrement}
                      handleIncrement={handleIncrement}
                      handleDeleteItems={handleDeleteItems}
                    />
                }

                <div className="checkout_cartSubPrice_div">
                  <span>Subtotal:</span>
                  <span>R$ {totalPrice ? totalPrice : ""}</span>
                </div>
              </div>
            </div>

            <div className="checkout_cartFinalPrice_div">
              <div className="checkout_summary_div">
                <h2>
                  Resumo
                </h2>
                <div className="checkout_summaryInfo_div">
                  <hr />
                  <div className="checkout_summaryInfo_template">
                    <span>Valor dos produtos</span>
                    <span>R$ {totalPrice ? totalPrice : ""}</span>
                  </div>
                  <hr />
                  <div className="checkout_summaryInfo_template">
                    <span>Desconto</span>
                    <span>{ }</span>
                  </div>
                  <hr />
                </div>
                <div className="checkout_summary_total_div">
                  <div className="checkout_summary_total">
                    <span>Total da compra</span>
                    <span>R$ { }</span>
                  </div>
                  <div className="checkout_summary_condition">
                    <p>ou até {totalCondition ? totalCondition : ""}x de { } sem juros</p>
                  </div>
                </div>
                <hr />

                <div className="checkout_summaryInfo_template">
                  <button onClick={() => {
                    HandleLevelCheckoutPage(navigate, "identifica%C3%A7%C3%A3o", props.page, {cartDataLength: cartData.length}, authToken)
                  }}>Continuar</button>
                </div>
              </div>

              <hr className="checkout_hr_summary_deadline" />

              <div className="checkout_deadline">
                <div className="checkout_deadline_title">
                  <h2>Prazo de entrega</h2>
                </div>
                <div className="checkout_deadline_info">
                  <div className="checkout_deadline_input">
                    <input
                      type="number"
                      placeholder="00000-000"
                      maxLength={8}
                    />
                    <button>Calcular</button>
                  </div>

                  <a target="_blank" href="https://buscacepinter.correios.com.br/app/endereco/index.php">Não sei meu CEP</a>

                </div>
              </div>
            </div>
          </>
          :
          <div className="products_not_found_div">
            <span>Oops! Não há produtos selecionados em seu carrinho. Volte para a página inicial para buscar o que você procura e adicione-o aqui.</span>
          </div>
      }
    </>
  )
}

export default Cart;