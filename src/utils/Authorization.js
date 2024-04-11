import { VerifyToken } from "../services/AuthenticationService";

export const VerifyingAuthorization = async (token) => {
    const response = await VerifyToken(token);
    if (response.success) {
        console.log("Usuário autorizado: ", response);
        return true;
    }

    console.log("Usuário não autorizado");
    return false;
}