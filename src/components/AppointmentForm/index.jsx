import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addDocument,
  getDocument,
  updateDocument,
} from "../../services/dbService";
import { arrowWhiteSvg } from "../imagepath";
export default function AppointmentForm({ sectionId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    data.sectionId = sectionId;
    setIsSubmitting(true);

    try {
      const doc = await getDocument("meetings", data.sectionId);
      if (doc.exists()) {
        const meetingData = doc.data();
        if (meetingData.capacity >= parseInt(data.persons, 10)) {
          const updatedCapacity =
            meetingData.capacity - parseInt(data.persons, 10);
          const updatedParticipants =
            meetingData.Participants + parseInt(data.persons, 10);

          await updateDocument("meetings", data.sectionId, {
            capacity: updatedCapacity,
            Participants: updatedParticipants,
          });
          await addDocument("participants", data);
          toast.success("Session has been booked. Thank you!");
        } else {
          toast.error(
            "Not enough capacity for the requested number of persons."
          );
        }
      } else {
        toast.error("Meeting not found.");
      }
    } catch (error) {
      console.error("Error handling meeting data: ", error);
      toast.error("Failed to handle meeting data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)} className="row">
        <div className="col-lg-6">
          <label className="cs_input_label cs_heading_color">First Name</label>
          <input
            {...register("firstName")}
            type="text"
            className="cs_form_field"
            placeholder="David John"
          />
        </div>
        <div className="col-lg-6">
          <label className="cs_input_label cs_heading_color">Last Name</label>
          <input
            {...register("lastName")}
            type="text"
            className="cs_form_field"
            placeholder="Smith"
          />
        </div>
        <div className="col-lg-20">
          <label className="cs_input_label cs_heading_color">Email</label>
          <input
            {...register("email")}
            type="text"
            className="cs_form_field"
            placeholder="example@gmail.com"
          />
        </div>
        <div className="col-lg-20">
          <label className="cs_input_label cs_heading_color">Address</label>
          <input
            {...register("address")}
            type="text"
            className="cs_form_field"
            placeholder="Address"
          />
        </div>
        <div className="col-lg-4">
          <label className="cs_input_label cs_heading_color">
            Select Persons:
          </label>
          <select {...register("persons")} className="cs_form_field">
            <option value="1">1 person</option>
            <option value="2">2 persons</option>
            <option value="3">3 persons</option>
          </select>
        </div>
        <div className="col-lg-12">
          <label className="cs_input_label cs_heading_color">
            Name of Persons
          </label>
          <input
            {...register("personNames")}
            type="text"
            className="cs_form_field"
            placeholder="name1, name2 etc"
          />
        </div>
        <div className="col-lg-12">
          <label className="cs_input_label cs_heading_color">
            Select Option
          </label>
          <div className="cs_radio_group">
            <div className="cs_radio_wrap">
              <input
                {...register("gender")}
                className="cs_radio_input"
                type="radio"
                value="Male"
                id="Male"
              />
              <label className="cs_radio_label" htmlFor="Male">
                Male
              </label>
            </div>
            <div className="cs_radio_wrap">
              <input
                {...register("gender")}
                className="cs_radio_input"
                type="radio"
                value="Female"
                id="Female"
              />
              <label className="cs_radio_label" htmlFor="Female">
                Female
              </label>
            </div>
          </div>
        </div>
        <div className="col-lg-12 flex justify-end">
          <button
            className="cs_btn cs_style_1"
            type="submit"
            disabled={isSubmitting}
          >
            <span>{isSubmitting ? "Submiting..." : "Submit"}</span>
            <i>
              <img src={arrowWhiteSvg} alt="Icon" />
            </i>
          </button>
        </div>
      </form>
    </div>
  );
}
