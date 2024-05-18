import React from "react";
import parse from "html-react-parser";
import Spacing from "../Spacing";
import colors from "../../colorTheme";

export default function SectionHeading({
  title = "",
  titleUp = "",
  titleDown = "",
  subTitle = "",
  center,
  tileDownProps=""
}) {
  return (
    <div
      className={`cs_section_heading cs_style_1 ${center ? "text-center" : ""}`}
    >
      {titleUp && (
        <>
        {/* Previous blue color cs_accent_color */}
          <h3 className="cs_section_subtitle text-uppercase  cs_semibold m-0  cs_fs_32 text-6xl font-semibold" style={{color:colors.dark}}>
            {parse(titleUp)}
          </h3>
          <Spacing md="5" />
        </>
      )}

      {title && (
        <h2 className="cs_section_title cs_fs_72 m-0 text-6xl font-semibold">{parse(title)}</h2>
      )}
      {titleDown && (
        <>
          {/* <Spacing md="0" /> */}
          <h3
            className="cs_section_subtitle   cs_semibold m-0  cs_fs_32 text-6xl font-semibold"
            style={{ fontSize:"18px", marginTop: "-50px", color: colors.dark}}
          >
            {parse(titleDown)}
          </h3>
        </>
      )}
      {subTitle && (
        <>
          <Spacing md="25" />
          <p className="m-0">{parse(subTitle)}</p>
        </>
      )}
    </div>
  );
}
