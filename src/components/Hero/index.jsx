import React from "react";
import parse from "html-react-parser";
import { heroBgJpeg, heroImgPng, heroimgPng2 } from "../imagepath";
import colors from "../../colorTheme";
import Spacing from "../Spacing";

export default function Hero({ title, subTitle, bgUrl, imgUrl }) {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const heroImgStyle = isMobile
    ? {
        position: "absolute",
        top: "100%", 
        left: "50%",
        transform: "translate(-50%, 0)",
        maxWidth: "100%",
        maxHeight: "400px",
        width: "auto",
        height: "auto",
        objectFit: "contain",
      }
    : {
        position: "absolute",
        top: "-22%",
        left: "70%",
        transform: "translateX(-40%)",
        maxWidth: "50%",
        height: "auto",
        width: "auto",
        maxHeight: "850px",
        objectFit: "contain",
      };

  return (
    <>
      <section className="cs_hero cs_style_1">
        <div
          className="cs_hero_wrap cs_bg_filed"
          style={{ backgroundColor: colors.primary }}
        >
          <div className="container" style={{ position: "relative" }}>
            <div className="cs_hero_text">
              <h1 className="cs_hero_title text-6xl font-light" style={{ fontSize: isMobile ? '7vw' : '4vw' }}>
                {parse(title)}
              </h1>
              <p
                className="cs_hero_subtitle cs_heading_color font-light"
                style={{ color: colors.dark, fontSize: isMobile ? '4vw' : '2vw' }}
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
      <div>{isMobile ? <Spacing md="200" lg="180" /> : null}</div>
    </>
  );
}
