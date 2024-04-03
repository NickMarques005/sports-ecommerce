import React, { useState, useEffect } from 'react';
import '../../styles/CartModal.css';
import CalcPrices from '../../utils/CalcPrices';
import { useNavigate } from 'react-router-dom';
import { useCart, useDispatchCart } from '../../contexts/CartContext';
import CartPageFunc from '../../utils/CheckoutHandling';
import HandleLevelCheckoutPage from '../../utils/CheckoutHandling';

function CartModal(props) {

    let cartData = useCart();
    let dispatch = useDispatchCart();

    let navigate = useNavigate();
    let currentPage = window.location.pathname;

    const [groupedCartData, setGroupedCartData] = useState({});
    const [totalPrice, setTotalPrice] = useState(null);
    const [totalCondition, setTotalCondition] = useState(null);
    const [totalConditionPrice, setTotalConditionPrice] = useState(null);

    const calculateTotalValues = () => {
        let calculatedTotalPrice = 0;
        let calculatedTotalCondition = 0;
        let calculatedTotalConditionPrice = 0;
        const maxInstallments = 10;
        let totalInstallments = 0;

        Object.values(groupedCartData).forEach(data => {
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

    useEffect(() => {
        
            const groupedData = cartData.reduce((groups, data) => {
                console.log("DATA DO CART: ", data.id);
                const key = `${data.id}-${data.size}-${data.color}`;
                if (!groups[key]) {
                    groups[key] = {
                        ...data,
                        count: 0
                    };
                }
                groups[key].count += 1;
                return groups;
            }, {});
    
            setGroupedCartData(groupedData);
    }, [cartData]);
    

    useEffect(() => {
        calculateTotalValues();
    }, [groupedCartData]);


    const handleDecrement = async (productId, size, color) => {
        const key = `${productId}-${size}-${color}`;

        if (groupedCartData[key].count > 0) {
            const updatedGroupedCartData = {
                ...groupedCartData,
                [key]: {
                    ...groupedCartData[key],
                    count: groupedCartData[key].count - 1
                }
            };
            setGroupedCartData(updatedGroupedCartData);
        }

        console.log(cartData);

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

            const updatedGroupedCartData = {
                ...groupedCartData,
                [key]: {
                    ...groupedCartData[key],
                    count: groupedCartData[key].count + 1
                }
            };

            setGroupedCartData(updatedGroupedCartData);

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

    return (
        <div className={`cartModal_dontTouch ${!props.cart_view ? "off" : ""}`}>
            <div className={`cartModal_main_div ${props.cart_view ? "on" : "off"}`} {...props.mouseEvents}>

                <div className={`cartModal_structure_div`}>

                    {cartData && cartData.length !== 0 ?
                        <div className="cartModal_hasProduct_div">
                            <div className="cartModal_listProducts_div">
                                <div className="cartModal_lengthProducts_div">
                                    <h1>Há {cartData.length !== 0 ? cartData.length : 0} itens no carrinho</h1>
                                </div>

                                <ul>
                                    {groupedCartData ?
                                        Object.values(groupedCartData).map((data, key) => {

                                            return (
                                                <li key={key}>
                                                    <div className="cartItem_img">
                                                        <img src={`/product_imgs/${data.img}`} alt={`${data.name}_image`} />
                                                    </div>
                                                    <div className="cartItem_modalInfo">
                                                        <span className="cartItem_name">{data.name}</span>
                                                        <span>Tamanho: {data.size}</span>
                                                        <span>Cor: {data.color}</span>
                                                    </div>
                                                    <div className="cartItem_quantity">
                                                        <button className="cartItem_buttonMinus" onClick={() => handleDecrement(data.id, data.size, data.color)}>-</button>
                                                        <div className="cartItem_quantityValue_div">
                                                            <span>{data.count}</span>
                                                        </div>
                                                        <button className="cartItem_buttonPlus" onClick={() => handleIncrement(data)}>+</button>
                                                    </div>
                                                    <div className="cartItem_price">
                                                        <span>R${data.final_price}</span>
                                                    </div>
                                                </li>
                                            )


                                        })

                                        : ""
                                    }
                                </ul>
                            </div>
                            <div className="cartModal_finalPrice_div">
                                <div className="cartModal_totalValue_div">
                                    <span>Preço Total: </span>
                                    <div className="cartModal_infoTotalValue_div">
                                        <span>R$ {totalPrice ? totalPrice : ""}</span>
                                        {totalCondition ?
                                            <p>ou até em {totalCondition ? totalCondition : ""}x R$ {totalConditionPrice ? totalConditionPrice : ""} </p>
                                            : ""}
                                    </div>
                                </div>
                                <div className="cartModal_purchaseButton">
                                    <button onClick={() => HandleLevelCheckoutPage(navigate, "carrinho", currentPage, {cartDataLength: cartData.length})}>
                                        Ir para o carrinho
                                    </button>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="cartModal_noProduct_div">
                            <h1>Seu carrinho está vazio</h1>
                            <p>No momento seu carrinho permanece sem produto. Pesquise no nosso site produtos que lhe interessam e eles aparecerão aqui! ;)</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default CartModal