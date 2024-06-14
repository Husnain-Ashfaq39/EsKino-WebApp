import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
export default function BannerSectionStyle9({ imgUrl, title, subTitle }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Styles for larger devices
  const desktopStyles = {
    title: { fontSize: "3rem", fontWeight: "300" },
    subTitle: { fontSize: "1.2rem", fontWeight: "300" },
  };

  // Styles for mobile devices
  const mobileStyles = {
    title: { fontSize: "2rem", fontWeight: "300" },
    subTitle: { fontSize: "1rem", fontWeight: "300" },
  };

  const styles = isMobile ? mobileStyles : desktopStyles;

  return (
    <div className="container">
      <div className="cs_banner cs_style_9 cs_white_bg cs_radius_30">
        <div className="cs_banner_img">
          <img src={imgUrl} alt="Banner" />
        </div>
        <h2 className="cs_banner_title cs_fs_72" style={styles.title}>
          {parse(title)}
        </h2>
        <p className="cs_banner_subtitle cs_fs_20 m-0 cs_medium" style={styles.subTitle}>
          {parse(subTitle)}
        </p>
      </div>
    </div>
  );
}
