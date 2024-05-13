import React from "react";
import Portfolio from "../Portfolio";
import SectionHeading from "../SectionHeading";
import Spacing from "../Spacing";
export default function GallerySectionStyle2({ data }) {
  return (
    <div className="container">
      <SectionHeading title={"Our Events"} center />
      <Spacing md="72" lg="50" />

      <div className="cs_gallery_grid_2">
        {data?.map((item, index) => (
          <div className="cs_grid_item" key={index}>
            <Portfolio {...item} />
          </div>
        ))}
      </div>
    </div>
  );
}
