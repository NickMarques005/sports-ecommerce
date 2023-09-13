import React, {useState, useEffect} from 'react';
import HeroSlider, {Slide} from 'hero-slider';
import mainslide1 from "../../imgs/mainslider-pexels-aman-jakhar-tennis.jpg"
import mainslide2 from "../../imgs/mainslider-omar-ram-football.jpg"
import mainslide3 from "../../imgs/mainslider-coen-van-de-broek-cycling.jpg"
import mainslide4 from "../../imgs/mainslider-victor-freitas-training.jpg"
import mainslide5 from "../../imgs/mainslider-arif-maulana-rollerblades.jpg"

function MainSlider() {

  let defaultHeight = "100vh";
  const [sliderHeight, setSliderHeight] = useState(defaultHeight);

  useEffect(() => {
    const handleResize = () => {
      // Adjust slider height based on window width
      const newHeight = window.innerWidth < 800 ? '50vh' : defaultHeight;
      setSliderHeight(newHeight);
    };

    handleResize(); // Call on component mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [defaultHeight]);


  /*****************/
  /*    RENDER 
  /*****************/

  return (
    <HeroSlider
      
      autoplay={{
        autoplayDebounce: 1000,
        autoplayDuration: 5000,
      }}

      controller={{
        slidingDuration: 300,
        slidingDelay: 100, 
        initialSlide: 1
      }}

      height={sliderHeight}
    >
        <Slide
          background={
            {
              backgroundImageSrc: mainslide1,
              backgroundImageClassName: "img_slide"
            }
          }
        />
        <Slide
          background={
            {
              backgroundImageSrc: mainslide2,
              backgroundImageClassName: "img_slide"
            }
          }
        />
        <Slide
          background={
            {
              backgroundImageSrc: mainslide3,
              backgroundImageClassName: "img_slide"
            }
          }
        />
        <Slide
          background={
            {
              backgroundImageSrc: mainslide4,
              backgroundImageClassName: "img_slide"
            }
          }
        />
        <Slide
          background={
            {
              backgroundImageSrc: mainslide5,
              backgroundImageClassName: "img_slide"
            }
          }
        />
    </HeroSlider>
  )
}

export default MainSlider;