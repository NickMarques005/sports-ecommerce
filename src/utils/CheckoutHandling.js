import { VerifyToken } from "../services/AuthenticationService";

const VerifyingAuthorization = async (token) => {
    const response = await VerifyToken(token);
    if (response.success) {
        console.log("Usuário autorizado: ", response);
        return true;
    }

    console.log("Usuário não autorizado");
    return false;
}

const HandleLevelCheckoutPage = async (navigate, nextPage, currentPage, checkoutData, token) => {

    const isAuthorized = await VerifyingAuthorization(token);

    if (nextPage === currentPage) {
        console.log("SAME PAGE");
        return;
    }

    if (nextPage != "carrinho") {
        if (!isAuthorized) {
            navigate("/login");
            return;
        }

        if(checkoutData.cartDataLength === 0)
        {
            navigate("/");
            return
        }

        if( nextPage === "pagamento" && !checkoutData.identificationData)
        {
            console.log("Completar todos os dados de identificação para continuar");
            return;
        }
    }

    navigate(`/compra/${nextPage}`);
};

export default HandleLevelCheckoutPage;