import React, { useEffect, useState } from "react";
import { ModalComponent } from "../ModalComponent/ModalComponent";
import AppointmentSection from "../Section/AppointmentSection";
import {
  arrowWhiteSvg,
  date_timeSvg,
  pinSvg,
  titleIconsSvg,
} from "../imagepath";
import { getAllDocuments } from "../../services/dbService";
import { getMeetingStatus } from "../../services/dbService";
import {
  convertTimestamp,
  convertTime,
} from "../../services/general_functions";

function SessionCard({ limit }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sections, setSections] = useState([]);
  const [selectedSectionId, setSelectedSectionId] = useState(null);

  const handleOpen = (sectionId) => {
    setIsOpen(true);
    setSelectedSectionId(sectionId);
  };

  useEffect(() => {
    getAllDocuments("meetings").then((querySnapshot) => {
      const data = querySnapshot.docs
        .map((doc) => {
          const docData = doc.data();

          // Convert timestamps and times
          const startDate = convertTimestamp(docData.startDate);
          const endDate = convertTimestamp(docData.endDate);
          const startTime = convertTime(docData.startTime);
          const endTime = convertTime(docData.endTime);

          // Create a new object with the converted times
          const convertedDocData = {
            ...docData,
            startDate,
            endDate,
            startTime,
            endTime,
          };
          console.log(convertedDocData);
          // Pass the converted data to getMeetingStatus
          const meetingStatus = getMeetingStatus(convertedDocData);
          console.log(meetingStatus);
          // Only include meetings that are not "Timeout"
          if (meetingStatus !== "Timeout") {
            return {
              id: doc.id,
              ...convertedDocData,
              icon: selectIcon(docData.type),
              status: meetingStatus,
            };
          }
          return null;
        })
        .filter((item) => item !== null); // Filter out null values
      setSections(data);
    });
  }, []);

  const selectIcon = (type) => {
    switch (type) {
      case "titleIcons":
        return titleIconsSvg;
      case "dateTime":
        return date_timeSvg;
      case "locationPin":
        return pinSvg;
      default:
        return titleIconsSvg;
    }
  };

  return (
    <div>
      {sections.map((section) => (
        <div
          key={section.id}
          className="cs_hero_info_wrap cs_shadow_1 cs_white_bg cs_radius_15"
          style={{ margin: "10px", marginBottom: "25px", padding: "20px" }}
        >
          {/* First Section */}
          <div
            className="cs_hero_info d-flex align-items-center"
            style={{ marginBottom: "20px" }}
          >
            <div className="cs_hero_info_icon cs_center rounded-circle cs_accent_bg">
              <img src={section.icon} alt="Icon" />
            </div>
            <div className="cs_hero_info_right">
              <h3 className="cs_hero_info_title cs_semibold">
                {section.title}
              </h3>
              <p className="cs_hero_info_subtitle cs_fs_12">
                {" "}
                Remaining Capacity: {section.capacity}
              </p>
            </div>
          </div>
          {/* Date and Time Section */}
          <div
            className="cs_hero_info d-flex align-items-center"
            style={{ marginBottom: "20px" }}
          >
            <div className="cs_hero_info_icon cs_center rounded-circle cs_accent_bg">
              <img src={date_timeSvg} alt="Icon" />
            </div>
            <div className="cs_hero_info_right">
              <h3 className="cs_hero_info_title cs_semibold">
                {section.startDate} to {section.endDate}
              </h3>
              <p className="cs_hero_info_subtitle cs_fs_12">
                {section.startTime} to {section.endTime}
              </p>
            </div>
          </div>
          {/* Location Section */}
          <div className="cs_hero_info d-flex align-items-center">
            <div className="cs_hero_info_icon cs_center rounded-circle cs_accent_bg">
              <img src={pinSvg} alt="Icon" />
            </div>
            <div className="cs_hero_info_right">
              <h3 className="cs_hero_info_title cs_semibold">
                {section.streetAddress}
              </h3>
              <p className="cs_hero_info_subtitle cs_fs_12">
                zip code: {section.zipCode}
              </p>
            </div>
          </div>
          <div
            style={{
              cursor: section.capacity > 0 ? "pointer" : "default",
              margin: "20px",
              pointerEvents: section.capacity === 0 ? "none" : "auto",
            }}
          >
            <div
              onClick={
                section.capacity > 0 ? () => handleOpen(section.id) : null
              }
              className="cs_btn cs_style_1"
            >
              <span>{section.capacity === 0 ? "Closed" : "Book Now"}</span>
              <i>
                <img src={arrowWhiteSvg} alt="Icon" />
              </i>
            </div>
          </div>
        </div>
      ))}
      {isOpen && (
        <ModalComponent isOpen={isOpen} setIsOpen={setIsOpen}>
          <AppointmentSection sectionId={selectedSectionId} />
        </ModalComponent>
      )}
    </div>
  );
}

export default SessionCard;
