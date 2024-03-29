import React from 'react'
import Navbar from '../../components/navbar_footer/navbar/Navbar';
import Footer from '../../components/navbar_footer/Footer';
import '../../styles/Main.css';
import Page from '../../components/page_template/Page';

function Route_Equipamentos() {

  const data = {name: 'equipamentos'};

  return (
    <div className="product_container_main">
      <Navbar/>

      <Page data={data} />

      <Footer />
      
    </div>
  )
}

export default Route_Equipamentos