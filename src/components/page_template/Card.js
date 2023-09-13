import React,{useState} from 'react'
import icon_star_empty from '../../imgs/stars_rating_empty.png';
import icon_stars_4 from '../../imgs/star_rating_4.png';
import '../../styles/Card.css';
import CalcPrices from '../component_functions/CalcPrices';

function Card(props) {

    const handleBuyProduct = (id) => {
        console.log("ID: ", id);
    }

    /*****************/
    /*    RENDER 
    /*****************/

    return (
        <div className={`item ${props.carousel ? "carousel" : ""}`}>
            <a className={`link_item ${props.carousel ? "carousel" : ""}`} target="_blank" href={`${props.productId}`} onClick={() => {handleBuyProduct(props.productId)}}>
                <div className="product_image">
                    {props.productType.type1.descount !== 0 ? <div className="descount_div">
                        <label className="descount_label">
                            {-props.productType.type1.descount}%
                        </label>
                    </div> : ""}
                    <div className="item_div">
                        {   Object.values(props.productType.type1.imgs).length > 1 ?
                                <>
                                    <img className="item_img img1" src={`/product_imgs/${props.productType.type1.imgs.img1}`} alt="item-img" />
                        
                                    <img className="item_img img2" src={`/product_imgs/${props.productType.type1.imgs.img2}`} alt="item-img"/>
                                </>
                            : <img className="item_img img" src={`/product_imgs/${props.productType.type1.imgs.img1}`} alt="item-img" />
                        }
                    </div>
                </div>

                <div className={`product_content ${props.carousel ? "carousel" : ""}`}>
                    <span className="product_name">{props.productName}</span>
                    <div className="product_prices">
                        {
                            props.productType.type1.descount !== 0 ?
                            <span className="item_initial_price">R${CalcPrices.toStringPrice(props.productInitPrice)}</span>
                            : ""
                        }
                        <span className="item_new_price">R${CalcPrices.calcNewPrice(props.productInitPrice, props.productType.type1.descount)}</span>
                        {
                            props.productType.type1.condition_price !== 0 ?
                            <div className="item_condition">
                                <label>Até {props.productType.type1.condition_price}x de R$ 
                                {
                                    props.productType.type1.descount !== 0 ? CalcPrices.calcCondition(CalcPrices.calcNewPrice(props.productInitPrice, props.productType.type1.descount), props.productType.type1.condition_price)
                                    : CalcPrices.calcCondition(props.productInitPrice, props.productType.type1.condition_price)
                                } sem juros</label>
                            </div>
                            : ""
                        }
                    </div>
                    
                    {    Object.values(props.productType).length > 1 ?
                        <div className="product_presentation">
                        <span className="item_types">
                            {Object.values(props.productType).length} cores
                        </span>
                    </div>
                    : ""}

                    <div className="product_rating">
                        <div className="display_rating">

                            <div className="rating_stars_div">
                                <div className="rating_stars_off">
                                    <img src={icon_star_empty} alt="star_rating_empty" className="rating_stars_empty_icon" />
                                </div>
                                <div className="rating_stars_on">
                                    <img src={icon_stars_4} alt="stars_rating_4" className="stars_rating_icon" />
                                </div>
                            </div>
                            <span className="reviewsCount">({props.productRating.rating_amount})</span>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default Card