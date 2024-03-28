import MakeRequest from "./Request";

export const GetProducts = async () => {
    return MakeRequest({ endpoint: '/product/data' })
};

export const GetProductById = async (idProduct) => {
    return MakeRequest({ endpoint: `/product/id/${idProduct}` })
};