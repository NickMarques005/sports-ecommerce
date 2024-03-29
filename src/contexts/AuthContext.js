import React, { createContext, useContext, useState, useEffect } from 'react';
import { GetUserData } from '../services/AuthenticationService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {

        const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
        console.log("Verificação de Token em localStorage...");
        if (token) {
            setAuthToken(token);
            return;
        }
        
        console.log("Sem token de autenticação");

    }, []);

    useEffect (() => {
        if(userData)
        {
            return console.log("Usuário já autenticado!!");
        }

        if(authToken) {
            HandleFetchUserData(authToken);
        }

    }, [authToken]);

    const HandleFetchUserData = async (token) => {
        const response = await GetUserData(token);
        if (response) {
            console.log("User Data: ", response);
            const user = response.data;
            setUserData(user);
            setIsLogged(true);
            return;
        }

        LogoutUser();
    }

    const SaveToken = async (token) => {
        if (!token) {
            return console.error("Erro ao salvar token: token não fornecido");
        }

        localStorage.setItem("authToken", token);
        console.log("Token: ", token);
        setAuthToken(token);
    };

    const SaveUserData = (user) => {
        if (!user) {
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
        console.log("LOGOUT ACIONADO");
        if (localStorage.getItem("authToken")) localStorage.removeItem("authToken");

        setAuthToken(null);
        setUserData(null);
        setIsLogged(false);
    }

    return (
        <AuthContext.Provider value={{ authToken, SaveToken, userData, SaveUserData, LogoutUser, isLogged, setIsLogged }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UseAuth = () => useContext(AuthContext);