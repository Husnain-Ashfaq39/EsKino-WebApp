
import React from 'react';
import { arrowWhiteSvg } from '../imagepath';


export default function AppointmentForm() {
  
  return (
    <form action="#" className="row">
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">First Name</label>
        <input type="text" className="cs_form_field" placeholder="David John" />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">Last Name</label>
        <input type="text" className="cs_form_field" placeholder="David John" />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-20">
        <label className="cs_input_label cs_heading_color">Email</label>
        <input
          type="text"
          className="cs_form_field"
          placeholder="example@gmail.com"
        />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-20">
        <label className="cs_input_label cs_heading_color">Address</label>
        <input
          type="text"
          className="cs_form_field"
          placeholder="Address"
        />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-12">
        <label className="cs_input_label cs_heading_color">
          Name of Persons
        </label>
        <input
          type="text"
          className="cs_form_field"
          placeholder="name1,name2 etc"
        />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>


      <div className="col-lg-12">
      </div>
       {/* New dropdown for selecting number of persons */}
       <div className="col-lg-4">
        <label className="cs_input_label cs_heading_color">Select Persons:</label>
        <select className="cs_form_field">
          <option value="1">1 person</option>
          <option value="2">2 persons</option>
          <option value="3">3 persons</option>
        </select>
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-12">
        <label className="cs_input_label cs_heading_color">Select Option</label>
        <div className="cs_radio_group">
          <div className="cs_radio_wrap">
            <input
              className="cs_radio_input"
              type="radio"
              name="Male"
              id="Male"
              defaultValue="Male"
            />
            <label className="cs_radio_label" htmlFor="Male">
              Male
            </label>
          </div>
          <div className="cs_radio_wrap">
            <input
              className="cs_radio_input"
              type="radio"
              name="Female"
              id="Female"
              defaultValue="Female"

            />
            <label className="cs_radio_label" htmlFor="Female">
              Female
            </label>
          </div>


        </div>
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      <div className="col-lg-12">
        <button className="cs_btn cs_style_1">
          <span>Submit</span>
          <i>
            <img src={arrowWhiteSvg} alt="Icon" />
            <img src={arrowWhiteSvg} alt="Icon" />
          </i>
        </button>
      </div>
    </form>
  );
}
