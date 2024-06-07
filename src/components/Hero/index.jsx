import React from "react";
import parse from "html-react-parser";
import { heroBgJpeg, heroImgPng, heroimgPng2 } from "../imagepath";
import colors from "../../colorTheme";

export default function Hero({ title, subTitle, bgUrl, imgUrl }) {
  return (
    <section className="cs_hero cs_style_1">
      <div
        className="cs_hero_wrap cs_bg_filed"
        style={{ backgroundColor: colors.primary }}
      >
        <div className="container">
          <div className="cs_hero_text">
            <h1 className="cs_hero_title cs_fs_94 text-6xl font-semibold">
              {parse(title)}
            </h1>
            <p className="cs_hero_subtitle cs_fs_20 cs_heading_color" style={{ color: colors.dark }}>
              {parse(subTitle)}
            </p>
          </div>
          <img
            src={imgUrl}
            alt="Hero"
            className="cs_hero_img"
            style={{
              position: "absolute",
              bottom: "100px",
              top:'7%',
              left: "70%",
              transform: "translateX(-40%)",
              maxWidth: "50%",
              height: "auto",
              width: "auto",
              maxHeight: "850px" ,
              objectFit: "contain"
            }}
          />
        </div>
      </div>
    </section>
  );
}
