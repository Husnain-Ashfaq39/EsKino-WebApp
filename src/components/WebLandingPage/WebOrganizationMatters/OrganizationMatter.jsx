import React from 'react';

export default function OrganizationMatter({ iconSrc, title, subTitle }) {
  return (
    <div className="cs_feature cs_style_1 cs_shadow_1 cs_radius_25 cs_white_bg">
      {/* Hover effect of the card title lies in cs_feature_title*/}
      <h2 className="cs_feature_title  cs_fs_40 cs_center font-medium		">
        {/* <span className="cs_feature_icon cs_accent_bg cs_center rounded-circle">
        </span> */}
        <span className='font-medium'>{title}</span>
      </h2>
      <p className="m-0 text-center font-normal" style={{fontSize:'1.1rem'}}>{subTitle}</p>
    </div>
  );
}
