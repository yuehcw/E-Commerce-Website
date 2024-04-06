import React from "react";
import { Carousel } from "antd";
import "./Slider.css";
import cyber_banner from "../image/Cyber.png";
import iphone_banner from "../image/Apple-iPhone-15.jpg";
import samsung_banner from "../image/Samsung.jpg";

const Slider = () => {
  return (
    <Carousel autoplay>
      <div className="carousel-slide">
        <img src={cyber_banner} alt="cyber_banner" />
      </div>
      <div className="carousel-slide">
        <img src={iphone_banner} alt="iphone_banner" />
      </div>
      <div className="carousel-slide">
        <img src={samsung_banner} alt="samsung_banner" />
      </div>
    </Carousel>
  );
};
export default Slider;
