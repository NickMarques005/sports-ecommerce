import React from 'react';
import Navbar from '../../components/navbar_footer/Navbar';
import Footer from '../../components/navbar_footer/Footer';
import '../../styles/Main.css';
import BuyProduct from '../../components/product_template/BuyProduct';

function Route_Product() {
    return (
        <div className="product_container_main">
            <Navbar />

            <BuyProduct />

            <Footer />

        </div>
    )
}

export default Route_Product