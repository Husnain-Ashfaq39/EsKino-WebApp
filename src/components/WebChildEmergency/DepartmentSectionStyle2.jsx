import React, { useState, useEffect } from "react";
import Spacing from "../Spacing";
import IconBoxStyle4 from "./IconBoxStyle4";
import SectionHeading from "../SectionHeading";

export default function DepartmentSectionStyle1({ sectionTitle, data }) {
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

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-xl-4">
          {isMobile && <Spacing md="70" lg="70" />} {/* Apply extra spacing on mobile devices */}
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
