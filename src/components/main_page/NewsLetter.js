import React from 'react';
import '../../styles/NewsLetter.css';

const NewsLetter = () => {
    return (
        <div class="newsLetter_mainDiv">
            <div class="newsLetter_cardInfo">
                <div class="newsLetter_title">
                    <h2>Assine a nossa NewsLetter!</h2>
                </div>
                <div class="newsLetter_info">
                    <p>Faça sua inscrição para receber nossas novidades e promoções exclusivas</p>
                </div>
                <div class="newsLetter_inputs">
                    <input
                        type="text"
                        placeholder={"Nome"}
                    />
                    <input
                        type="email"
                        placeholder={"E-mail"}
                    />
                </div>
                <div class="newsLetter_subscribeDiv">
                    <button class="newsLetter_subscribeButton"><label>Inscrever-se</label></button>
                </div>
            </div>

        </div>
    )
}

export default NewsLetter