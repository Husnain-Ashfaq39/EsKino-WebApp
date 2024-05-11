import React from 'react';
import parse from 'html-react-parser';
import {heroBgJpeg,  heroImgPng } from '../imagepath';


export default function Hero({
  title,
  subTitle,
  bgUrl,
  imgUrl,
 
  infoList,
  btnText,
  btnUrl,
}) {
  return (
    <section className="cs_hero cs_style_1">
      <div
        className="cs_hero_wrap cs_bg_filed"
        style={{ backgroundImage: `url(${heroBgJpeg})`}}
      >
        <div className="container">
          <div className="cs_hero_text">
            <h1 className="cs_hero_title cs_fs_94">{parse(title)}</h1>
            <p className="cs_hero_subtitle cs_fs_20 cs_heading_color">
              {parse(subTitle)}
            </p>
            
          </div>
          <img src={heroImgPng} alt="Hero" className="cs_hero_img" />
       
         
        </div>
       
     
          
      </div>
    </section>
  );
}
