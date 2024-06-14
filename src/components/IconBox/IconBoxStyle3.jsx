import React, { useState, useEffect } from "react";
import colors from "../../colorTheme";
import SectionHeading from "../SectionHeading";
import Spacing from "../Spacing";

export default function IconBoxStyle3({ item, index }) {
  const { CCTitle, CCDescription, CCImage, CCQuote } = item;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const imageStyle = {
    borderRadius: "10px", // Adjust the value to control the roundness
  };

  return (
    <div className="cs_iconbox cs_style_3">
      <div className="cs_iconbox_left">
        <div className="cs_center">
          <img src={CCImage} alt="Icon" style={imageStyle} />
        </div>
      </div>
      {isMobile && <Spacing md="80" lg="80" />} {/* Apply extra spacing on mobile devices */}
      <div className="cs_iconbox_right">
        <h4 className="cs_iconbox_number font-medium" style={{ color: colors.secondary }}>{index}</h4>
        <h2 className="cs_iconbox_title cs_fs_32 font-medium">{CCTitle}</h2>
        <p className="cs_iconbox_subtitle m-0 font-normal">{CCDescription}</p>
        <SectionHeading titleDown={CCQuote} titleDownProps="1px" />
      </div>
    </div>
  );
}
