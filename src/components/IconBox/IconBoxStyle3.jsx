import React from 'react';
import parse from 'html-react-parser';
import { backgroundImg } from '../imagepath';

export default function IconBoxStyle3({ title, subTitle, iconUrl, number }) {
  return (
    <div className="cs_iconbox cs_style_3">
      <div className="cs_iconbox_left">
        <div className="cs_iconbox_icon cs_center">
          {/* Apply CSS styles to fill the image into the box */}
          <img src={backgroundImg} alt="Image" className='rounded' style={{ width: '55%', height: '55%', objectFit: 'cover' }} />
        </div>
      </div>
      <div className="cs_iconbox_right">
        <h4 className="cs_iconbox_number">{number}</h4>
        <h2 className="cs_iconbox_title cs_fs_32 cs_semibold">
          {parse(title)}
        </h2>
        <p className="cs_iconbox_subtitle m-0">{parse(subTitle)}</p>
      </div>
    </div>
  );
}
