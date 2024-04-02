import React, { useState, useEffect } from 'react'
import Cart from '../../components/checkout/cart/Cart';
import Identification from '../../components/checkout/identification/Identification';
import Payment from '../../components/checkout/payment/Payment';
import { useCart } from '../../contexts/CartContext';
import CalcPrices from '../../utils/CalcPrices';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './Checkout.css';
import LevelCheckout from './LevelCheckout';

const Checkout = () => {

    let cartData = useCart();
    const [currentCheckoutPage, setCurrentCheckoutPage] = useState("carrinho");
    const location = useLocation();

    const [groupedCartData, setGroupedCartData] = useState({});
    const [totalPrice, setTotalPrice] = useState(null);
    const [totalCondition, setTotalCondition] = useState(null);
    const [totalConditionPrice, setTotalConditionPrice] = useState(null);

    console.log(cartData);

    const calculateTotalValues = () => {
        let calculatedTotalPrice = 0;
        let calculatedTotalCondition = 0;
        let calculatedTotalConditionPrice = 0;
        const maxInstallments = 10;
        let totalInstallments = 0;

        console.log("PRODUTOS GROUPED CART DATA: ", groupedCartData);

        Object.values(groupedCartData).forEach(data => {
            console.log(data.final_price);
            const price = parseFloat(data.final_price.replace(",", "."));
            const condition = data.final_condition;
            if (data.count) {
                if (data.count > 1) {
                    let updatedPrice = 0;
                    let updatedCondition = 0;
                    console.log("DATA COUNT: ", data.count);
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
                        console.log("CONDITION 1: ", condition);
                    }
                }
                console.log("TOTAL PRICE: ", calculatedTotalPrice);
                totalInstallments = Math.min(calculatedTotalCondition, maxInstallments);
            }
        });

        setTotalPrice(CalcPrices.toStringPrice(calculatedTotalPrice));
        setTotalConditionPrice(CalcPrices.toStringPrice(calculatedTotalPrice / totalInstallments));
        setTotalCondition(totalInstallments);

    };

    useEffect(() => {
        const groupedData = cartData.reduce((groups, data) => {
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

    const handleCheckout = () => {
        const currentRoute = window.location.pathname;
        switch (currentRoute) {
            case "/compra/carrinho":
                return (
                    <Cart group_data={groupedCartData} page={currentCheckoutPage}/>
                )

            case "/compra/identifica%C3%A7%C3%A3o":
                return (
                    <Identification group_data={groupedCartData} page={currentCheckoutPage}/>
                )

            case "/compra/pagamento":
                return (
                    <Payment group_data={groupedCartData} page={currentCheckoutPage}/>
                )
        }
    }

    useEffect(() => {
        const path = location.pathname;
        if(path.includes("/compra/carrinho")) {
            setCurrentCheckoutPage("carrinho");
        }
        else if(path.includes("/compra/identifica%C3%A7%C3%A3o")){
            setCurrentCheckoutPage("identificação");
        }
        else if(path.includes("/compra/pagamento")){
            setCurrentCheckoutPage("pagamento");
        }

        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div className="cartPage_div">
            <div className="checkoutProduct_main_div">
                <LevelCheckout page={currentCheckoutPage} setPage={setCurrentCheckoutPage} />
                {
                    handleCheckout()
                }
            </div>
        </div>
    )
}

export default Checkout