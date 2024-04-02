export const validateName = (name) => name.trim().length >= 3;

export const validateEmail = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
};

export const validatePhone = (phone) => {
    const regex = /^\(\d{2,}\) \d{4,}\-\d{4}$/;
    return regex.test(phone);
};

export const validateCpf = (cpf) => {
    const regex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
    return regex.test(cpf);
};

export const validateCep = (cep) => {
    const regex = /^\d{5}\-\d{3}$/;
    return regex.test(cep);
};