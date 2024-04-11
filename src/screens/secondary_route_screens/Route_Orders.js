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
    const { authToken } =  UseAuth();

    const navigate = useNavigate();

    useEffect(() => {

        const fetchOrders = async (token) => {
            try{
                const response = await GetOrders(token);
                if(response && response.data)
                {
                    const ordersData = response.data;
                    console.log("Pedidos: ", ordersData);
                    setOrders(ordersData);
                }
            }
            catch (err)
            {
                console.error("Erro ao buscar pedidos: ", err);
            }
        }

        const isAuthorized = VerifyingAuthorization(authToken);
        if(!isAuthorized)
        {
            navigate("/login");
            return;
        }
        else{
            fetchOrders(authToken);
        }

    }, [authToken]);


    return (
        <div className="product_container_main">
            <Navbar />
            <Orders orders={orders}/>
            <Footer />
        </div>
    )
}

export default Route_Orders;