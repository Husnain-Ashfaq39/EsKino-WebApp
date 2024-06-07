import React from 'react';
import colors from '../../../colorTheme';

export default function Banner({ bgUrl, imgUrl, title, subTitle }) {
  return (
    <div className="container">
      <div
        className="cs_banner cs_style_1 cs_bg_filed"
        style={{ 
          background: colors.primary, 
          backgroundSize: 'cover',
        }}
      >
        <img 
          src={imgUrl} 
          alt="Banner" 
          className="cs_banner_img rounded-xl"
          style={{
            maxWidth: '100%',
            // width: '100%',
            height: 'auto',
            maxHeight: '45rem' 
          }}
        />
        <h2 className="cs_banner_title cs_heading_color cs_fs_72">{title}</h2>
        <p className="cs_banner_subtitle cs_heading_color cs_fs_20 cs_medium m-0" style={{color: colors.dark}}>
          {subTitle}
        </p>
      </div>
    </div>
  );
}
