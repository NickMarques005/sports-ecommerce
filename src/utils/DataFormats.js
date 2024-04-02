
export const FormatPhone = (value) => {
    value = value.replace(/\D/g, "");
    value = value.substring(0, 11); // Limita a 11 dígitos
    if (value.length > 6) {
        value = value.replace(/^(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3");
    } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
    } else if (value.length > 0) {
        value = value.replace(/^(\d*)$/, "($1");
    }
    return value;
}

export const FormatCep = (value) => {
    value = value.replace(/\D/g, "");
    value = value.substring(0, 8);
    if (value.length > 5) {
        value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    }
    return value;
}

export const FormatCpf = (value) => {
    value = value.replace(/\D/g, "");
    value = value.substring(0, 11);
    if (value.length > 9) {
        value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
    } else if (value.length > 6) {
        value = value.replace(/^(\d{3})(\d{3})(\d{1,3})$/, "$1.$2.$3");
    } else if (value.length > 3) {
        value = value.replace(/^(\d{3})(\d{1,3})$/, "$1.$2");
    }
    return value;
}