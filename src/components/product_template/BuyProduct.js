import React, { useState, useEffect } from 'react';
import '../../styles/BuyProduct.css';
import { useParams } from 'react-router-dom';
import CalcPrices from '../../utils/CalcPrices';
import { useDispatchCart, useCart } from '../../contexts/CartContext';
import { GetProductById } from '../../services/ProductsService';


function BuyProduct() {

    let dispatch = useDispatchCart();

    const [buyProductData, setBuyProductData] = useState(null);
    const [currentTypeProduct, setCurrentTypeProduct] = useState(0);
    const [currentTypeData, setCurrentTypedata] = useState(null);
    const [currentImgsData, setCurrentImgsData] = useState(null);

    const descriptionWithLineBreaks = buyProductData && buyProductData.description ? buyProductData.description.replace(/\/n/g, '<br>') : "";

    const { id } = useParams();

    const [sizeProduct, setSizeProduct] = useState(null);
    const [quantityProduct, setQuantityProduct] = useState(null);

    useEffect(() => {

        const fetchBuyProductData = async (idProduct) => {
            const response = await GetProductById(idProduct)
            if (response.success) {
                const { data, message } = response;
                console.log("PRODUCT DATA: ", data);
                setBuyProductData(data);
                return;
            }

            console.error("Nenhum dado encontrado sobre o produto em questão");
        }

        fetchBuyProductData(id);

    }, [id]);

    useEffect(() => {

        const handleTypeProducts = () => {

            if (buyProductData && buyProductData.types && buyProductData.types.length > currentTypeProduct) {
                const currentType = buyProductData.types[currentTypeProduct];
                const imgsTypeArray = currentType.imgs ? currentType.imgs : [];
                console.log("CURRENT TYPE: ", currentType);
                console.log("IMAGENS: ", imgsTypeArray);
                setCurrentTypedata(currentType);
                setCurrentImgsData(imgsTypeArray);
            }
        }
        handleTypeProducts();
    }, [buyProductData, currentTypeProduct]);

    const handleChangeType = (type) => {
        if (currentTypeProduct !== type) {
            if (sizeProduct) {
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
        if (sizeProduct === size) {
            setSizeProduct(null);
            setQuantityProduct(null);
        }
        else {
            setSizeProduct(size);
            setQuantityProduct(quantity);
        }
        console.log("CURRENT SIZE: ", size);
        console.log("CURRENT QUANTITY; ", quantity);
    }

    const handleAddItemCart = async () => {
        if (sizeProduct != null) {
            console.log("EXECUTAR ADD CART");
            if (buyProductData && currentTypeData) {
                const cartItem = {
                    id: buyProductData._id,
                    name: buyProductData.name,
                    img: currentTypeData.imgs[0],
                    init_price: CalcPrices.toStringPrice(buyProductData.initial_price),
                    final_price: CalcPrices.calcNewPrice(buyProductData.initial_price, currentTypeData.discount),
                    final_condition: currentTypeData.condition_price,
                    discount: currentTypeData.discount,
                    size: sizeProduct,
                    color: currentTypeData.color,
                    quantity: quantityProduct
                }

                await dispatch({ type: "ADD", item: cartItem });
                console.log(cartItem);

                const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
                const updatedCart = [...currentCart, cartItem];
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                console.log(updatedCart);
            }
        }
        else {
            console.log("ESCOLHA UM SIZE!");
        }
    }

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
                                <span className="buyProduct_newPrice">R${buyProductData ? CalcPrices.calcNewPrice(buyProductData.initial_price, currentTypeData.discount) : ""}</span>
                                : ""
                        }

                        {
                            currentTypeData && currentTypeData.discount != 0 ?
                                <div className="buyProduct_prices_discount_div">
                                    <span className="buyProduct_initPrice">R${CalcPrices.toStringPrice(buyProductData.initial_price)}</span>
                                    <span className="buyProduct_discount">-{currentTypeData.discount}% off</span>
                                </div>
                                : ""
                        }

                    </div>

                    {
                        currentTypeData && currentTypeData.condition_price ?
                            <div className="buyProduct_condition_div">
                                <span className="buyProduct_condition">ou {currentTypeData.condition_price}x de R${
                                    currentTypeData.discount !== 0 ? CalcPrices.calcCondition(CalcPrices.calcNewPrice(buyProductData.initial_price, currentTypeData.discount), currentTypeData.condition_price)
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
                                    buyProductData && buyProductData.types
                                    && buyProductData.types.map((type, index) => {

                                        return (
                                            <li onClick={() => handleChangeType(index)} key={index}>
                                                <img className="itemType_img" src={`/product_imgs/${type.imgs[0]}`} alt={`product_img_${index}`} />
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