import React from 'react'
import Navbar from '../../components/navbar_footer/Navbar';
import Footer from '../../components/navbar_footer/Footer';
import '../../styles/Main.css';
import Page from '../../components/page_template/Page';


function Route_Acessórios() {

  const data = {name: 'acessorios'};

  return (
    <div className="product_container_main">
      <Navbar/>

      <Page data={data} />
      
      <Footer />
      
    </div>
  )
}

export default Route_Acessórios