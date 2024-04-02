import { URL as baseURL, ApiRoute } from "../App";

const MakeRequest = async ({ endpoint, method = 'GET', data = null, token = null }) => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const config = {
        method,
        headers,
    };

    if (data) config.body = JSON.stringify(data);

    console.log(config);

    try {
        const response = await fetch(`${baseURL}${ApiRoute}${endpoint}`, config);

        if (!response.ok) {
            const resultError = await response.json();
            const errors = resultError.error || 'Houve um Erro de Conexão';
            console.error("RESPONSE NOT OK: ", errors);
            return { error: errors, success: false };
        }

        const result = await response.json();
        if (!result.success) {
            console.error(result.error);
            return { error: result.error, success: false };
        }

        console.log(result.message);
        return { data: result.data, message: result.message, success: true };
    }
    catch (err) {
        console.error("Houve um Erro:", err);
    }
}

export default MakeRequest;