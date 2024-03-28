
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar_footer/Navbar';
import Footer from '../../components/navbar_footer/Footer';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../../styles/Main.css';
import Cart from '../../components/checkout/Cart';
import Identification from '../../components/checkout/Identification';
import Payment from '../../components/checkout/Payment';
import { useCart, useDispatchCart } from '../../contexts/CartContext';
import CalcPrices from '../../utils/CalcPrices';

function Route_Compra() {

    let cartData = useCart();
    let dispatch = useDispatchCart();

    let navigate = useNavigate();

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
                    if(data.final_condition)
                    {
                        updatedCondition =  CalcPrices.calcTotalConditionPrice(calculatedTotalCondition, (condition * data.count));
                        calculatedTotalCondition = updatedCondition;
                        console.log("CONDITION WITH COUNT: ", condition * data.count);
                    }
                    
                }
                else {
                    let first_condition = 0;
                    calculatedTotalPrice = CalcPrices.calcTotalPrice(calculatedTotalPrice, price);
                    if(data.final_condition)
                    {
                        first_condition = CalcPrices.calcTotalConditionPrice(calculatedTotalCondition, condition);
                        calculatedTotalCondition = first_condition;
                        console.log("CONDITION 1: ", condition );
                    }
                }
                console.log("TOTAL CONDITION PRICE: ", calculatedTotalConditionPrice);
                console.log("TOTAL CONDITION: ", calculatedTotalCondition);
                console.log("TOTAL PRICE: ", calculatedTotalPrice);
                totalInstallments = Math.min(calculatedTotalCondition, maxInstallments);
            }
        });

        setTotalPrice(CalcPrices.toStringPrice(calculatedTotalPrice));
        setTotalConditionPrice(CalcPrices.toStringPrice(calculatedTotalPrice/totalInstallments));
        setTotalCondition(totalInstallments);
        console.log(calculatedTotalPrice);
        
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
        switch (currentRoute){
            case "/compra/carrinho":
                return (
                    <Cart group_data={groupedCartData} route={"carrinho"}/>
                )
            
            case "/compra/identifica%C3%A7%C3%A3o":
                return (
                    <Identification group_data={groupedCartData} route={"identificação"}/>
                    )
                
            case "/compra/pagamento":
                return (
                    <Payment group_data={groupedCartData} route={"pagamento"}/>
                    )
        }
    }

    useEffect(() => {

    })

    return (
        <div className="product_container_main">
            <Navbar />

            {
                handleCheckout()
            }
            <Footer />
        </div>
    )
}

export default Route_Compra