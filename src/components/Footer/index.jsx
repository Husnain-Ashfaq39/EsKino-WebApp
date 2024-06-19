import React, { useState } from "react";
import ContactInfoWidget from "../Widget/ContactInfoWidget";
import MenuWidget from "../Widget/MenuWidget";
import SocialWidget from "../Widget/SocialWidget";
import Newsletter from "../Widget/Newsletter";
import TextWidget from "../Widget/TextWidget";
import { footerBg1Svg, footerLogoBgSvg } from "../imagepath";
import { getAllDocuments } from "../../services/dbService";
import { useQuery } from "@tanstack/react-query";
import colors from "../../colorTheme";
import FooterAndLogoBg from "./FooterAndLogoBg";

const menuDataTwo = [
  { title: "Blog", href: "/blog" },
  { title: "Contact Us", href: "/contact" },
  { title: "Privacy Policy", href: "/policy" },
];

export default function Footer() {

  const [key, setKey] = useState({ logoUrl: "" });

  const {
    data: logoData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [key],
    queryFn: () =>
      getAllDocuments("HeroSection").then((querySnapshot) => {
        const logoData = querySnapshot.docs.map((doc) => ({
          logoUrl: doc.data().heroLogo,
        }));
        setKey(key);
        return logoData[0];
      }),
  });

  if (isLoading) return <div />;
  if (error) return <div />;

  return (
    <footer className="cs_footer cs_style_1 cs_heading_color">
     
     <FooterAndLogoBg primaryColor={colors.primary} secondaryColor={colors.secondary} logoUrl={logoData.logoUrl}/>

      <div className="cs_footer_main">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="cs_footer_item">
                <TextWidget text="Eskino Medical & <br />Healthcare Center" />
                <ContactInfoWidget />
              </div>
            </div>
            <div className="col-lg-2"></div>
            <div className="col-lg-2">
              <div className="cs_footer_item">
                <MenuWidget data={menuDataTwo} />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="cs_footer_item">
                <Newsletter
                  title="Be Our Subscribers"
                  subTitle="To get the latest news about health from our experts"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cs_footer_bottom" style={{ background: colors.tertiary }}>
        <div className="container">
          <div className="cs_footer_bottom_in">
            <SocialWidget />
            <div className="cs_copyright">
              Copyright © 2024 Eskino. Powered by{" "}
              <a
                href="https://syntax-ai.tech"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: colors.linkColor }}
              >
                SYNTAX
              </a>.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
