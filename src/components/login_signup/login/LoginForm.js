import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import Email_icon from '../../../imgs/email_icon.png';
import Password_icon from '../../../imgs/password_icon.png';
import View_Icon from '../../../imgs/view_icon.png';
import Hide_Icon from '../../../imgs/hide_icon.png';
import './Login.css';
import { LoginUser } from '../../../services/AuthenticationService';
import { UseAuth } from '../../../contexts/AuthContext';
import LoadingData from '../../../imgs/loading_gif.json';
import Lottie from 'lottie-react';

function LoginForm() {

    let navigate = useNavigate();
    const location = useLocation();

    const { SaveToken } = UseAuth();

    const [isEmailValid, setIsEmailValid] = useState(true);

    const [passwordFocus, setpasswordFocus] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const passwordInputRef = useRef(null);

    const [loginCredentials, setLoginCredentials] = useState({ email: "", password: "" });

    const [formLoading, setFormLoading] = useState(false);
    const [responseError, setResponseError] = useState("");

    const passwordVisibility = () => {
        passwordInputRef.current.focus();
        setShowPassword((prev_password) => !prev_password);
    };

    const validateEmail = (email) => {
        const email_format = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return email_format.test(email);
    };

    const validatePassword = (password) => {
        if (password.length >= 8) {
            return true;
        }
        else {
            return false;
        }
    };

    const handleInputsValidation = (name, value) => {

        let isValid = null;

        switch (name) {
            case "email":
                isValid = validateEmail(value);
                setIsEmailValid(isValid);
                if (!isValid) {
                    setLoginCredentials({ ...loginCredentials, email: "" });
                };
                break;
            case "password":
                isValid = validatePassword(value);
                setIsPasswordValid(isValid);
                console.log(isPasswordValid);
                if (!isValid) {
                    setLoginCredentials({ ...loginCredentials, password: "" });
                };
                break;
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(loginCredentials);
        setFormLoading(true);
        const response = await LoginUser(loginCredentials)
        if (response.success) {
            const { data, message } = response;
            console.log(data);
            console.log(message);
            SaveToken(data.token);
            navigate('/');
            setFormLoading(false);
        }
        else {
            console.log("RESPONSE ERROR: ", response);
            setResponseError(response.error);
        }

        setFormLoading(false);
    }

    const onChangeInputData = (e) => {
        setLoginCredentials({ ...loginCredentials, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    },[location.pathname]);


    return (
        <div className="form_div login">
            {responseError ?
                <div className="error_message">
                    <span>
                        {responseError}
                    </span>
                </div> : ""}
            <div className="login_main_div">
                <div className="title_login_div">
                    <h2 className="h2_loginform"><label className="h2_content1">Entrar</label><label className="h2_content2"> com sua conta Sports</label></h2>

                </div>

                <form className="form_login" onSubmit={handleLogin}>

                    <div className="inputs_div">
                        <div className="login_input_div_template_main">

                            <div className={isEmailValid ? 'input_div_login input_email' : 'input_div_login input_error'}>
                                <span className="icon"><img src={Email_icon} alt="E-mail Icon" /></span>
                                <input type="email"
                                    required
                                    name="email"
                                    maxLength={50}
                                    value={loginCredentials.email}
                                    onChange={(e) => {
                                        onChangeInputData(e);
                                    }}
                                    onBlur={(e) => {
                                        handleInputsValidation(e.target.name, e.target.value);
                                    }}

                                />
                                <label>E-mail</label>
                            </div>
                        </div>

                        <div className="login_input_div_template_main">
                            <div className={isPasswordValid ? 'input_div_login input_default' : 'input_div_login input_error'}>
                                <span className="icon">
                                    {
                                        !passwordFocus ?
                                            (<img src={Password_icon} alt="Password Icon" />)
                                            : (<img src={showPassword ? Hide_Icon : View_Icon} alt={showPassword ? "Hide Password Icon" : "View Password Icon"} onClick={passwordVisibility} />)
                                    }
                                </span>
                                <input type={showPassword ? 'text' : 'password'}
                                    required
                                    maxLength={60}
                                    name="password"
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
                                        }
                                    }
                                    }
                                />
                                <label>Password</label>
                            </div>


                            <div className="forgotpassword_div">
                                <a href="#">Esqueci minha senha</a>
                            </div>

                        </div>
                    </div>

                    <div className="login_button_div">

                        <button type="submit" className="login_button">
                            {
                                formLoading ? <Lottie animationData={LoadingData} loop={true} style={{ height: '100%' }} />
                                    :
                                    <span>
                                        Entrar
                                    </span>
                            }
                        </button>
                    </div>

                </form>

                <div className="haveaccount_div">
                    <span>Ainda não possui conta?</span>
                    <a href="/register" className="link_cadastrar">Cadastre-se</a>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;