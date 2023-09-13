import React, {useState} from 'react';
import Navbar from '../components/navbar_footer/Navbar';
import Footer from '../components/navbar_footer/Footer';
import '../styles/Home.css';
import '../styles/Main.css';
import MainPage from '../components/main_page/MainPage';

export default function Home() {

  /*****************/
  /*  RENDER HOME
  /*****************/
  return (

      <div className="product_container_main">
        <Navbar/>
        
        <MainPage />

        <Footer />
        </div>

        
    
  )
}

