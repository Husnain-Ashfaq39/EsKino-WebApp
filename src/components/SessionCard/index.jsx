import React, { useEffect, useState } from 'react';
import { ModalComponent } from '../ModalComponent/ModalComponent';
import AppointmentSection from '../Section/AppointmentSection';
import { arrowWhiteSvg, date_timeSvg, pinSvg, titleIconsSvg } from '../imagepath';
import { getAllDocuments, getMeetingStatus } from '../../services/dbService';
import { convertTimestamp, convertTime } from '../../services/general_functions';
import useStore from '../../services/useStore';
import colors from '../../colorTheme';

function SessionCard({ limit }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sections, setSections] = useState([]);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const { setShowHeader } = useStore();

  const handleOpen = (sectionId) => {
    setIsOpen(true);
    setSelectedSectionId(sectionId);
    setShowHeader(false); 
  };

  const handleClose = () => {
    setIsOpen(false);
    setShowHeader(true); 
  };

  const fetchSections = () => {
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
  };

  useEffect(() => {
    fetchSections();
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

  const formatDate = (date) => {
    const [day, month, year] = date.split('/');
    return `${day}.${month}.${year}`;
  };

  return (
    <div>
      {sections.map((section) => (
        <div
          key={section.id}
          className="cs_hero_info_wrap cs_shadow_1 cs_white_bg cs_radius_15 "
          style={{ margin: '10px', marginBottom: '25px', padding: '20px' }}
        >
          <div className="w-72 cs_hero_info d-flex align-items-center" style={{ marginBottom: '20px' }}>
            <div className="cs_hero_info_icon cs_center rounded-circle " style={{background: colors.primaryBlue, width: '60px', height: '60px', flexShrink: 0}}>
              <img src={date_timeSvg} alt="Icon" style={{ width: '100%', height: '100%' }} />
            </div>
            <div className="cs_hero_info_right" style={{ padding: '10px', borderRadius: '5px' }}>
              <h3 className="cs_hero_info_title cs_semibold rounded-l px-2" style={{ backgroundColor:  colors.primaryBlue, fontSize:'1.9rem', fontWeight: 'bold', margin: 0 }}>{formatDate(section.startDate)}</h3>
              <p className="cs_hero_info_subtitle  pl-4 pt-1 font-semibold text-lg">{section.startTime} bis {section.endTime}</p>
            </div>
          </div>
          <div className="w-72 cs_hero_info d-flex align-items-center " style={{ marginBottom: '20px' }}>
            <div className="cs_hero_info_icon cs_center rounded-circle " style={{background: colors.primaryBlue, width: '60px', height: '60px', flexShrink: 0}}>
              <img src={pinSvg} alt="Icon" style={{ width: '100%', height: '100%' }} />
            </div>
            <div className="cs_hero_info_right ">
              <h3 className="cs_hero_info_title cs_bold  pl-4">{section.streetAddress}</h3>
              <p className="cs_hero_info_subtitle cs_fs_12  pl-4">Zip Code: {section.zipCode}</p>
            </div>
          </div>
          {section.capacity === "0" &&
            <button disabled={true} className='bg-red-500 text-white px-[3.1rem] py-[0.77rem] m-[27px] mt-2 rounded-full flex items-center'>
              Closed
              <img src={arrowWhiteSvg} alt="Icon" className='w-4 h-4 ml-2' />
            </button>
          }

          {section.capacity !== "0" &&
            <div>
              <div style={{ cursor: section.capacity > 0 ? 'pointer' : 'default', margin: '20px', pointerEvents: section.capacity === 0 ? 'none' : 'auto' }}>
                <div onClick={section.capacity > 0 ? () => handleOpen(section.id) : null} className="cs_btn cs_style_1 " >
                  <span>{section.capacity === "0" ? 'Closed' : 'Book Now'}</span>
                  <i>
                    <img src={arrowWhiteSvg} alt="Icon" />
                  </i>
                </div>
              </div>
              <div className="capacity-info">
                <p className="text-sm text-gray-600 mt-2 ml-8">Available Capacity: <span className="font-bold">{section.capacity}</span></p>
              </div>
            </div>
          }
        </div>
      ))}
      {isOpen && (
        <ModalComponent isOpen={isOpen} setIsOpen={handleClose}>
          <AppointmentSection sectionId={selectedSectionId} onClose={handleClose} onBookingSuccess={fetchSections} />
        </ModalComponent>
      )}
    </div>
  );
}

export default SessionCard;
