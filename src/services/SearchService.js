import MakeRequest from "./Request";

export const FilterProducts = async (searchData) => {
    return MakeRequest({ endpoint: '/product/filter', method: 'POST', data: { search: searchData } })
};