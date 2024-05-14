import React from "react";
import Spacing from "../Spacing";
import IconBoxStyle4 from "./IconBoxStyle4";
import SectionHeading from "../SectionHeading";

export default function DepartmentSectionStyle1({
  sectionTitle,

  data,
}) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-xl-4">
          <Spacing md="30" lg="10" />
          <SectionHeading title={sectionTitle} />
          <Spacing md="72" lg="50" />
        </div>
        {data?.map((item, index) => (
          <div className="col-md-6 col-xl-4" key={index}>
            <IconBoxStyle4 {...item} />
          </div>
        ))}
      </div>
    </div>
  );
}
