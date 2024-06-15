import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import Spacing from "../Spacing";

export default function SectionHeading({
  title = "",
  titleUp = "",
  titleDown = "",
  subTitle = "",
  center,
  tileDownProps=""
}) {
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

  // Styles for larger devices
  const desktopStyles = {
    titleUp: { fontSize: "0.9rem", fontWeight: "300" },
    title: { fontSize: "3.5rem", fontWeight: "300" },
    titleDown: { fontSize: "0.9rem", marginTop: "-2.5vw",  fontWeight: "500" },
    subTitle: { fontSize: "1.26rem"},
  };

  // Styles for mobile devices
  const mobileStyles = {
    titleUp: { fontSize: "0.9rem", fontWeight: "300" },
    title: { fontSize: "2rem", fontWeight: "300" },
    titleDown: { fontSize: "0.9rem", marginTop: "-5vw",fontWeight: "300" },
    subTitle: { fontSize: "1.2rem" },
  };

  const styles = isMobile ? mobileStyles : desktopStyles;

  return (
    <div className={`cs_section_heading cs_style_1 ${center ? "text-center" : ""}`}>
      {titleUp && (
        <>
          <h3 className="cs_section_subtitle text-uppercase m-0" style={styles.titleUp}>
            {parse(titleUp)}
          </h3>
          <Spacing md="5" />
        </>
      )}

      {title && (
        <h2 className="cs_section_title m-0" style={styles.title}>
          {parse(title)}
        </h2>
      )}
      {titleDown && (
        <>
          <h3 className="cs_section_subtitle m-0" style={styles.titleDown}>
            {parse(titleDown)}
          </h3>
        </>
      )}
      {subTitle && (
        <>
          <Spacing md="25" />
          <div style={{ maxWidth: "42rem", margin: "0 auto" }}>
            <p className="m-0 font-light" style={styles.subTitle}>{parse(subTitle)}</p>
          </div>
        </>
      )}
    </div>
  );
}
