import React from 'react'
import Navbar from '../components/navbar_footer/navbar/Navbar';
import Footer from '../components/navbar_footer/Footer';
import LoginForm from '../components/login_signup/login/LoginForm';
import '../styles/Main.css';

function Login() {

  return (
    <div className="product_container_main">
      <Navbar/>

      <LoginForm />
      
      <Footer />
      
    </div>
  )
}

export default Login