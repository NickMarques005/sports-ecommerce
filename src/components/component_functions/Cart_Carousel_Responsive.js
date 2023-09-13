//---Cart_Carousel_Responsive.js---//


const responsive_cart_screen = {
    
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 4,
            slidesToSlide: 3,
        },
        desktop: {
            breakpoint: { max: 1024, min: 800 },
            items: 3,
            slidesToSlide: 2,
        },
        tablet: {
            breakpoint: { max: 800, min: 464 },
            items: 2,
            slidesToSlide: 2,
        },
        mobile_cart: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1,
        }
    
};

export default responsive_cart_screen;
