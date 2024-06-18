import React from "react";
import parse from "html-react-parser";
import { heroBgJpeg, heroImgPng, heroimgPng2 } from "../imagepath";
import colors from "../../colorTheme";

export default function Hero({ title, subTitle, bgUrl, imgUrl }) {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 630);
  const [isTablet, setIsTablet] = React.useState(window.innerWidth > 630 && window.innerWidth <= 1024);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const heroImgStyle = isMobile
    ? {
        position: "absolute",
        top: "27%", 
        left: "50%",
        transform: "translate(-50%, 0)",
        maxWidth: "100%",
        maxHeight: "400px",
        width: "auto",
        height: "auto",
        objectFit: "contain",
      }
    : isTablet
    ? {
        position: "absolute",
        top: "0%",
        left: "70%",
        transform: "translateX(-50%)",
        maxWidth: "70%",
        height: "auto",
        width: "auto",
        maxHeight: "500px",
        objectFit: "contain",
        marginLeft: "60px"

      }
    : {
        position: "absolute",
        top: "-15%",
        left: "70%",
        transform: "translateX(-40%)",
        maxWidth: "50%",
        height: "auto",
        width: "auto",
        maxHeight: "650px",
        objectFit: "contain",
        marginLeft: "10px"

      };

  const containerStyle = {
    position: "relative",
    minHeight: isMobile ? "650px" : isTablet ? "650px" : "650px", // Adjust the height for mobile, tablet, and larger screens
    // maxHeight: "100px"
  };

  const titleStyle = {
    fontSize: isMobile ? '2rem' : isTablet ? '3rem' : '3rem', // Adjust the font size for mobile, tablet, and larger screens
    maxWidth: isMobile?"100%":isTablet?"48%": '50%',
   };

  const subTitleStyle = {
    fontSize: isMobile ? '1rem' : isTablet ? '1.5rem' : '1.7rem', // Adjust the font size for mobile, tablet, and larger screens
    fontWeight: 500,
    lineHeight: isTablet?"2.3rem": 'normal',
    maxWidth: isMobile?"100%":isTablet?"48%": '50%',

  };

  return (
    <>
      <section className="cs_hero cs_style_1" style={{ margin: 0, padding: 0 }}>
        <div
          className="cs_hero_wrap cs_bg_filed"
          style={{ backgroundColor: colors.primary }}
        >
          <div className="container" style={containerStyle}>
            <div className="cs_hero_text">
              <h1 className="cs_hero_title text-6xl font-light text-center" style={titleStyle}>
                {parse(title)}
              </h1>
              <p
                className="cs_hero_subtitle cs_heading_color font-light text-center"
                style={subTitleStyle}
              >
                {parse(subTitle)}
              </p>
            </div>
            <img
              src={imgUrl}
              alt="Hero"
              className="cs_hero_img"
              style={heroImgStyle}
            />
          </div>
        </div>
      </section>
    </>
  );
}
