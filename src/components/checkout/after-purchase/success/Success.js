import React, { useEffect } from 'react';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import './Success.css';
import Lottie from 'lottie-react';
import LoadingData from '../../../../imgs/loading_gif.json';

const Success = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('cart');
        setTimeout(() => {
            navigate('/');
        }, 4500);
    }, []);

    return (
        <div className="success_div">
            <div className="success_container_info">
                <IoCheckmarkCircleOutline size={"30vh"} color="#3522ae" />
                <h1>Compra realizada com sucesso!</h1>
                <p>Redirecionando para a página inicial...</p>
                <Lottie animationData={LoadingData} loop={true} style={{ height: '10vh', marginBlockStart: '25px' }} />
            </div>
        </div>
    );
}

export default Success;