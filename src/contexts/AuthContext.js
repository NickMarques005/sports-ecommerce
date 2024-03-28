import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            console.log("Token encontrado: ", token);
            setAuthToken(token);
        }

        console.log("Não autenticado...");
    }, []);

    const SaveToken = async (token, RememberMe) => {
        if(!token)
        {
            return console.error("Erro ao salvar token: token não fornecido");
        }

        if(RememberMe)
        {
            console.log("Remember user...");
            localStorage.setItem("authToken", token);
        }

        console.log("Token: ", token);

        setAuthToken(token);
    };

    const SaveUserData = (user) => {
        if(!user)
        {
            return console.error("Erro ao salvar dados de usuário");
        }
        
        const data = {
            name: user.name,
            email: user.email,
            cep_location: user.cep_location
        }

        console.log("UserData: ", data);

        setUserData(data);
    }

    const LogoutUser = () => {
        localStorage.removeItem("authToken");
        setAuthToken(null);
        setUserData(null);
    }

    return (
        <AuthContext.Provider value={{ authToken, SaveToken, userData, SaveUserData, LogoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UseAuth = () => useContext(AuthContext);