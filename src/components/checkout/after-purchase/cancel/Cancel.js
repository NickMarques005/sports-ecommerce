import React, { useEffect } from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import './Cancel.css';
import Lottie from 'lottie-react';
import LoadingData from '../../../../imgs/loading_gif.json';

function Cancel() {

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/compra');
        }, 4500);
    }, []);

    return (
        <div className="cancel_div">
            <div className="cancel_container_info">
                <IoCloseCircleOutline size={"30vh"} color="#3522ae" />
                <h1>Compra cancelada</h1>
                <p>Você será redirecionado de volta para a página de compra...</p>
                <Lottie animationData={LoadingData} loop={true} style={{ height: '10vh', marginBlockStart: '25px' }} />
            </div>
        </div>
    );
}

export default Cancel;