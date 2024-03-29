import React, {useState, useEffect} from 'react'
import Navbar from '../../components/navbar_footer/navbar/Navbar';
import Footer from '../../components/navbar_footer/Footer';
import Page from '../../components/page_template/Page';
import '../../styles/Main.css';


function Route_Calcados() {

  const data = {name: 'calcados'};

  return (
    <div className="product_container_main">
      <Navbar/>

      <Page data={data} />

      
      <Footer />
      
    </div>
  )
};

export default Route_Calcados;