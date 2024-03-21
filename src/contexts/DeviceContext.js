import React, { createContext, useContext, useState, useEffect } from 'react';

const DeviceContext = createContext();

export function useDevice() {
    return useContext(DeviceContext);
}

export const DeviceProvider = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 950);
            console.log("IS MOBILE!!");
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <DeviceContext.Provider value={{ isMobile }}>
            {children}
        </DeviceContext.Provider>
    );
};