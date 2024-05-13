import React from 'react';
import { useForm } from 'react-hook-form';
import { arrowWhiteSvg } from '../imagepath';
import { addDocument } from '../../services/dbService';
import { useNavigate } from 'react-router-dom';

export default function ContactForm() {
  const { register, handleSubmit,reset, formState: { errors } } = useForm();
  const navigate = useNavigate(); // Hook for navigation
  const onSubmit = data => {
    data.read=false;
    console.log(data);
    // Here we pass the form data to the addDocument function.
    // Assuming 'contacts' is the collection name where you want to store the form data.
    addDocument('contacts', data).then(() => {
      console.log('Document successfully added!');
      alert('Message has been sent!'); // Show an alert message
      reset(); // Reset the form fields
      navigate('/contact'); // Navigate back to the contact page
    }).catch(error => {
      console.error('Error adding document: ', error);
    });
  };

  return (
    <form className="cs_contact_form cs_style_1 cs_white_bg cs_radius_30" onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-lg-6">
          <label className="cs_input_label cs_heading_color">First Name</label>
          <input
            type="text"
            className="cs_form_field"
            placeholder="David John"
            {...register("firstName", { required: "First name is required" })}
          />
          {errors.firstName && <p>{errors.firstName.message}</p>}
          <div className="cs_height_42 cs_height_xl_25" />
        </div>
        <div className="col-lg-6">
          <label className="cs_input_label cs_heading_color">Last Name</label>
          <input
            type="text"
            className="cs_form_field"
            placeholder="Smith"
            {...register("lastName", { required: "Last name is required" })}
          />
          {errors.lastName && <p>{errors.lastName.message}</p>}
          <div className="cs_height_42 cs_height_xl_25" />
        </div>
        <div className="col-lg-6">
          <label className="cs_input_label cs_heading_color">Email</label>
          <input
            type="email"
            className="cs_form_field"
            placeholder="example@gmail.com"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p>{errors.email.message}</p>}
          <div className="cs_height_42 cs_height_xl_25" />
        </div>
        <div className="col-lg-12">
          <label className="cs_input_label cs_heading_color">Phone Number</label>
          <input
            type="text"
            className="cs_form_field"
            placeholder="555-1234"
            {...register("phoneNumber", { required: "Phone number is required" })}
          />
          {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
          <div className="cs_height_42 cs_height_xl_25" />
        </div>
        <div className="col-lg-12">
          <label className="cs_input_label cs_heading_color">Message</label>
          <textarea
            cols={30}
            rows={10}
            className="cs_form_field"
            placeholder="Write something..."
            {...register("message")}
          />
          <div className="cs_height_42 cs_height_xl_25" />
        </div>
        <div className="col-lg-12 flex justify-end">
          <div className="cs_height_18" />
          <button type="submit" className="cs_btn cs_style_1">
            <span>Submit</span>
            <i>
              <img src={arrowWhiteSvg} alt="Icon" />
              <img src={arrowWhiteSvg} alt="Icon" />
            </i>
          </button>
        </div>
      </div>
    </form>
  );
}
