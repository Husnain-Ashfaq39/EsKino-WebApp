import React from "react";
import Section from "../Section";
import GallerySectionStyle2 from "../GallerySection/GallerySectionStyle2";
import { pageTitle } from "../../helpers/PageTitle";
const galleryData = [
  { imgUrl: "/images/about/portfolio_4_lg.jpeg" },
  { imgUrl: "/images/about/portfolio_5_lg.jpeg" },
  { imgUrl: "/images/about/portfolio_2_lg.jpeg" },
  { imgUrl: "/images/about/portfolio_3_lg.jpeg" },
  { imgUrl: "/images/about/portfolio_5_lg.jpeg" },
  { imgUrl: "/images/about/portfolio_5_lg.jpeg" },
  { imgUrl: "/images/about/portfolio_4_lg.jpeg" },
];

export default function Gallery() {
  pageTitle("Gallery");
  return (
    <>
      <Section
        topMd={170}
        topLg={150}
        topXl={110}
        bottomMd={200}
        bottomLg={150}
        bottomXl={110}
      >
        <GallerySectionStyle2 data={galleryData} />
      </Section>
    </>
  );
}
