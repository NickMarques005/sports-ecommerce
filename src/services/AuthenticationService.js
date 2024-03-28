import MakeRequest from "./Request";

export const LoginUser = async (credentials) => {
    return MakeRequest({ endpoint: '/user/login', method: 'POST', data: credentials });
};

export const SignUpUser = async (credentials) => {
    return MakeRequest({ endpoint: '/user/create', method: 'POST', data: credentials });
};

export const GetUserData = async (token) => {
    return MakeRequest({ endpoint: '/user/data', method: 'GET', token });
}

