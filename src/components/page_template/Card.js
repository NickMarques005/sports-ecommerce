import React,{useState} from 'react'
import icon_star_empty from '../../imgs/stars_rating_empty.png';
import icon_stars_4 from '../../imgs/star_rating_4.png';
import '../../styles/Card.css';
import CalcPrices from '../../utils/CalcPrices';

function Card(props) {

    const handleBuyProduct = (id) => {
        console.log("ID: ", id);
    }

    const hasDiscount = props.productType[0] && props.productType[0].discount !== undefined && props.productType[0].discount !== 0;
    
    const hasMultipleImages = props.productType[0] && props.productType[0].imgs.length > 1;

    const ratingAmount = props.productRating ? props.productRating.rating_amount : 0;

    return (
        <div className={`item ${props.carousel ? "carousel" : ""}`}>
            <a className={`link_item ${props.carousel ? "carousel" : ""}`} target="_blank" href={`/product/${props.productId}`} onClick={() => {handleBuyProduct(props.productId)}}>
                <div className="product_image">
                    {hasDiscount ? <div className="discount_div">
                        <label className="discount_label">
                            {-props.productType[0].discount}%
                        </label>
                    </div> : ""}
                    <div className="item_div">
                        {   hasMultipleImages ?
                                <>
                                    <img className="item_img img1" src={`/product_imgs/${props.productType[0].imgs[0]}`} alt="item-img" />
                        
                                    <img className="item_img img2" src={`/product_imgs/${props.productType[0].imgs[1]}`} alt="item-img"/>
                                </>
                            : <img className="item_img img" src={`/product_imgs/${props.productType[0].imgs[0]}`} alt="item-img" />
                        }
                    </div>
                </div>

                <div className={`product_content ${props.carousel ? "carousel" : ""}`}>
                    <span className="product_name">{props.productName}</span>
                    <div className="product_prices">
                        {
                            hasDiscount ?
                            <span className="item_initial_price">R${CalcPrices.toStringPrice(props.productInitPrice)}</span>
                            : ""
                        }
                        <span className="item_new_price">R${ hasDiscount ? CalcPrices.calcNewPrice(props.productInitPrice, props.productType[0].discount) : props.productInitPrice}</span>
                        {
                            props.productType[0].condition_price !== undefined ?
                            <div className="item_condition">
                                <label>Até {props.productType[0].condition_price}x de R$ 
                                {
                                    hasDiscount ? CalcPrices.calcCondition(CalcPrices.calcNewPrice(props.productInitPrice, props.productType[0].discount), props.productType[0].condition_price)
                                    : CalcPrices.calcCondition(props.productInitPrice, props.productType[0].condition_price)
                                } sem juros</label>
                            </div>
                            : ""
                        }
                    </div>
                    
                    {    props.productType.length > 1 ?
                        <div className="product_presentation">
                        <span className="item_types">
                            {props.productType.length} cores
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
                            <span className="reviewsCount">({ratingAmount})</span>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default Card