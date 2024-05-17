// SessionCard.js
import React, { useEffect, useState } from 'react';
import { ModalComponent } from '../ModalComponent/ModalComponent';
import AppointmentSection from '../Section/AppointmentSection';
import { arrowWhiteSvg, date_timeSvg, pinSvg, titleIconsSvg } from '../imagepath';
import { getAllDocuments, getMeetingStatus } from '../../services/dbService';
import { convertTimestamp, convertTime } from '../../services/general_functions';
import useStore from '../../services/useStore';

function SessionCard({ limit }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sections, setSections] = useState([]);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const { setShowHeader } = useStore();

  const handleOpen = (sectionId) => {
    setIsOpen(true);
    setSelectedSectionId(sectionId);
    setShowHeader(false); // Hide the header when modal is open
  };

  const handleClose = () => {
    setIsOpen(false);
    setShowHeader(true); // Show the header when modal is closed
  };

  useEffect(() => {
    getAllDocuments('meetings').then((querySnapshot) => {
      const data = querySnapshot.docs
        .map((doc) => {
          const docData = doc.data();
          const startDate = convertTimestamp(docData.startDate);
          const endDate = convertTimestamp(docData.endDate);
          const startTime = convertTime(docData.startTime);
          const endTime = convertTime(docData.endTime);
          const convertedDocData = { ...docData, startDate, endDate, startTime, endTime };
          const meetingStatus = getMeetingStatus(convertedDocData);


          if (meetingStatus !== 'Timeout') {
            return {
              id: doc.id,
              ...convertedDocData,
              icon: selectIcon(docData.type),
              status: meetingStatus,
            };
          }
          return null;
        })
        .filter((item) => item !== null);
      setSections(data);
    });
  }, []);

  const selectIcon = (type) => {
    switch (type) {
      case 'titleIcons':
        return titleIconsSvg;
      case 'dateTime':
        return date_timeSvg;
      case 'locationPin':
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
          style={{ margin: '10px', marginBottom: '25px', padding: '20px' }}
        >
          <div className="w-72 cs_hero_info d-flex align-items-center" style={{ marginBottom: '20px' }}>
            <div className="cs_hero_info_icon cs_center rounded-circle cs_accent_bg">
              <img src={section.icon} alt="Icon" />
            </div>
            <div className="cs_hero_info_right">
              <h3 className="cs_hero_info_title cs_semibold">{section.title}</h3>
              <p className="cs_hero_info_subtitle cs_fs_12">Remaining Capacity: {section.capacity}</p>
            </div>
          </div>
          <div className=" w-72 cs_hero_info d-flex align-items-center" style={{ marginBottom: '20px' }}>
            <div className="cs_hero_info_icon cs_center rounded-circle cs_accent_bg">
              <img src={date_timeSvg} alt="Icon" />
            </div>
            <div className="cs_hero_info_right">
              <h3 className="cs_hero_info_title cs_semibold">{section.startDate} to {section.endDate}</h3>
              <p className="cs_hero_info_subtitle cs_fs_12">{section.startTime} to {section.endTime}</p>
            </div>
          </div>
          <div className="w-72 cs_hero_info d-flex align-items-center">
            <div className="cs_hero_info_icon cs_center rounded-circle cs_accent_bg">
              <img src={pinSvg} alt="Icon" />
            </div>
            <div className="cs_hero_info_right">
              <h3 className="cs_hero_info_title cs_semibold">{section.streetAddress}</h3>
              <p className="cs_hero_info_subtitle cs_fs_12">zip code: {section.zipCode}</p>
            </div>
          </div>
          {section.capacity == "0" &&
            <button disabled={true} className='bg-red-500 text-white px-[3.1rem] py-[0.77rem] mx-[1rem] rounded-full flex items-center'>
              Closed
              <img src={arrowWhiteSvg} alt="Icon" className='w-4 h-4 ml-2' />
            </button>
          }

          {section.capacity != "0" &&

            <div style={{ cursor: section.capacity > 0 ? 'pointer' : 'default', margin: '20px', pointerEvents: section.capacity === 0 ? 'none' : 'auto' }}>
              <div onClick={section.capacity > 0 ? () => handleOpen(section.id) : null} className="cs_btn cs_style_1 ">
                <span>{section.capacity == "0" ? 'Closed' : 'Book Now'}</span>
                <i>
                  <img src={arrowWhiteSvg} alt="Icon" />
                </i>
              </div>
            </div>
          }
        </div>
      ))}
      {isOpen && (
        <ModalComponent isOpen={isOpen} setIsOpen={handleClose}>
          <AppointmentSection sectionId={selectedSectionId} />
        </ModalComponent>
      )}
    </div>
  );
}

export default SessionCard;
