import React from 'react'
import Navbar from '../components/navbar_footer/navbar/Navbar';
import Footer from '../components/navbar_footer/Footer';
import SignUpForm from '../components/login_signup/signup/SignUpForm';
import '../styles/Main.css';

function Register() {

  return (
    
    <div className="product_container_main">
      <Navbar/>

      <SignUpForm />
      
      <Footer />
      
    </div>

  )
}

export default Register