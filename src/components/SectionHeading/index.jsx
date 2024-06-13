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
          <h3 className="cs_section_subtitle text-uppercase  m-0  cs_fs_32 text-6xl font-light	" style={{color:colors.dark}}>
            {parse(titleUp)}
          </h3>
          <Spacing md="5" />
        </>
      )}

      {title && (
        <h2 className="cs_section_title cs_fs_72 m-0 text-6xl font-light">{parse(title)}</h2>
      )}
      {titleDown && (
        <>
          <h3
            className="cs_section_subtitle  m-0  cs_fs_32 text-6xl font-light"
            style={{ fontSize:"18px", marginTop: "-50px", color: colors.dark }}
          >
            {parse(titleDown)}
          </h3>
        </>
      )}
      {subTitle && (
        <>
          <Spacing md="25" />
          <div style={{ maxWidth: "42rem", margin: "0 auto" }}>
            <p className="m-0 font-light	">{parse(subTitle)}</p>
          </div>
        </>
      )}
    </div>
  );
}
