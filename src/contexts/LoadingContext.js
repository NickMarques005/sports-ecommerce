import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

export const LoadingProvider = ({children}) => {
    const [loading, setLoading] = useState(true);

    return(
        <LoadingContext.Provider value={({loading, setLoading})}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if(context == undefined)
    {
        throw new Error('useLoading deve ser utilizado dentro de um LoadingProvider! ');
    }
    return context
}