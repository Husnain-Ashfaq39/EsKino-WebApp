import React from 'react'

const FooterAndLogoBg = ({primaryColor,secondaryColor,logoUrl}) => {
    const footerBgSvg = `
    <svg width="1920" height="756" viewBox="0 0 1920 756" xmlns="http://www.w3.org/2000/svg">
      <path d="M965 0C619 119.867 177.5 183.221 0 199.914V756H1922V199.914C1660 182.65 1174.83 59.4449 965 0Z" fill="url(#paint0_linear_5_279)" />
      <defs>
        <linearGradient id="paint0_linear_5_279" x1="961" y1="955.5" x2="961" y2="32.9797" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="${secondaryColor}" />
          <stop offset="1" stop-color="${primaryColor}" />
        </linearGradient>
      </defs>
    </svg>
  `;


  const footerLogoBgSvg = `
  <svg width="426" height="448" viewBox="0 0 426 448" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_13_2673)">
<path d="M206.854 81C174.903 99.4444 107.638 114.367 78 119.523V242.388C88.7281 323.637 168.373 354.65 206.854 360C302.008 346.225 332.599 275.853 336 242.388V119.523C288.19 113.219 229.982 91.2144 206.854 81Z" fill="${secondaryColor}"/>
<path d="M206.854 81C174.903 99.4444 107.638 114.367 78 119.523V242.388C88.7281 323.637 168.373 354.65 206.854 360C302.008 346.225 332.599 275.853 336 242.388V119.523C288.19 113.219 229.982 91.2144 206.854 81Z" stroke="white" stroke-width="11"/>
</g>
<defs>
<filter id="filter0_d_13_2673" x="0.5" y="0.84082" width="425" height="446.714" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feMorphology radius="8" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_13_2673"/>
<feOffset dx="6" dy="4"/>
<feGaussianBlur stdDeviation="35"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.188235 0 0 0 0 0.482353 0 0 0 0 0.768627 0 0 0 0.09 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_13_2673"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_13_2673" result="shape"/>
</filter>
</defs>
</svg>
`;

const urlFooterBg = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(footerBgSvg)))}`;
const urlFooterLogoBg = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(footerLogoBgSvg)))}`;

  return (
    <div
        className="cs_footer_logo_wrap "
        style={{ backgroundImage: `url(${urlFooterBg})` }}
      >
        <div
          className="cs_footer_brand"
          style={{ backgroundImage: `url(${urlFooterLogoBg})` }}
        >
          <img
            src={logoUrl}
            height={72}
            width={72}
            alt="Logo Icon"
            className="cs_footer_brand_icon"
          />
          <h2 className="cs_footer_brand_text">Eskino</h2>
        </div>
      </div>
  )
}

export default FooterAndLogoBg