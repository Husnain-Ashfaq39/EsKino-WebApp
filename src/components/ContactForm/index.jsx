import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDocument } from '../../services/dbService';
import { arrowWhiteSvg } from '../imagepath';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      data.read = false;
      await addDocument('contacts', data);
      toast.success('Message has been sent. Thank you!');
      reset(); // Reset the form fields
    } catch (error) {
      toast.error(`Error adding document: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        className="cs_contact_form cs_style_1 cs_white_bg cs_radius_30"
        onSubmit={handleSubmit(onSubmit)}
      >
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
  {...register("email", {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address"
    }
  })}
/>

{errors.email && <p className='text-danger'>{errors.email.message}</p>}
            <div className="cs_height_42 cs_height_xl_25" />
          </div>
          <div className="col-lg-12">
            <label className="cs_input_label cs_heading_color">Phone Number</label>
            <input
              type="text"
              className="cs_form_field"
              placeholder="555-1234"
              {...register("phoneNumber", { 
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Only numbers are allowed"
                }
              })}
            />
            {errors.phoneNumber && <p className='text-danger'>{errors.phoneNumber.message}</p>}
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
              <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
              <i>
                <img src={arrowWhiteSvg} alt="Icon" />
                <img src={arrowWhiteSvg} alt="Icon" />
             </i>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ContactForm;