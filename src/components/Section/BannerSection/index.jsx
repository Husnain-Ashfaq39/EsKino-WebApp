import React, { useState, useEffect } from 'react';
import colors from '../../../colorTheme';

export default function Banner({ bgUrl, imgUrl, title, subTitle }) {
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
    title: { fontSize: '3.5rem', fontWeight: '300' },
    subTitle: { fontSize: '1.5rem', fontWeight: '300'},
  };

  // Styles for mobile devices
  const mobileStyles = {
    title: { fontSize: '2rem', fontWeight: '300' },
    subTitle: { fontSize: '1rem', fontWeight: '300'},
  };

  const styles = isMobile ? mobileStyles : desktopStyles;

  return (
    <div className="container">
      <div
        className="cs_banner cs_style_1 cs_bg_filed"
        style={{ 
          background: colors.lightBlue, 
          backgroundSize: 'cover',
        }}
      >
        <img 
          src={imgUrl} 
          alt="Banner" 
          className="cs_banner_img rounded-xl"
          style={{
            maxWidth: '100%',
            height: 'auto',
            maxHeight: '45rem' 
          }}
        />
        <h2 className="cs_banner_title cs_heading_color cs_fs_72" style={styles.title}>
          {title}
        </h2>
        <p className="cs_banner_subtitle cs_heading_color cs_fs_20 cs_medium m-0" style={styles.subTitle}>
          {subTitle}
        </p>
      </div>
    </div>
  );
}
