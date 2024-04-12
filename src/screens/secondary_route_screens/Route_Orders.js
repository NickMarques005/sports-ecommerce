import React, { useEffect, useState } from 'react';
import '../../styles/Main.css';
import Navbar from '../../components/navbar_footer/navbar/Navbar';
import Footer from '../../components/navbar_footer/Footer';
import Orders from '../../components/orders/Orders';
import { UseAuth } from '../../contexts/AuthContext';
import { GetOrders } from '../../services/AuthenticationService';
import { VerifyingAuthorization } from '../../utils/Authorization';
import { useNavigate } from 'react-router-dom';

const Route_Orders = ({ }) => {

    const [orders, setOrders] = useState([]);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [noOrders, SetNoOrders] = useState(false);
    const { authToken } = UseAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (authToken === undefined) {
            console.log("Token ainda não disponível.");
            return;
        }

        console.log("Autorização!!");

        const fetchOrders = async (token) => {
            try {
                const response = await GetOrders(token);
                if (response && response.data) {
                    const ordersData = response.data;
                    console.log("Pedidos: ", ordersData);
                    if(ordersData && ordersData.length === 0)
                    {
                        SetNoOrders(true);
                        return;
                    }
                    setOrders(ordersData);
                    return;
                }

                SetNoOrders(true);
            } catch (err) {
                console.error("Erro ao buscar pedidos: ", err);
                SetNoOrders(true);
            }
        };

        const OrderAuth = async (token) => {
            const isAuthorized = await VerifyingAuthorization(token);
            console.log(isAuthorized);
            if (!isAuthorized) {
                navigate('/login');
                return;
            } else {
                setIsAuthorized(true);
                fetchOrders(token);
            }
        };

        OrderAuth(authToken);

    }, [authToken]);


    return (
        <div className="product_container_main">
            <Navbar />
            <Orders noOrders={noOrders} isAuthorized={isAuthorized} orders={orders} />
            <Footer />
        </div>
    )
}

export default Route_Orders;