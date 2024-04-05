import { VerifyToken } from "../services/AuthenticationService";
import { HandleIdentityValidation } from "./Validation";

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

        if (checkoutData.cartDataLength === 0) {
            navigate("/");
            return
        }

        if (nextPage === "pagamento") {
            const { success, errors } = HandleIdentityValidation(checkoutData.identificationData);
            if (!success) {
                console.log("ERROS: ", errors);
                console.log("Completar todos os dados de identificação corretamente para continuar");
                return { errors: errors};
            }
        }
    }

    navigate(`/compra/${nextPage}`);
};

export default HandleLevelCheckoutPage;