import React, { useState, useEffect } from "react";
import IconBoxStyle1 from "../../IconBox/IconBoxStyle1";
import Spacing from "../../Spacing";
import { icon1Svg, icon2Svg, icon3Svg } from "../../imagepath";
import { getAllDocuments } from "../../../services/dbService";
import colors from "../../../colorTheme";

export default function ContactInfoSection({ sectionTitle }) {
  const fetchContactInfo = async () => {
    const colSnap = await getAllDocuments("contactInfo");

    if (!colSnap.empty) {
      const docSnap = colSnap.docs[0];
      return {
        address: docSnap.data().address,
        phone: docSnap.data().phone,
        email: docSnap.data().email,
      };
    } else {
      console.log("No documents found in the contactInfo collection!");
      return {
        address: "",
        phone: "",
        email: "",
      };
    }
  };

  const [contactInfo, setContactInfo] = useState({
    address: "",
    phone: "",
    email: "",
  });

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

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchContactInfo();
      setContactInfo(data);
    };

    fetchData();
  }, []);

  const styles = {
    title: {
      fontSize: isMobile ? "2rem" : "3rem",
      fontWeight: "300",
    },
  };

  return (
    <div className="container">
      <h2 className="cs_fs_72 mb-0" style={styles.title}>{sectionTitle}</h2>
      <Spacing md="70" lg="50" />

      <div className="row g-4 g-xl-3 g-xxl-5">
        <div className="col-xl-4">
          <IconBoxStyle1
            title="Phone"
            subTitle={contactInfo.phone}
            iconSrc={icon1Svg}
          />
        </div>

        <div className="col-xl-4">
          <IconBoxStyle1
            title="Email"
            subTitle={contactInfo.email}
            iconSrc={icon2Svg}
          />
        </div>

        <div className="col-xl-4">
          <IconBoxStyle1
            title="Location"
            subTitle={contactInfo.address}
            iconSrc={icon3Svg}
          />
        </div>
      </div>
      <Spacing md="35" />
      {/* Start Google Map */}
      <div className="cs_map">
        <iframe
          id="map"
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1378158.626040806!2d9.82084110734701!3d48.67217766447641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479945458d0a6a81%3A0x45e2e584b99446b6!2sEsKiNo%20Elternseminare%20Kindernotf%C3%A4lle%20GbR!5e0!3m2!1sen!2s!4v1715928962643!5m2!1sen!2s"
          allowFullScreen
        />
      </div>
      {/* End Google Map */}
    </div>
  );
}
