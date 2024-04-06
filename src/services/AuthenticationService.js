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

export const VerifyToken = async (token) => {
    return MakeRequest({ endpoint: '/user/verify-token', method: 'POST', token});
}

export const PurchaseItems = async (items, identityData, token) => {
    return MakeRequest({endpoint: '/user/purchase-items', method: 'POST', data: {items, identityData}, token });
}

export const CreateOrder = async (items, identityData, token) => {
    return MakeRequest({endpoint: '/user/create-purchase-order', method: 'POST', data: {items, identityData}, token});
}

export const GetOrders = async (token) => {
    return MakeRequest({endpoint: '/user/get-purchase-orders', method: 'GET', token});
}

