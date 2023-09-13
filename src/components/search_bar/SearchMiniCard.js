import React from 'react';
import '../../styles/SearchMiniCard.css';
import CalcPrices from '../component_functions/CalcPrices';

function SearchMiniCard(props) {

  /*****************/
  /*    RENDER 
  /*****************/

  return (
    <div className="searchitem">
      <a className="link_searchitem" href={`/${props.searchProductId}`}>
        <div className="searchproduct_img">
          <img src={`/product_imgs/${props.searchProductType.type1.imgs.img1}`} alt="searchitem-img" />
        </div>
        <div className="searchproduct_content">
          <div className="searchproduct_name_div">
            <div className="searchproduct_name">{props.searchProductName}</div>
          </div>
          <div className="searchproduct_prices_div">
            {
              props.searchProductType.type1.descount !== 0 ?
                <span className="searchitem_initial_price">R${CalcPrices.toStringPrice(props.searchProductInitPrice)}</span>
                : ""
            }
            <span className="searchitem_new_price">R${CalcPrices.calcNewPrice(props.searchProductInitPrice, props.searchProductType.type1.descount)}</span>
          </div>
        </div>
      </a>
    </div>
  )
}

export default SearchMiniCard