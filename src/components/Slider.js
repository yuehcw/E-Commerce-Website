import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import "./Slider.css";
import cyber_banner from "../image/Cyber.png";
import iphone_banner from "../image/Apple-iPhone-15.jpg";
import samsung_banner from "../image/Samsung.jpg";
import cyber_banner_mobile from "../image/cyber(Mobile).jpg";
import iphone_banner_mobile from "../image/iPhone(Mobile).jpg";
import samsung_banner_mobile from "../image/Samsung(Mobile).jpg";

const Slider = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Carousel autoplay>
      <div className="carousel-slide">
        <img
          src={isMobile ? cyber_banner_mobile : cyber_banner}
          alt="cyber_banner"
        />
      </div>
      <div className="carousel-slide">
        <img
          src={isMobile ? iphone_banner_mobile : iphone_banner}
          alt="iphone_banner"
        />
      </div>
      <div className="carousel-slide">
        <img
          src={isMobile ? samsung_banner_mobile : samsung_banner}
          alt="samsung_banner"
        />
      </div>
    </Carousel>
  );
};
export default Slider;
