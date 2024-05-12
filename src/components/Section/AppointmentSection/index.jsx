import React from 'react';

import AppointmentForm from '../../AppointmentForm';


export default function AppointmentSection({
  sectionId
}) {
  return (
    <div className="cs_shape_wrap ">
     
      <div className="container">
        <div className="row align-items-center cs_gap_y_40">
          
        
            <AppointmentForm sectionId={sectionId} />
        </div>
      </div>
    </div>
  );
}
