import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import Menu from '../Menu';
import { IoCart, IoMenuOutline, IoHeart } from 'react-icons/io5';
import Sports_Logo from '../../../imgs/Sports.png';
import Account_Img from '../../../imgs/user.png';
import DropDownItem from '../../dropdown_menu/DropDownItem';
import { useSearch } from '../../../contexts/SearchContext';
import { useCart } from '../../../contexts/CartContext';
import CartModal from '../CartModal';
import CartPageFunc from '../../../utils/CheckoutHandling';
import { useDevice } from '../../../contexts/DeviceContext';
import SearchBar from '../../search_bar/SearchBar';
import SearchResults from '../../search_bar/SearchResults';
import MobileSearch from '../../search_bar/MobileSearch';
import { FilterProducts } from '../../../services/SearchService';
import { UseAuth } from '../../../contexts/AuthContext';
import Options from '../../../utils/AccountOptions';


export default function Navbar() {

  let currentRoute = window.location.pathname;
  let navigate = useNavigate();

  const handleLogout = () => {
    console.log("AUTHTOKEN REMOVE");
    localStorage.removeItem("authToken");

    if (currentRoute !== "/") {
      navigate("/");
    }
    else {
      window.location.reload();
    }
  }

  const { authToken, userData, isLogged} = UseAuth();
  const account_options = Options();

  const { isMobile } = useDevice();
  const [openSearchMobile, setOpenSearchMobile] = useState(false);

  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching]= useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [resultsData, setResultsData] = useState([]);
  const [suggestionsData, setSuggestionsData] = useState([]);

  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false);

  const [optionsOn, setOptionsOn] = useState(true);
  const [updatedAccountOptions, setUpdatedAccountOptions] = useState([]);

  const [inputChange, setInputChange] = useState('');

  const { searchQuery, setSearchQuery } = useSearch();
  const { inputWorking, setInputWorking } = useSearch();

  const cartItems = useCart();
  const [cartView, setCartView] = useState(false);
  const [checkout, setCheckout] = useState(false);

  let dropdownMenuRef = useRef();
  let imgAccountRef = useRef();

  useEffect(() => {
    let handleMenu = (e) => {
      if (!checkout && dropdownMenuRef.current) {
        if (!dropdownMenuRef.current.contains(e.target)) {
          if (dropdownMenuOpen) {
            if (!imgAccountRef.current.contains(e.target)) {
              setDropdownMenuOpen(!dropdownMenuOpen);
            }
            else if (imgAccountRef.current.contains(e.target)) {
              setDropdownMenuOpen(false);
            }
          }
          else {
            if (imgAccountRef.current.contains(e.target)) {
              setDropdownMenuOpen(true);
            }
          }
        }
      }
    }
    document.addEventListener("mousedown", handleMenu);

    return () => {
      document.removeEventListener("mousedown", handleMenu)

    }


  }, [dropdownMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scroll_distance = 200;
      const isOptionON = scrollY < scroll_distance;
      setOptionsOn(isOptionON);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const interactMenu = () => {
    setMenuOpen(!menuOpen);
    //console.log("menu aberto: ", menuOpen);
  };

  useEffect(() => {
    if (!search) {
      setInputWorking(false);
    }

    handleChangeSearch(search);

  }, [search]);

  const handleChangeSearch = (input_data) => {
    if(input_data === "")
    {
      setSuggestionsData([]);
      setResultsData([]);
      return console.log("Input Vazio");
    }

    setInputChange(input_data);
    setIsSearching(true);
    FilterProducts(input_data)
      .then((results) => {
        const { products, suggestions} = results.data;
        console.log(results);
        setResultsData(products);
        setSuggestionsData(suggestions);
        setIsSearching(false);
      })
      .catch((err) => {
        console.log("Error: ", err);
        setIsSearching(false);
      });
  }

  useEffect(() => {

    const cartLengthDiv = document.querySelector(".cart_length_div");
    if (cartLengthDiv) {
      cartLengthDiv.classList.add("cart_length_div_anim");
      setTimeout(() => {
        cartLengthDiv.classList.remove("cart_length_div_anim");
      }, 400);
    }

  }, [cartItems.length]);


  useEffect(() => {
    if (currentRoute === "/compra/pagamento" || currentRoute === "/compra/identifica%C3%A7%C3%A3o") {
      setCheckout(true);
    }
    else {
      setCheckout(false);
    }
  }, [currentRoute]);


  //Funcionalidade: tratar busca de itens do input de pesquisa
  const handleSearchKeyPress = (event) => {
    if (event.key === 'Enter' && search !== '') {
      console.log("Pesquisar: ", search);
      setInputWorking(false);
      setSearch("");
      localStorage.setItem('searchQuery', inputChange);
      setSearchQuery(inputChange);
      navigate('/busca');
    }
  }

  const handleSuggestionClick = (result) => {
    setSearch(result.suggestion.toLowerCase());
  }

  //Funcionalidade: tratar as mudanças no input de procura
  const handleChangeSearchInput = (event) => {
    setInputWorking(true);
    setSearch(event.target.value);
    console.log("SEARCH: ", search);
  }

  const handleMobileSearch = () => {
    console.log("Mobile Search");
    setOpenSearchMobile(!openSearchMobile);
  }

  const handleMouseEnter = () => {
    setCartView(true);
  };

  const handleMouseLeave = () => {
    setCartView(false);
  };

  const handleCartModalMouseEvents = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };

  return (
    <div className="aux_navBarMainOptions_div">
      <div className="navBarMainOptions_div">
        {
          isMobile ?
            <>

              {
                openSearchMobile ?
                <MobileSearch isSearching={isSearching} search={search} resultsData={resultsData} suggestionsData={suggestionsData} handleChangeSearchInput={handleChangeSearchInput} handleSearchKeyPress={handleSearchKeyPress} handleSuggestionClick={handleSuggestionClick} inputWorking={inputWorking} />
                : ""
              }
              <Menu menuOn={menuOpen} checkoutCart={checkout} onClose={interactMenu} userData={userData ? userData : ""} isLogged={isLogged} handleLogout={handleLogout} />
            </>
            : ""
        }
        <nav className="navBar_main">
          <div className="containerNav_main">
            <div className="menu_logo">
              {!checkout ?
                <button className="menu button" onClick={() => interactMenu()}>
                  <IoMenuOutline className="icon_menu" />
                </button>
                : ""}
              <a href="/">
                <img src={Sports_Logo} alt="logo_image" className="logo_sports" />
              </a>
            </div>

            {
              checkout === false ?
                <>
                  <div className="search_payment">
                    <div className="search_section">
                      <SearchBar resultsData={resultsData} search={search} handleSearchKeyPress={handleSearchKeyPress} handleChangeSearchInput={handleChangeSearchInput} handleMobileSearch={handleMobileSearch} isMobile={isMobile} />

                      {
                        isMobile ?
                          ""
                          :
                          <SearchResults isSearching={isSearching} search={search} resultsData={resultsData} handleSuggestionClick={handleSuggestionClick} suggestionsData={suggestionsData} inputWorking={inputWorking} />
                      }
                    </div>
                    <button className="wishlist button">
                      <IoHeart className="icon_scale icon_general" />
                    </button>
                    <button className={`payment ${currentRoute === "/compra/carrinho" ? "off" : ""} button `} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => CartPageFunc(navigate)}>
                      <IoCart className="icon_scale icon_general" />
                      {cartItems.length !== 0 ?
                        <div className="cart_length_div">
                          <span>{cartItems.length}</span>
                        </div> : ""}
                    </button>
                    {
                      isMobile ?
                      ""
                      :
                      <CartModal cart_view={cartView} mouseEvents={handleCartModalMouseEvents} />
                      }
                  </div>
                  <div className="login_section">
                    <img src={Account_Img} className="account_img" ref={imgAccountRef} alt={"account-img"} />
                  </div>
                  <div className={`dropdown_login ${dropdownMenuOpen && !cartView && !checkout ? 'on' : 'off'}`} ref={dropdownMenuRef}>

                    {
                      isLogged ?
                        <>
                          <div className="dropdown_accountData_div">
                            <div className="dropdown_accountImg">
                              <img src={Account_Img} alt="useraccount_img" />
                            </div>
                            <div className="dropdown_accountNameEmail">
                              <h3>
                                {userData ? userData.name : ""}<br />
                                <span>
                                  {userData ? userData.email : ""}
                                </span>
                              </h3>
                            </div>
                          </div>
                          <hr />
                        </>
                        : ""}

                    <ul>
                      {account_options.map((option, index) => (
                        isLogged && option.id === 0 ? ""
                          :
                          isLogged && option.id === 5 ? <hr key={option.id} />
                            :
                            !isLogged && option.id === 5 ? ""
                              :
                              !isLogged && option.id === 1 || !isLogged && option.id === 6 ? ""
                                : (
                                  <li key={isLogged ? option.id : index}>
                                    <DropDownItem link={!authToken && option.id === 2 ? option.linkNoAuth : option.link} img={option.img} name={option.name} altImg={option.altImg} pointer={option.pointer} option_action={option.action ? option.action : null}/>
                                  </li>
                                )
                      )
                      )
                      }
                    </ul>
                  </div>
                </>
                : ""
            }

          </div>

        </nav>

        {
          !checkout && !isMobile ?
            <div className={`menu_Options ${optionsOn ? "" : "off"}`}>
              <ul>
                <li><a href='/novidades'>Novidades</a></li>
                <li><a href='/calcados'>Calçados</a></li>
                <li><a href='/roupas'>Roupas</a></li>
                <li><a href='/acessorios'>Acessórios</a></li>
                <li><a href='/equipamentos'>Equipamentos</a></li>
              </ul>
            </div>
            : ""}

      </div>
    </div>
  )
}