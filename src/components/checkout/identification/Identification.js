import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LevelCheckout from '../LevelCheckout';
import './Identification.css';
import { FormatCep, FormatCpf, FormatPhone } from '../../../utils/DataFormats';
import { UseIdentification } from '../../../contexts/IdentificationContext';
import { validateCep, validateCpf, validateEmail, validateName, validatePhone } from '../../../utils/Validation';
import { UseAuth } from '../../../contexts/AuthContext';
import HandleLevelCheckoutPage from '../../../utils/CheckoutHandling';
import { useCart } from '../../../contexts/CartContext';

function Identification(props) {

    let navigate = useNavigate();
    let { identificationData, setIdentificationData } = UseIdentification();
    const { userData, authToken } = UseAuth();
    let cartData = useCart();

    const [isFormValid, setIsFormValid] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});

    const UpdateErrorMessages = (errors) => {
        setErrorMessages(errors);
    };

    const ClearErrorMessage = () => {
        setErrorMessages({});
    };

    const HandleInputChange = (event) => {
        const { name, value } = event.target;
        if (Object.values(errorMessages).length !== 0) {
            ClearErrorMessage();
        }

        let formattedValue = value;

        if(name === 'telefone')
        {
            formattedValue = FormatPhone(value);
        }
        else if(name === 'cpf')
        {
            formattedValue = FormatCpf(value);
        }
        else if (name === 'cep_number') {
            formattedValue = FormatCep(value);

            setIdentificationData(prevState => ({
                ...prevState,
                cep_location: {
                    ...prevState.cep_location,
                    [name]: formattedValue
                }
            }))

            return;
        }

        setIdentificationData({
            ...identificationData,
            [name]: formattedValue
        });
    };

    const HandleAddressNumber = (event) => {
        const number = event.target.value;
        if (number.length <= 5) {
            setIdentificationData(prevState => ({
                ...prevState,
                cep_location: {
                    ...prevState.cep_location,
                    number: number
                }
            }));
        }
    }

    const ValidateAllFields = (data) => {
        let errors = {};
        let isFormStillValid = true;
        console.log(data);

        if (!data.name || !data.email || !data.telefone || !data.cpf || !data.cep_location) {
            UpdateErrorMessages("Houve um erro! Todos os campos não foram preenchidos");
            return false;
        }

        const isNameValid = validateName(data.name);
        if (!isNameValid) {
            errors.name = 'Nome inválido';
            isFormStillValid = false;
        }
        const isEmailValid = validateEmail(data.email);
        if (!isEmailValid) {
            errors.email = 'E-mail inválido';
            isFormStillValid = false;
        }
        const isPhoneValid = validatePhone(data.telefone);
        if (!isPhoneValid) {
            errors.telefone = 'Telefone inválido';
            isFormStillValid = false;
        }
        const isCpfValid = validateCpf(data.cpf);
        if (!isCpfValid) {
            errors.cpf = 'Cpf inválido';
            isFormStillValid = false;
        }
        const isCepValid = validateCep(data.cep_location.cep_number);
        if (!isCepValid) {
            errors.cep = 'Cep inválido';
            isFormStillValid = false;
        }

        UpdateErrorMessages(errors);
        return isFormStillValid
    }

    const HandleIdentityConfirmation = (identification) => {
        const isFormStillValid = ValidateAllFields(identification);
        if (isFormStillValid) {
            console.log("DADOS VÁLIDOS: ", identification);
            console.log(cartData);
            HandleLevelCheckoutPage(navigate, "pagamento", props.page, {cartDataLength: cartData.length, identificationData: identificationData}, authToken)
        }
        else{
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
    }

    useEffect(() => {
        console.log(userData);
        if(userData && (!identificationData.name || !identificationData.email || !identificationData.cep_number))
        {
            setIdentificationData(prev => ({
                ...prev,
                name: prev.name || userData.name,
                email: prev.email || userData.email,
                cep_location: {
                    ...prev.cep_location,
                    cep_number: prev.cep_location.cep_number || userData.cep_location.cep_number,
                }
            }));
        }
    }, []);

    useEffect(() => {
        const isEveryFieldFilled = Object.values(identificationData).every(value => {
            if (typeof value === 'object') {
                return Object.values(value).every(innerValue => innerValue.trim() !== '');
            }
            return value.trim() !== '';
        });

        setIsFormValid(isEveryFieldFilled);
    }, [identificationData]);

    useEffect(() => {
        if (props.group_data.length === 0) {
            navigate("/compra/");
        }
    }, [navigate]);

    useEffect(() => {
        const fetchAddress = async () => {
            if (identificationData.cep_location.cep_number.replace(/\D/g, '').length === 8) {
                const response = await fetch(`https://viacep.com.br/ws/${identificationData.cep_location.cep_number}/json/`);
                const data = await response.json();
                console.log("Cep Data: ", data);
                if (!data.erro) {
                    setIdentificationData(prevState => ({
                        ...prevState,
                        cep_location: {
                            ...prevState.cep_location,
                            logradouro: data.logradouro,
                            bairro: data.bairro,
                            localidade: data.localidade,
                            uf: data.uf
                        }
                    }));
                }
            }
        };

        fetchAddress();
    }, [identificationData.cep_location.cep_number]);

    return (
        <div className="identification_div">
            {
                Object.keys(errorMessages).length !== 0 ?
                    <div className="error_messages_div">
                        {Object.keys(errorMessages).map((key) => (
                            <p key={key}>{errorMessages[key]}</p>
                        ))}
                    </div>
                    : ""
            }
            <div className="identification_personalData_div">
                <div className="identification_personalData_title">
                    <h2>Dados Pessoais</h2>
                </div>
                <div className="identification_personalData_section_div">
                    <div className="identification_personalData_template_div">
                        <div className="identification_personalData_info">
                            <div className="identification_personalData_name">
                                <span>Nome:</span>
                            </div>
                            <div className="identification_personalData_input">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Seu Nome Completo"
                                    value={identificationData.name}
                                    onChange={HandleInputChange}
                                />
                            </div>
                        </div>
                        <div className="identification_personalData_info">
                            <div className="identification_personalData_name">
                                <span>E-mail:</span>
                            </div>
                            <div className="identification_personalData_input">
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Seu E-mail"
                                    value={identificationData.email}
                                    onChange={HandleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>


                <div className="identification_personalData_section_div">
                    <div className="identification_personalData_template_div">
                        <div className="identification_personalData_info">
                            <div className="identification_personalData_name">
                                <span>Telefone: </span>
                            </div>
                            <div className="identification_personalData_input">
                                <input
                                    type="tel"
                                    name="telefone"
                                    placeholder="(DDD) 00000-0000"
                                    value={FormatPhone(identificationData.telefone)}
                                    onChange={HandleInputChange}
                                />
                            </div>
                        </div>
                        <div className="identification_personalData_info">
                            <div className="identification_personalData_name">
                                <span>CPF:</span>
                            </div>
                            <div className="identification_personalData_input">
                                <input
                                    type="text"
                                    name="cpf"
                                    placeholder="000.000.000-00"
                                    value={FormatCpf(identificationData.cpf)}
                                    onChange={HandleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="identification_personalData_template_div">
                    <div className="identification_personalData_info">
                        <div className="identification_personalData_name">
                            <span>CEP:</span>
                        </div>
                        <div className="identification_personalData_input">
                            <input
                                type="text"
                                name="cep_number"
                                placeholder="CEP"
                                value={FormatCep(identificationData.cep_location.cep_number)}
                                onChange={HandleInputChange}
                            />
                        </div>
                    </div>
                    <div className="identification_personalData_info">

                    </div>
                </div>
                <div className="cep_content_div_main">
                    <div className="cep_data_title_div">
                        <span>Dados do Endereço</span>
                    </div>

                    <div className="cep_location_div">
                        <div className="template_bairro_div ">
                            <span>{identificationData.cep_location.bairro}</span>
                        </div>
                        <div className="template_localidade_div">
                            <span>{identificationData.cep_location.localidade}</span>
                        </div>
                        <div className="template_uf_div">
                            <span>{identificationData.cep_location.uf}</span>
                        </div>
                    </div>
                    <div className="cep_address_div">
                        <div className="address_div">
                            <span>{identificationData.cep_location.logradouro}</span>
                        </div>
                    </div>
                    <div className="numberaddress_div">
                        <input
                            type="number"
                            placeholder={"Número"}
                            required
                            name='address_number'
                            value={identificationData.cep_location.number}
                            onChange={(e) => {
                                HandleAddressNumber(e);
                            }}
                        />
                    </div>
                </div>

                <div className={`identification_personalData_next`}>
                    <button className={!isFormValid ? "disabled" : ""} onClick={() => HandleIdentityConfirmation(identificationData)} disabled={!isFormValid}>Ir para pagamento</button>
                </div>

            </div>
        </div>
    )
}

export default Identification