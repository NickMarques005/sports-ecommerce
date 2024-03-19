import React, { useState, useEffect } from 'react';
import '../../styles/MainPage.css';
import Card from '../page_template/Card';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductsData from '../component_functions/ProductsData';
import img_offers from "../../imgs/jeffrey-wegrzyn-offers.jpg";
import img_new from "../../imgs/logan-weaver-new.jpg";
import img_style from "../../imgs/jamaal-cooks-style.jpg";
import img_training from "../../imgs/anastase-maragos-training.jpg";
import responsive_main_screen from '../component_functions/Main_Carousel_Responsive';
import MainSlider from './MainSlider';
import NewsLetter from './NewsLetter';
import { LoadingProvider, useLoading } from '../../contexts/LoadingContext';
import LoadingScreen from '../loading/LoadingScreen';

function MainPage() {

    const [mainProductData, setMainProductData] = useState([]);
    const {loading, setLoading} = useLoading();

    useEffect(() => {
        const fetchProductsData = async () => {

            const data = await ProductsData();
            if (data) {
                console.log(data[0]);
                const productsArray = Object.values(data[0]);
                setMainProductData(productsArray);
                setLoading(false);
            }
            else {
                console.log("No data found");
                setLoading(true);
            }
        };

        fetchProductsData();
    }, []);


    const handleFilterData = (type_data) => {
        switch (type_data) {
            case "ofertas":
                const OfferProducts = mainProductData.filter(product => product.type.type1.descount > 0);
                console.log(OfferProducts);
                return OfferProducts.map((items, index) => {
                    return (
                        <div className="carousel_item" key={index}>
                            <Card productId={items._id} productName={items.name} productRating={items.rating} productDesc={items.description} productInitPrice={items.initial_price} productType={items.type} carousel={true} />
                        </div>
                    )
                })

            case "lancamentos":
                const NewProducts = mainProductData.filter(product => product.new == true);
                console.log(NewProducts);
                return NewProducts.map((items, index) => {
                    return (
                        <div className="carousel_item" key={index}>
                            <Card productId={items._id} productName={items.name} productRating={items.rating} productDesc={items.description} productInitPrice={items.initial_price} productType={items.type} carousel={true} />
                        </div>
                    )
                })

            case "estilo":
                const StyleProducts = mainProductData.filter(product => product.subcategory == "style");
                return StyleProducts.map((items, index) => {
                    return (
                        <div className="carousel_item" key={index}>
                            <Card productId={items._id} productName={items.name} productRating={items.rating} productDesc={items.description} productInitPrice={items.initial_price} productType={items.type} carousel={true} />
                        </div>
                    )
                })
                break;

            case "treino":
                const TrainingProducts = mainProductData.filter(product => product.subcategory == "training");
                return TrainingProducts.map((items, index) => {
                    return (
                        <div className="carousel_item" key={index}>
                            <Card productId={items._id} productName={items.name} productRating={items.rating} productDesc={items.description} productInitPrice={items.initial_price} productType={items.type} carousel={true} />
                        </div>
                    )
                })
        }


    };


    /*****************/
    /*    RENDER 
    /*****************/

    return (
        <div className="mainPage_div">
            <div className="slider_main_div">
                <MainSlider />
            </div>

            {
                !loading ?
                <div className="products_presentation_main_div">
                    <div className="products_template_div">
                        <div className="ilustration_product_template_div">
                            <img src={img_offers} alt="img-ilustration" />
                        </div>
                        <div className="carousel_product_template_div">
                            <div className="title_div">
                                <h3>Ofertas</h3>
                            </div>
                            <div className="carousel_div">
                                <Carousel className="carousel_products" responsive={responsive_main_screen}>
                                    {mainProductData.length > 0
                                        ?
                                        handleFilterData("ofertas")
                                        : ""
                                    }
                                </Carousel>
                            </div>
                        </div>
                    </div>
                    <div className="products_template_div">
                        <div className="carousel_product_template_div">
                            <div className="title_div">
                                <h3>Lançamentos</h3>
                            </div>
                            <div className="carousel_div">
                                <Carousel className="carousel_products" responsive={responsive_main_screen}>
                                    {mainProductData.length > 0
                                        ?
                                        handleFilterData("lancamentos")
                                        : ""
                                    }
                                </Carousel>
                            </div>
                        </div>
                        <div className="ilustration_product_template_div">
                            <img src={img_new} alt="img-ilustration" />
                        </div>
                    </div>

                    <div className="products_template_div">
                        <div className="ilustration_product_template_div">
                            <img src={img_style} alt="img-ilustration" />
                        </div>
                        <div className="carousel_product_template_div">
                            <div className="title_div">
                                <h3>Estilo e conforto</h3>
                            </div>
                            <div className="carousel_div">
                                <Carousel className="carousel_products" responsive={responsive_main_screen}>
                                    {mainProductData.length > 0
                                        ?
                                        handleFilterData("estilo")
                                        : ""
                                    }
                                </Carousel>
                            </div>
                        </div>
                    </div>
                    <div className="products_template_div">
                        <div className="carousel_product_template_div">
                            <div className="title_div">
                                <h3>O melhor para seu treino</h3>
                            </div>
                            <div className="carousel_div">
                                <Carousel className="carousel_products" responsive={responsive_main_screen}>
                                    {mainProductData.length > 0
                                        ?
                                        handleFilterData("treino")
                                        : ""
                                    }
                                </Carousel>
                            </div>
                        </div>
                        <div className="ilustration_product_template_div">
                            <img src={img_training} alt="img-ilustration" />
                        </div>
                    </div>
                </div>
                : <LoadingScreen />
            }

            <div className="newletter_main_div">
                <NewsLetter />
            </div>
        </div>
    )
}

export default MainPage