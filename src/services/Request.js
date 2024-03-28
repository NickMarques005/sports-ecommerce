import { URL as baseURL, ApiRoute } from "../App";

const MakeRequest = async ({ endpoint, method = 'GET', data = null, token = null }) => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const config = {
        method,
        headers,
    };

    if(data) config.body = JSON.stringify(data);

    console.log(config);

    try {
        const response = await fetch(`${baseURL}${ApiRoute}${endpoint}`, config);

        if (!response.ok) {
            const errorData = await response.json();
            return console.error(errorData.error || 'Houve um Erro de Conexão');
        }

        const result = await response.json();
        if (!result.success) {
            return console.error(result.error);
        }

        console.log(result.message);
        return {data: result.data, message: result.message};
    }
    catch (err) {

        return console.error("Houve um Erro:", err);
    }
}

export default MakeRequest;