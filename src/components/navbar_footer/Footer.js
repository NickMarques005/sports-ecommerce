import React from 'react';
import {IoLogoFacebook, IoLogoTiktok, IoLogoWhatsapp, IoLogoInstagram, IoLogoTwitter, IoAdd } from 'react-icons/io5';
import '../../styles/Footer.css';
import payment from '../../imgs/payment.png';


function Footer() {
  const openOption = (option) => {
    const screenWidth = window.innerWidth;
    if(screenWidth < 850){
      const option_id = document.getElementById(option);

      if(option){
        option_id.classList.toggle('active');
      }
      console.log(screenWidth);
    }
    else{
      return;
    }
    
  }

  /*****************/
  /*    RENDER 
  /*****************/

  return (
    <div className="footer_screen">
      <div className="footer_content_div">        
        
        <div className="footer_content">
          <div className="footer_store_info">
            <nav className="footer_store_option">
              <div className="footer_button_option_store" onClick={() => openOption("nossaloja_id")}>
                <h4>Nossa Loja</h4>
                <IoAdd className="icon_plus"/>
              </div>
              
              <ul id="nossaloja_id" className="nossaloja_ul">
                <li className="li_option">
                  <a href="#">Quem somos?</a>
                </li>
                <li className="li_option">
                  <a href="#">Encontre uma Sports perto de você </a>
                </li>
                <li className="li_option">
                  <a href="#">Cadastre-se para receber novidades</a>
                </li>
                <li className="li_option">
                  <a href="#">Cartão Presente</a>
                </li>
                <li className="li_option">
                  <a href="#">Trabalhe conosco</a>
                </li>
              </ul>
            </nav>

            <nav className="footer_store_option">
              <div className="footer_button_option_store" onClick={() => openOption("atendimento_id")}>
                <h4>Atendimento</h4>
                <IoAdd className="icon_plus"/>
              </div>
              <ul id="atendimento_id" className="atendimento_ul">
                <li className="li_option">
                  <a href="#">Fale Conosco</a>
                </li>
                <li className="li_option">
                  <a href="#">Acompanhe seu pedido</a>
                </li>
                <li className="li_option">
                  <a href="#">Termos de uso</a>
                </li>
                <li className="li_option">
                  <a href="#">Política de Trocas e Arrependimento</a>
                </li>
                <li className="li_option">
                  <a href="#">Política de Cookies</a>
                </li>
                <li className="li_option">
                  <a href="#">Segurança e privacidade</a>
                </li>
                <li className="li_option">
                  <a href="#">Fornecedores</a>
                </li>
                <li className="li_option">
                  <a href="#">Serviços</a>
                </li>
                
              </ul>
            </nav>

            <nav className="footer_store_option">
              <div className="footer_button_option_store" onClick={() => openOption("minhaconta_id")}>
                <h4>Minha Conta</h4>
                <IoAdd className="icon_plus"/>
              </div>
              <ul id="minhaconta_id" className="minhaconta_ul">
                <li className="li_option">
                  <a href="#">Meus dados</a>
                </li>
                <li className="li_option">
                  <a href="#">Meus pedidos</a>
                </li>
                <li className="li_option">
                  <a href="#">Wishlist</a>
                </li>

              </ul>
            </nav>
          </div>

          <hr></hr>

          <div className="footer_socialmedia_payment">
            
            <div className="footer_payment">
              <h4>
                Formas de pagamento
              </h4> 
              <img src={payment} alt="formas-de-pagamento-imagem" className="payment_img" />
            </div>
            
            <div className="footer_socials">
              <h4>Redes Sociais</h4>
              
              <div className="footer_socialmedia">
                <a className="social instagram" href="#">
                  <IoLogoInstagram className="icon_social" />
                </a>
                <a className="social facebookIcon" href="#">
                  <IoLogoFacebook className="icon_social" />
                </a>
                <a className="social whatsappIcon" href="#">
                  <IoLogoWhatsapp className="icon_social" />
                </a>
                <a className="social tiktokIcon" href="#">
                  <IoLogoTiktok className="icon_social" />
                </a>
                <a className="social twitterIcon" href="#">
                  <IoLogoTwitter className="icon_social" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer_store_rights">
        <p className="footer_rights_p">
          © 2024 Sports Store. Todos os direitos reservados. 
        </p>
        
      </div>
    </div>

  )
}

export default Footer