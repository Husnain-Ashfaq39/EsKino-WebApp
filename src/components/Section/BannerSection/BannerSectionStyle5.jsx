import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import colors from '../../../colorTheme';

export default function BannerSectionStyle5({
  bgUrl,
  imgUrl,
  title,
  subTitle,
}) {
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

  const styles = {
    title: {
      fontSize: isMobile ? "2rem" : "3rem",
      fontWeight: "300",
    },
    subTitle: {
      fontSize: isMobile ? "1rem" : "1.2rem",
      fontWeight: "300",
    },
  };

  return (
    <section
      className="cs_banner cs_style_5 cs_bg_filed"
      // style={{ backgroundImage: `url(${bgUrl})` }}
      style={{ background: colors.primary }}
    >
      <div className="cs_banner_img">
        <img src={imgUrl} alt="Banner" />
      </div>
      <div className="container">
        <div className="cs_banner_text">
          <h2 className="cs_banner_title cs_fs_72" style={styles.title}>
            {parse(title)}
          </h2>
          <p className="cs_banner_subtitle cs_fs_20 mb-0 cs_heading_color" style={styles.subTitle}>
            {parse(subTitle)}
          </p>
        </div>
      </div>
    </section>
  );
}
