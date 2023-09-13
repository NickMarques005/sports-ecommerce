import React from 'react';
import { DotLoader } from 'react-spinners'; 
import '../../styles/Loading.css';

const LoadingScreen = () => {
        return (
            <div className="loading_mainDiv">
                <DotLoader color={'#4c2dc2'} size={60} /> 
                <p>Carregando...</p>
            </div>
        );
};

export default LoadingScreen;