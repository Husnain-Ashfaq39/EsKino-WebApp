import React from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../SectionHeading";
import Spacing from "../Spacing";

export default function IconBoxStyle4({ title, subTitle, description }) {
  return (
    <div className="cs_iconbox cs_style_4">
      {/* <div className="cs_iconbox_icon cs_accent_bg rounded-circle cs_center">
        <img src={iconUrl} alt="Icon" />
      </div> */}
      <h2 className="cs_iconbox_title cs_fs_32">{title}</h2>
      <SectionHeading titleDown={subTitle} />
      <Spacing md="27" lg="7" />
      <p className="cs_iconbox_subtitle m-0">{description}</p>
    </div>
  );
}
