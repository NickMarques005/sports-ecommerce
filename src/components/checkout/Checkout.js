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
    const [subTotal, setSubTotal] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalCondition, setTotalCondition] = useState(null);
    const [totalConditionPrice, setTotalConditionPrice] = useState(0);
    const [discountValue, setDiscountValue] = useState(0);


    const calculateTotalValues = () => {
        let tempSubTotal = 0;
        let tempTotalPrice = 0;
        let tempDiscountValue = 0;

        let calculatedTotalCondition = 0;
        let calculatedTotalConditionPrice = 0;
        const maxInstallments = 10;

        Object.values(groupedCartData).forEach(item => {
            const initPrice = parseFloat(item.init_price.replace(",", "."));
            const finalPrice = parseFloat(item.final_price.replace(",", "."));
            const condition = item.final_condition;
            const quantity = item.count;

            tempSubTotal += initPrice * quantity;
            tempTotalPrice += finalPrice * quantity;

            if (condition) {
                calculatedTotalCondition += condition * quantity;
            }
        });

        tempDiscountValue = tempSubTotal - tempTotalPrice;

        let totalInstallments = Math.min(calculatedTotalCondition, maxInstallments);
        calculatedTotalConditionPrice = tempTotalPrice / totalInstallments;

        setSubTotal(tempSubTotal.toFixed(2));
        setTotalPrice(tempTotalPrice.toFixed(2));
        setDiscountValue(tempDiscountValue.toFixed(2));

        if (totalInstallments !== 0);
        {
            setTotalCondition(totalInstallments);
            setTotalConditionPrice(calculatedTotalConditionPrice.toFixed(2));
        }

    };

    useEffect(() => {
        calculateTotalValues();
    }, [groupedCartData]);

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

    const handleCheckout = () => {
        const currentRoute = window.location.pathname;
        switch (currentRoute) {
            case "/compra/carrinho":
                return (
                    <Cart group_data={groupedCartData} page={currentCheckoutPage} prices={{subTotal, totalPrice, totalCondition, totalConditionPrice, discountValue}} />
                )

            case "/compra/identifica%C3%A7%C3%A3o":
                return (
                    <Identification group_data={groupedCartData} page={currentCheckoutPage} />
                )

            case "/compra/pagamento":
                return (
                    <Payment group_data={groupedCartData} page={currentCheckoutPage} prices={{subTotal, totalPrice, totalCondition, totalConditionPrice, discountValue}} />
                )
        }
    }

    useEffect(() => {
        const path = location.pathname;
        if (path.includes("/compra/carrinho")) {
            setCurrentCheckoutPage("carrinho");
        }
        else if (path.includes("/compra/identifica%C3%A7%C3%A3o")) {
            setCurrentCheckoutPage("identificação");
        }
        else if (path.includes("/compra/pagamento")) {
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