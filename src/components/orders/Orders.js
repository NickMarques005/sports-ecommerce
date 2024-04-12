import React from 'react';
import './Orders.css';
import LoadingScreen from '../loading/LoadingScreen';

const Orders = ({ orders, isAuthorized, noOrders }) => {

    const calculateTotalPrice = (products) => {
        return products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    }

    const countTotalItems = (products) => {
        return products.reduce((acc, product) => acc + product.quantity, 0)
    }

    return (
        <div className="pageOrders_div">
            <div className="orders_container">
                <div className="order_title_div">
                    <h2>Meus Pedidos</h2>
                </div>

                {
                    orders.length !== 0 && !noOrders ?
                        <div className="orders_list">
                            <table className="orders_table">
                                <thead>
                                    <tr>
                                        <th>Pedido</th>
                                        <th>Preço</th>
                                        <th>Itens</th>
                                        <th>CEP</th>
                                        <th>Data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, index) => (
                                        <tr className="order_card" key={order._id}>
                                            <td>#{index + 1}</td>
                                            <td>R$ {calculateTotalPrice(order.products).toFixed(2)}</td>
                                            <td>{countTotalItems(order.products)}</td>
                                            <td>{order.identityData.cep_number}</td>
                                            <td>{new Date(order.createdAt).toLocaleDateString('pt-BR')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        : noOrders ?
                            <div className="no_orders_found_div">
                                <h2>
                                    Nenhum pedido encontrado...
                                </h2>
                            </div>
                            : <LoadingScreen />
                }
            </div>
        </div>
    )
}

export default Orders