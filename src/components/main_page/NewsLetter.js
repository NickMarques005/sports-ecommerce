import React from 'react';
import '../../styles/NewsLetter.css';

const NewsLetter = () => {
    return (
        <div className="newsLetter_mainDiv">
            <div className="newsLetter_cardInfo">
                <div className="newsLetter_title">
                    <h2>Assine a nossa NewsLetter!</h2>
                </div>
                <div className="newsLetter_info">
                    <p>Faça sua inscrição para receber nossas novidades e promoções exclusivas</p>
                </div>
                <div className="newsLetter_inputs">
                    <input
                        type="text"
                        placeholder={"Nome"}
                    />
                    <input
                        type="email"
                        placeholder={"E-mail"}
                    />
                </div>
                <div className="newsLetter_subscribeDiv">
                    <button className="newsLetter_subscribeButton"><label>Inscrever-se</label></button>
                </div>
            </div>

        </div>
    )
}

export default NewsLetter