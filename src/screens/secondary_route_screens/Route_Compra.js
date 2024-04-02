
import React from 'react';
import Navbar from '../../components/navbar_footer/navbar/Navbar';
import Footer from '../../components/navbar_footer/Footer';
import '../../styles/Main.css';
import Checkout from '../../components/checkout/Checkout';

function Route_Compra() {

    return (
        <div className="product_container_main">
            <Navbar />

            <Checkout/>

            <Footer />
        </div>
    )
}

export default Route_Compra