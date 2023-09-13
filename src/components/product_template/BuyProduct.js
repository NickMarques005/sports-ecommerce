import React, { useState, useEffect } from 'react';
import '../../styles/BuyProduct.css';
import { useParams } from 'react-router-dom';
import { BuyProductData } from '../component_functions/BuyProductData';
import CalcPrices from '../component_functions/CalcPrices';
import { useDispatchCart, useCart } from '../../contexts/CartContext';


function BuyProduct() {

    let dispatch = useDispatchCart();
    let data = useCart();


    const [buyProductData, setBuyProductData] = useState(null);
    const [currentTypeProduct, setCurrentTypeProduct] = useState("type1");
    const [currentTypeData, setCurrentTypedata] = useState(null);
    const [currentImgsData, setCurrentImgsData] = useState(null);

    const descriptionWithLineBreaks = buyProductData && buyProductData.description ? buyProductData.description.replace(/\/n/g, '<br>') : "";

    const { id } = useParams();

    const [sizeProduct, setSizeProduct] = useState(null);
    const [quantityProduct, setQuantityProduct] = useState(null);

    useEffect(() => {

        const fetchBuyProductData = async () => {
            const data = await BuyProductData(id);
            if (data) {
                console.log("PRODUCT DATA: ", data.filteredProduct[0]);
                setBuyProductData(data.filteredProduct[0]);

            }
            else {

                console.log("No data found");

            }
        }

        fetchBuyProductData();

    }, [id]);

    useEffect(() => {

        const handleTypeProducts = () => {

            if (buyProductData && buyProductData.type && buyProductData.type[currentTypeProduct]) {
                const currentType = buyProductData.type[currentTypeProduct];
                const imgsType = buyProductData.type[currentTypeProduct].imgs;
                const imgsTypeArray = Object.values(imgsType);
                console.log("CURRENT TYPE: ");
                console.log(currentType);
                setCurrentTypedata(currentType);
                setCurrentImgsData(imgsTypeArray);
            }
        }
        handleTypeProducts();
    }, [buyProductData, currentTypeProduct]);

    const handleChangeType = (type) => {
        if (currentTypeProduct !== type) {
            if(sizeProduct)
            {
                setSizeProduct(null);
            }
            setCurrentTypeProduct(type);
            console.log(type);
            console.log(sizeProduct);
        }
        else {
            console.log("SAME TYPE");
            return
        }

    }

    const handleSizeProduct = (size, quantity) => {
        if(sizeProduct == size)
        {
            setSizeProduct(null);
            setQuantityProduct(null);
        }
        else{
            setSizeProduct(size);
            setQuantityProduct(quantity);
        }
        console.log("CURRENT SIZE: ", size);
        console.log("CURRENT QUANTITY; ", quantity);
    }

    const handleAddItemCart = async () => {
        if (sizeProduct != null) {
            console.log("EXECUTAR ADD CART");
            if (buyProductData && currentTypeData) 
            {
                const cartItem = {
                    id: buyProductData._id,
                    name: buyProductData.name,
                    img: currentTypeData.imgs.img1,
                    init_price: CalcPrices.toStringPrice(buyProductData.initial_price),
                    final_price: CalcPrices.calcNewPrice(buyProductData.initial_price, currentTypeData.descount),
                    final_condition: currentTypeData.condition_price,
                    descount: currentTypeData.descount,
                    size: sizeProduct,
                    color: currentTypeData.color,
                    quantity: quantityProduct
                }

                await dispatch({ type: "ADD", id: buyProductData._id, name: buyProductData.name, img: currentTypeData.imgs.img1, init_price: CalcPrices.toStringPrice(buyProductData.initial_price), final_price: CalcPrices.calcNewPrice(buyProductData.initial_price, currentTypeData.descount), final_condition: currentTypeData.condition_price, descount: currentTypeData.descount, size: sizeProduct, color: currentTypeData.color, quantity: quantityProduct});
                console.log(data);

                const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
                const updatedCart = [...currentCart, cartItem];
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                console.log(updatedCart);
            }
        }
        else{
            console.log("ESCOLHA UM SIZE!");
        }
    }

    /*****************/
    /*    RENDER 
    /*****************/

    return (
        <div className="buyProductTemplate_main_div">
            <div className="buyProductTemplate_ImgsInfo_div">
                <div className="buyProductTemplate_imgs_div">

                    <div className="buyProductTemplate_img_section">
                        {
                            currentTypeData ?
                                <div className="buyProduct_imgMain">
                                    <img src={`/product_imgs/${currentImgsData[0]}`} alt="product_img" />
                                </div>
                                : ""
                        }

                        {
                            currentImgsData && currentImgsData.length > 2 ?
                                <ul>
                                    {
                                        currentTypeData ?
                                            currentImgsData.map((img, index) => {

                                                if (index > 0) {
                                                    return (
                                                        <li key={index}>
                                                            <img src={`/product_imgs/${img}`} alt="product_img" />
                                                        </li>
                                                    )
                                                }
                                            })
                                            : ""
                                    }
                                </ul>
                                : ""}
                        {
                            currentImgsData && currentImgsData.length == 2 ?
                                <div className="buyProduct_secImg">
                                    <img src={`/product_imgs/${currentImgsData[1]}`} alt="product_img" />
                                </div>
                                : ""

                        }

                    </div>

                    <div className="buyProductTemplate_description_div">

                        <p dangerouslySetInnerHTML={{ __html: descriptionWithLineBreaks }} />
                    </div>
                </div>

                <div className="buyProductTemplate_info_div">

                    <div className="buyProductTemplate_name_div">
                        <h1>{buyProductData ? buyProductData.name : ""}</h1>
                        <span>{buyProductData ? buyProductData.category : ""}</span>
                    </div>

                    <div className="buyProductTemplate_price_div">


                        {
                            currentTypeData ?
                                <span className="buyProduct_newPrice">R${buyProductData ? CalcPrices.calcNewPrice(buyProductData.initial_price, currentTypeData.descount) : ""}</span>
                                : ""
                        }

                        {
                            currentTypeData && currentTypeData.descount != 0 ?
                                <div className="buyProduct_prices_descount_div">
                                    <span className="buyProduct_initPrice">R${CalcPrices.toStringPrice(buyProductData.initial_price)}</span>
                                    <span className="buyProduct_descount">-{currentTypeData.descount}% off</span>
                                </div>
                                : ""
                        }

                    </div>

                    {
                        currentTypeData && currentTypeData.condition_price ?
                            <div className="buyProduct_condition_div">
                                <span className="buyProduct_condition">ou {currentTypeData.condition_price}x de R${
                                    currentTypeData.descount !== 0 ? CalcPrices.calcCondition(CalcPrices.calcNewPrice(buyProductData.initial_price, currentTypeData.descount), currentTypeData.condition_price)
                                        : CalcPrices.calcCondition(buyProductData.initial_price, currentTypeData.condition_price)
                                }</span>
                            </div>

                            : ""

                    }

                    <div className="buyProductTemplate_type_main_div">
                        <div className="buyProductTemplate_color_div">
                            <span><strong>{`Cor: `}</strong>{currentTypeData && currentTypeData.color ? currentTypeData.color : ""}</span>
                        </div>

                        <div className="buyProductTemplate_types_div">


                            <ul>
                                {
                                    buyProductData && buyProductData.type
                                    && Object.keys(buyProductData.type).map((key, index) => {

                                        const type = buyProductData.type[key];


                                        return (
                                            <li onClick={() => handleChangeType(key)} key={index}>
                                                <img className="itemType_img" src={`/product_imgs/${type.imgs.img1}`} alt={`product_img_${key}`} />
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>

                        <div className="buyProductTemplate_sizes_div">
                            <span><strong>{"Tamanho: "}</strong>{sizeProduct ? sizeProduct : ""}</span>
                            <div className="buyProduct_size_ul_div">
                                <ul>
                                    {
                                        currentTypeData && currentTypeData.sizes
                                        && currentTypeData.sizes.map((sizeObj, index) => {
                                            const { size, quantity } = sizeObj;

                                            return (
                                                <li key={index} className={`buyProduct_size_li ${quantity == 0 ? "off" : "on"} ${sizeProduct == size ? "add" : ""}`} onClick={() => handleSizeProduct(size, quantity)}>

                                                    <span className="itemType_size">
                                                        {`${size}`}
                                                    </span>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="buyProductTemplate_purchaseWishlist_div">
                        <button onClick={() => handleAddItemCart()} className="buyProduct_purchaseButton">Adicionar ao carrinho</button>
                        <button className="buyProduct_wishListButton">Salvar como favoritos</button>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default BuyProduct