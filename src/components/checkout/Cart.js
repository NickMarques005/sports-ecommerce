import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/Checkout.css";
import { useCart, useDispatchCart } from '../../contexts/CartContext';
import LevelCheckout from './LevelCheckout';
import CalcPrices from '../../utils/CalcPrices';
import handleCheckout from '../../utils/CheckoutHandling';
import "react-multi-carousel/lib/styles.css";
import MobileCart from './MobileCart';
import DesktopCart from './DesktopCart';
import { useDevice } from '../../contexts/DeviceContext';
import { UseAuth } from '../../contexts/AuthContext';

function Cart(props) {

  /***********************/
  /* VARIABLES/USESTATES 
  /***********************/

  let cartData = useCart();
  let dispatch = useDispatchCart();

  const { isMobile } = useDevice();
  const { isLogged, authToken } = UseAuth();

  let navigate = useNavigate();
  let currentRoute = window.location.pathname;

  const [groupedData, setGroupedData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(null);
  const [totalCondition, setTotalCondition] = useState(null);
  const [totalConditionPrice, setTotalConditionPrice] = useState(null);


  /*****************/
  /*   FUNCTIONS
  /*****************/

  const calculateTotalValues = () => {
    let calculatedTotalPrice = 0;
    let calculatedTotalCondition = 0;
    let calculatedTotalConditionPrice = 0;
    const maxInstallments = 10;
    let totalInstallments = 0;

    Object.values(groupedData).forEach(data => {
      console.log(data.final_price);
      const price = parseFloat(data.final_price.replace(",", "."));
      const condition = data.final_condition;
      if (data.count) {
        console.log("FINAL PRICE: ", data.final_price);
        if (data.count > 1) {
          let updatedPrice = 0;
          let updatedCondition = 0;
          console.log("DATA COUNT: ", data.count);
          updatedPrice = CalcPrices.calcTotalPrice(updatedPrice, (price * data.count));
          calculatedTotalPrice = calculatedTotalPrice + updatedPrice;
          if (data.final_condition) {
            updatedCondition = CalcPrices.calcTotalConditionPrice(calculatedTotalCondition, (condition * data.count));
            calculatedTotalCondition = updatedCondition;
            console.log("CONDITION WITH COUNT: ", condition * data.count);
          }

        }
        else {
          let first_condition = 0;
          calculatedTotalPrice = CalcPrices.calcTotalPrice(calculatedTotalPrice, price);
          if (data.final_condition) {
            first_condition = CalcPrices.calcTotalConditionPrice(calculatedTotalCondition, condition);
            calculatedTotalCondition = first_condition;
            console.log("CONDITION 1: ", condition);
          }
        }
        console.log("TOTAL CONDITION PRICE: ", calculatedTotalConditionPrice);
        console.log("TOTAL CONDITION: ", calculatedTotalCondition);
        console.log("TOTAL PRICE: ", calculatedTotalPrice);
        totalInstallments = Math.min(calculatedTotalCondition, maxInstallments);
      }
    });

    setTotalPrice(CalcPrices.toStringPrice(calculatedTotalPrice));
    setTotalConditionPrice(CalcPrices.toStringPrice(calculatedTotalPrice / totalInstallments));
    setTotalCondition(totalInstallments);
    console.log(calculatedTotalPrice);


  };

  const handleDecrement = async (productId, size, color) => {
    const key = `${productId}-${size}-${color}`;

    if (groupedData[key].count > 0) {
      const updatedgroupedData = {
        ...groupedData,
        [key]: {
          ...groupedData[key],
          count: groupedData[key].count - 1
        }
      };
      setGroupedData(updatedgroupedData);
    }

    const indexToRemove = cartData.findIndex(item => item.id === productId && item.size === size && item.color === color);
    if (indexToRemove !== -1) {
      await dispatch({ type: "REMOVE", index: indexToRemove });
      const updatedCartData = cartData.slice();
      updatedCartData.splice(indexToRemove, 1);
      localStorage.setItem('cart', JSON.stringify(updatedCartData));
    }
  };

  const handleIncrement = async (data) => {
    console.log("QUANTIDADE: ", data.quantity, " COUNT: ", data.count);
    if (data.count < data.quantity) {
      const key = `${data.id}-${data.size}-${data.color}`;
      const updatedgroupedData = {
        ...groupedData,
        [key]: {
          ...groupedData[key],
          count: groupedData[key].count + 1
        }
      };

      setGroupedData(updatedgroupedData);

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
      await dispatch({ type: "ADD", ...newItem });
      localStorage.setItem('cart', JSON.stringify(updatedCartData));
    }
  };

  console.log("ROUTE: ", props.route);

  const handleDeleteItems = async (productId, size, color) => {
    const key = `${productId}-${size}-${color}`;

    if (groupedData[key].count > 0) {
      const updatedgroupedData = {
        ...groupedData,
        [key]: {
          ...groupedData[key],
          count: groupedData[key].count - groupedData[key].count
        }
      };
      setGroupedData(updatedgroupedData);
    }

    const updatedCartData = cartData.filter(item => !(item.id === productId && item.size === size && item.color === color))
    await dispatch({ type: "SET", cart: updatedCartData });
    localStorage.setItem('cart', JSON.stringify(updatedCartData));
  }

  const handleNext = (page) => {
    if (isLogged && authToken) {
      if (groupedData.length !== 0) {
        console.log("TEM ITEM")

      }

      return;
    }

    navigate("/login");
  }

  useEffect(() => {
    calculateTotalValues();
  }, [groupedData]);


  useEffect(() => {
    setGroupedData(props.group_data);
  }, [groupedData]);

  return (
    <div className="cartPage_div">

      <div className="checkoutProduct_main_div">

        <LevelCheckout page={props.route} />

        <div className="checkout_info_div">
          <div className="checkout_cart_div">


            {
              isMobile ?

                <MobileCart groupedData={groupedData}
                  handleDecrement={handleDecrement}
                  handleIncrement={handleIncrement}
                  handleDeleteItems={handleDeleteItems}
                  group_data={props.group_data} />

                :

                <DesktopCart groupedData={groupedData}
                  handleDecrement={handleDecrement}
                  handleIncrement={handleIncrement}
                  handleDeleteItems={handleDeleteItems}
                  group_data={props.group_data} />
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
              <div className="checkout_summaryInfo_template">
                <span>Frete</span>
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
                handleCheckout(navigate, currentRoute, cartData, "next", authToken)
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

      </div>
    </div>
  )
}

export default Cart;