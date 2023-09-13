import React, { useState } from 'react'
import '../../styles/Menu.css';
import Account_Img from '../../imgs/user.png';
import { IoCloseSharp, IoArrowBack } from 'react-icons/io5';

import Pointer_Menu from "../../imgs/pointer_menu_mobile.png";

import Menu_Clothes from "../../imgs/menu_mobile_clothes_icon.png";
import Menu_Shoes from "../../imgs/menu_mobile_shoes_icon.png";
import Menu_News from "../../imgs/menu_mobile_news_icon.png";
import Menu_Accessories from "../../imgs/menu_mobile_accessories_icon.png";
import Menu_Equipment from "../../imgs/menu_mobile_equipment_icon.png";
import Menu_Shop from "../../imgs/menu_mobile_shops_icon.png";
import Menu_Exchange from "../../imgs/menu_mobile_exchanges_icon.png";
import Menu_Wishlist from "../../imgs/menu_mobile_wishlist_icon.png";

import Menu_Login from "../../imgs/menu_mobile_login_icon.png";
import Menu_Account from "../../imgs/menu_mobile_account_icon.png";
import Menu_Orders from "../../imgs/menu_mobile_orders_icon.png";
import Menu_Services from "../../imgs/menu_mobile_services_icon.png";
import Menu_Faq from "../../imgs/menu_mobile_faq_icon.png";
import Menu_Logout from "../../imgs/menu_mobile_logout_icon.png";

//Arrays para produtos e opções do menu:
const product_options = [
    { name: 'Novidades', img: Menu_News, link: '/novidades' },
    { name: 'Calçados', img: Menu_Shoes, link: '/calcados' },
    { name: 'Roupas', img: Menu_Clothes, link: '/roupas' },
    { name: 'Acessórios', img: Menu_Accessories, link: '/acessorios' },
    { name: 'Equipamentos', img: Menu_Equipment, link: '/equipamentos' },
];

const user_options = [
    { name: 'Entrar', img: Menu_Login, link: '/login' },
    { name: 'Minha Conta', img: Menu_Account, link: '#' },
    { name: 'Meus Pedidos', img: Menu_Orders, link: '#' },
    { name: 'Serviços', img: Menu_Services, link: '#' },
    { name: 'Atendimento e FAQ', img: Menu_Faq, link: '#' },
]

const shop_options = [
    { name: 'Nossas lojas', img: Menu_Shop, link: '#' },
    { name: 'Trocas e devoluções', img: Menu_Exchange, link: '#' },
    { name: 'Wishlist', img: Menu_Wishlist, link: '#' },
];

function Menu(props) {


    const [userOptions, setUserOptions] = useState(false);

    const logout_option = [
        { name: 'Sair', img: Menu_Logout, function: props.handleLogout }
    ]

    /*****************/
    /*   FUNCTIONS 
    /*****************/

    //Funcionamento: Mapeamento das opções 

    const listOptions = (type_options) => {
        if (type_options) {
            if (userOptions) {
                return type_options.map((option, index) => (
                    <li key={index}>
                        {
                            props.isLogged && option.name == "Entrar" ? ""
                                :
                                !props.isLogged && option.name == "Sair" || !props.isLogged && option.name == "Minha Conta" ? ""
                                    :
                                    option.function ?
                                        <button onClick={option.function}>
                                            <div className="option_div">
                                                <img src={option.img} alt={`${option.name}-Image`} className="option_icon_img" />
                                                <label>{option.name}</label>
                                            </div>
                                            <img src={Pointer_Menu} alt="pointer-menu" className="pointer_menu" />
                                        </button>

                                        :

                                        <a href={option.link}>
                                            <div className="option_div">
                                                <img src={option.img} alt={`${option.name}-Image`} className="option_icon_img" />
                                                <label>{option.name}</label>
                                            </div>
                                            <img src={Pointer_Menu} alt="pointer-menu" className="pointer_menu" />
                                        </a>
                        }
                    </li>
                ));
            }
            else {
                return type_options.map((option, index) => (
                    <li key={index}>
                        {
                            <a href={option.link}>
                                <div className="option_div">
                                    <img src={option.img} alt={`${option.name}-Image`} className="option_icon_img" />
                                    <label>{option.name}</label>
                                </div>
                                <img src={Pointer_Menu} alt="pointer-menu" className="pointer_menu" />
                            </a>
                        }
                    </li>
                ));
            }

        }

    };


    const change_menuOptions = () => {
        console.log("ALTERNA OPTIONS");
        setUserOptions(!userOptions);
        console.log("USEROPTIONS: ", userOptions);
    }

    /*****************/
    /*    RENDER 
    /*****************/

    return (
        <div className={`menu_mainDiv ${props.menuOn && !props.checkoutCart ? "on" : "off"}`}>
            <div className="menu_bg">
            </div>
            <div className={`menu_screen ${props.menuOn && !props.checkoutCart ? "on" : "off"}`}>
                <div className="menu_account">
                    <div className="account_login">
                        <div className="login_div" onClick={() => change_menuOptions()}>
                            <div className="login_icon_div">


                                {
                                    !userOptions ?
                                        <img src={Account_Img} className="account_img" alt="user_image" />
                                        :
                                        <IoArrowBack className="icon_menu_mobile" />
                                }
                            </div>
                            {
                                localStorage.getItem("authToken") ?
                                    <div className="loginData_div">
                                        <h2>{props.userData.name}</h2>
                                        <p>{props.userData.email}</p>
                                    </div>
                                    : <h1>LOGIN</h1>
                            }
                        </div>
                        <div className="close_div">
                            <button className="menu_mobile_button" onClick={() => props.onClose()}>
                                <IoCloseSharp className="icon_menu_mobile" />
                            </button>
                        </div>
                    </div>

                </div>
                <hr></hr>

                {

                    <div className="menu_products">
                        {
                            !userOptions ?
                                <ul>
                                    {listOptions(product_options)}
                                </ul>
                                :
                                <ul>
                                    {
                                        listOptions(user_options)
                                    }
                                </ul>

                        }
                    </div>
                }

                {
                    !localStorage.getItem("authToken") && userOptions ?
                        ""
                        : <hr></hr>
                }

                {

                    <div className="menu_options">
                        {
                            !userOptions ?
                                <ul>
                                    {listOptions(shop_options)}
                                </ul>
                                :
                                localStorage.getItem("authToken")
                                    ?
                                    <ul>
                                        {listOptions(logout_option)}
                                    </ul>
                                    :
                                    ""
                        }
                    </div>

                }
            </div>
        </div>
    )
}

export default Menu