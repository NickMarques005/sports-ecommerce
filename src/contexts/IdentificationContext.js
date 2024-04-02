import React, { createContext, useState, useContext, useEffect } from 'react';

const IdentificationContext = createContext();

export function IdentificationProvider({ children }) {
    const [identificationData, setIdentificationData] = useState({
        name: '',
        email: '',
        cpf: '',
        telefone: '',
        cep_location: {
            cep_number: '',
            logradouro: '',
            bairro: '',
            localidade: '',
            uf: '',
            number: ''
        }
    });

    return (
        <IdentificationContext.Provider value={{ identificationData, setIdentificationData }}>
            {children}
        </IdentificationContext.Provider>
    );
}

export function UseIdentification() {
    const context = useContext(IdentificationContext);
    if (context === undefined) {
        throw new Error('Uso de contexto necessita ser dentro de provider');
    }
    return context;
}