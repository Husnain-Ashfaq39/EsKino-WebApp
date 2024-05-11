import React from 'react';
import SectionHeading from '../SectionHeading';
import AppointmentWithContactInfoSection from '../Section/AppointmentWithContactInfoSection';
import Section from '../Section';
import Spacing from '../Spacing';
import SessionCard from '../SessionCard';
export default function Appointments() {

  const infoList = [
    {
      title: 'Title',
      subTitle: '',
      iconUrl: '/images/title_icons.svg',
    },
    {
      title: 'Ambulance',
      subTitle: '876-256-876',
      iconUrl: '/images/date_time.svg',
    },
    {
      title: 'Location',
      subTitle: 'New York, US',
      iconUrl: '/images/icons/pin.svg',
    }
  ];
  const btnText = "Book Now"
  const btnUrl = "/appointments"
 
  return (
    <>
    
      <Section
        topMd={150}
        topLg={100}
        topXl={60}
        bottomMd={200}
        bottomLg={150}
        bottomXl={110}
      >
      </Section>
       <div className='container cs_hero cs_style_1'>
        <SectionHeading title="Upcoming Training Sessions" center={true}/>
        <Spacing md="72" lg="50" />
         <SessionCard infoList={infoList} btnText={btnText} btnUrl={btnUrl}/>
        </div>
    </>
  );
}
