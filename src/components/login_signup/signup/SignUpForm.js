import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Signup.css';
import Email_icon from '../../../imgs/email_icon.png';
import Password_icon from '../../../imgs/password_icon.png';
import View_Icon from '../../../imgs/view_icon.png';
import Hide_Icon from '../../../imgs/hide_icon.png';
import { SignUpUser } from '../../../services/AuthenticationService';
import { useNavigate, useLocation } from 'react-router-dom';
import LoadingData from '../../../imgs/loading_gif.json';
import Lottie from 'lottie-react';
import { FormatCep } from '../../../utils/DataFormats';

function SignUpForm() {

    let navigate = useNavigate();
    const location = useLocation();

    const [isusernameValid, setIsusernameValid] = useState(true);

    const [isEmailValid, setIsEmailValid] = useState(true);

    const MAX_CEP_LENGTH = 9;
    const MAX_ADDRESSNUMBER_LENGTH = 5;
    const [cep, setCep] = useState('');
    const [locationData, setLocationData] = useState({});
    const [contentCep, setContentCep] = useState(false);
    const [isCepValid, setIsCepValid] = useState(true);
    const [addressNumber, setAddressNumber] = useState('');

    const [passwordFocus, setpasswordFocus] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const passwordInputRef = useRef(null);

    const [isFormValid, setIsFormValid] = useState(false);
    const [credentials, setCredentials] = useState({ username: "", email: "", password: "", cep_location: { cep_number: "", bairro: "", localidade: "", uf: "", logradouro: "", number: "" } });

    const [formLoading, setFormLoading] = useState(false);
    const [responseError, setResponseError] = useState("");


    const passwordVisibility = () => {
        passwordInputRef.current.focus();
        setShowPassword((prev_password) => !prev_password);

    };


    const handleCepChange = (e) => {
        if (e.target.value.length > MAX_CEP_LENGTH) {
            setCep(e.target.value.slice(0, MAX_CEP_LENGTH));
        }
        else {
            const formattedCep = FormatCep(e.target.value);
            setCep(formattedCep);
        }
    }

    const handleCepSearch = (e) => {
        console.log("CEP SEARCH: ");
        if (cep.length === 9) {
            axios.get(`https://viacep.com.br/ws/${cep}/json/`)
                .then((res) => {
                    const { bairro, localidade, uf, logradouro } = res.data;
                    if (bairro != null || localidade != null || uf != null || logradouro != null) {
                        setLocationData({ bairro: bairro, localidade: localidade, uf: uf, logradouro: logradouro, number: "" });
                        setContentCep(true);
                        setIsCepValid(true);
                        setCredentials({
                            ...credentials, cep_location: {
                                ...credentials.cep_location,
                                bairro: bairro,
                                localidade: localidade,
                                uf: uf,
                                logradouro: logradouro
                            }
                        })
                        console.log(credentials);
                    }
                    else {
                        setContentCep(false);
                        setIsCepValid(false);
                        setAddressNumber("");
                        setLocationData({ bairro: "", localidade: "", uf: "", logradouro: "" });

                    }

                })
                .catch((err) => {
                    console.log('Error Fetch CEP: ', err);
                    setLocationData({});
                    setContentCep(false);
                    setIsCepValid(false);
                    setAddressNumber("");
                    console.log("CONTENT CEP: ", contentCep);
                })
        }
        else {
            console.log("Erro: CEP incorreto");
            setLocationData({});
            setContentCep(false);
            setIsCepValid(false);
            setAddressNumber("");
            console.log("CONTENT CEP: ", contentCep);
        }
    }

    const handleAddressNumber = (e) => {
        if (e.target.value.length > MAX_ADDRESSNUMBER_LENGTH) {
            setAddressNumber(e.target.value.slice(0, MAX_ADDRESSNUMBER_LENGTH));
        }
        else {
            setAddressNumber(e.target.value);
            setLocationData({ ...locationData, number: e.target.value })

        }

        setCredentials({
            ...credentials, cep_location: {
                ...credentials.cep_location,
                number: e.target.value
            }
        })
    }

    const validateEmail = (email) => {
        const email_format = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return email_format.test(email);
    };

    const validateUserName = (username) => {
        if (username.length >= 3) {
            return true;
        }
        else {
            return false;
        }
    };

    const validatePassword = (password) => {
        if (password.length >= 8) {
            return true;
        }
        else {
            return false;
        }
    };

    const handleInputsValidation = (username, value) => {

        let isValid = null;

        switch (username) {

            case "username":
                isValid = validateUserName(value);
                setIsusernameValid(isValid);
                if (!isValid) {
                    setCredentials({ ...credentials, username: "" });
                }
                break;

            case "email":
                isValid = validateEmail(value);
                setIsEmailValid(isValid);
                if (!isValid) {
                    setCredentials({ ...credentials, email: "" });
                };
                break;

            case "password":
                isValid = validatePassword(value);
                setIsPasswordValid(isValid);
                if (!isValid) {
                    setCredentials({ ...credentials, email: "" });
                };
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(credentials);
        setFormLoading(true);

        const response = await SignUpUser(credentials)
        if (response && response.success) {
            const { message } = response;
            console.log(message);
            navigate('/login');
        }
        else {
            if(!response)
            {
                setResponseError("Problema de conexão com o servidor");
            }
            else{
                setResponseError(response.error)
            }
        }

        setFormLoading(false);
    }

    const checkFormValidity = () => {
        if (credentials.username && credentials.email && credentials.password
            && credentials.cep_location.bairro
            && credentials.cep_location.localidade
            && credentials.cep_location.logradouro
            && credentials.cep_location.number) {
            console.log("FORM TRUE");
            setIsFormValid(true);
            console.log(credentials);
        }
        else {
            console.log("FORM FALSE");
            setIsFormValid(false);
            console.log(credentials);
        }
    };

    const onChangeInputData = (e) => {

        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        setCredentials(prevCredentials => ({
            ...prevCredentials,
            cep_location: {
                ...prevCredentials.cep_location,
                cep_number: cep
            }
        }));
    }, [cep]);

    return (
        <div className="form_div register">

            {responseError ?
                <div className="error_message">
                    <span>
                        {responseError}
                    </span>
                </div> : ""}

            <div className="register_main_div">
                <div className="title_register_div">
                    <h2>
                        Cadastre-se e torne-se um membro da Sports!
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="form_register">
                    <div className="inputs_div">

                        <div className="register_input_div_template_main">
                            <div className={isusernameValid ? 'input_div_register input_default' : 'input_div_register input_error'}>
                                <span className="icon"></span>
                                <input
                                    type="text"
                                    required
                                    name="username"
                                    maxLength={32}
                                    value={credentials.username}
                                    onChange={onChangeInputData}
                                    onBlur={(e) =>
                                        handleInputsValidation(e.target.name, e.target.value)}


                                />
                                <label>Nome</label>
                            </div>
                        </div>

                        <div className="register_input_div_template_main">
                            <div className={isEmailValid ? 'input_div_register input_default' : 'input_div_register input_error'}>
                                <span className="icon"><img src={Email_icon} alt="E-mail Icon" /></span>
                                <input
                                    type="email"
                                    required
                                    maxLength={40}
                                    value={credentials.email}
                                    name="email"
                                    onChange={(e) => {
                                        onChangeInputData(e);
                                    }
                                    }
                                    onBlur={(e) => {
                                        handleInputsValidation(e.target.name, e.target.value);
                                        checkFormValidity();
                                    }}
                                />
                                <label>E-mail</label>
                            </div>
                        </div>

                        <div className="register_input_div_template_main">
                            <div className={isPasswordValid ? 'input_div_register input_default' : 'input_div_register input_error'}>

                                <span className="icon">
                                    {
                                        !passwordFocus ?
                                            (<img src={Password_icon} alt="Password Icon" />)
                                            : (<img src={showPassword ? Hide_Icon : View_Icon} alt={showPassword ? "Hide Password Icon" : "View Password Icon"} onClick={passwordVisibility} />)
                                    }
                                </span>
                                <input type={showPassword ? 'text' : 'password'}
                                    required
                                    name="password"
                                    maxLength={60}
                                    ref={passwordInputRef}
                                    onChange={
                                        (e) => {
                                            onChangeInputData(e);
                                        }
                                    }
                                    onFocus={() => setpasswordFocus(true)}
                                    onBlur={(e) => {
                                        handleInputsValidation(e.target.name, e.target.value);
                                        if (!passwordInputRef.current.value.trim()) {
                                            setpasswordFocus(false);
                                            setShowPassword(false);
                                        };
                                        checkFormValidity();
                                    }
                                    }
                                />
                                <label>Password</label>
                            </div>
                        </div>

                        <div className="register_input_div_template_main">
                            <div className={isCepValid ? 'input_div_cep input_default' : 'input_div_cep input_error'}>
                                <span className="icon"></span>
                                <input
                                    className="input_cep"
                                    type="text"
                                    required
                                    value={cep}
                                    name="cep_location"
                                    onChange={(e) => {
                                        handleCepChange(e);
                                    }}
                                    onBlur={
                                        (e) => {
                                            handleCepSearch(e);
                                            checkFormValidity();
                                        }
                                    }
                                />
                                <label>CEP</label>
                            </div>

                            <div className="link_cepsearch_div">
                                <a href="https://buscacepinter.correios.com.br/app/endereco/index.php" target="_blank">Não sei meu CEP</a>
                            </div>
                        </div>
                        <div className={contentCep ? "cep_content_div_main" : "cep_content_div_main_hide"}>

                            <div className="cep_data_title_div">
                                <span>Dados do Endereço</span>
                            </div>

                            <div className="cep_location_div">
                                <div className="template_bairro_div ">
                                    <span>
                                        {locationData && locationData.bairro !== "" ? locationData.bairro : ""}
                                    </span>
                                </div>
                                <div className="template_localidade_div">
                                    <span>
                                        {locationData && locationData.localidade !== "" ? locationData.localidade : ""}
                                    </span>
                                </div>
                                <div className="template_uf_div">
                                    <span>
                                        {locationData && locationData.uf !== "" ? locationData.uf : ""}
                                    </span>
                                </div>
                            </div>
                            <div className="cep_address_div">
                                <div className="address_div">
                                    <span>
                                        {locationData && locationData.logradouro !== "" ? locationData.logradouro : ""}
                                    </span>
                                </div>
                                <div className="numberaddress_div">
                                    <input
                                        type="number"
                                        placeholder={"Número"}
                                        required
                                        name='address_number'
                                        value={addressNumber}
                                        onChange={(e) => {
                                            handleAddressNumber(e);
                                            console.log(addressNumber);
                                        }}
                                        onBlur={
                                            (e) => {
                                                checkFormValidity();
                                            }
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="submit_button_div">
                        <button type="submit" className="register_button" disabled={!isFormValid}>
                            {
                                formLoading ? <Lottie animationData={LoadingData} loop={true} style={{ height: '100%' }} />
                                    :
                                    <span>Enviar</span>
                            }
                        </button>
                    </div>


                </form>

                <div className="haveaccount_div">
                    <span>
                        Já possui uma conta?
                    </span>
                    <a href="/login" className="link_login">Entrar</a>
                </div>
            </div>
        </div>
    )
}

export default SignUpForm;
