//---handleCheckoutPageFunc.js---//


const handleCheckoutPageFunc = (navigate, page, data, direction) => {

    console.log("CART CHECKOUT PAGE");
    if (!localStorage.getItem("authToken")) {
        if(page == "/compra/carrinho" || page == "/compra/identifica%C3%A7%C3%A3o" || page == "/compra/pagamento")
        {
            console.log("SEM AUTH");
            navigate("/login");
        }
        else{
            navigate("/compra");
        }
        
    } else {
        console.log("COM AUTH");
        switch(page)
        {
            case "/compra/carrinho":
                
                if(data.length !== 0)
                {
                    if(direction == "next")
                    {
                        navigate("/compra/identifica%C3%A7%C3%A3o");
                    }
                }
                else{
                    navigate("/login");
                }
                break;
            case "/compra/identifica%C3%A7%C3%A3o":
                
                if(data.length !== 0)
                {
                    if(direction == "next")
                    {
                        navigate("/compra/pagamento");
                    }
                    else{
                        navigate("compra/carrinho");
                    }
                    
                }
                else{
                    navigate("/login");
                }
                break;
            case "/compra/pagamento":
                
                if(data.length !== 0)
                {
                    if(direction == "next")
                    {
                        console.log("FECHOU COMPRA!");
                    }
                    else{
                        navigate("/compra/identifica%C3%A7%C3%A3o");
                    }
                }
                else{
                    navigate("/login");
                }
                break;
            default:
                navigate("/compra");
                break;
        }
        
    }
};

export default handleCheckoutPageFunc;