import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addDocument,
  getDocument,
  updateDocument,
} from "../../services/dbService";
import { arrowWhiteSvg } from "../imagepath";
import { Link } from "react-router-dom";

export default function AppointmentForm({ sectionId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: { persons: "1" },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalFee, setTotalFee] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);

  const calculateTotalFee = (persons) => {
    let fee = 0;
    let original = 0;
    switch (persons) {
      case "1":
        fee = 50;
        original = 50;
        break;
      case "2":
        fee = 60;
        original = 60;
        break;
      case "3":
        fee = 90;
        original = 120;
        break;
      case "4":
        fee = 135;
        original = 180;
        break;
      case "5":
        fee = 180;
        original = 240;
        break;
      case "6":
        fee = 0;
        original = 60;
        break;
      case "7":
        fee = 0;
        original = 120;
        break;
      default:
        break;
    }
    setTotalFee(fee);
    setOriginalPrice(original);
  };

  const onSubmit = async (data) => {
    data.sectionId = sectionId;
    data.totalFee = totalFee;
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
          toast.success("Thank you for your binding registration.");
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

  const persons = watch("persons");

  useEffect(() => {
    calculateTotalFee(persons);
  }, [persons]);

  return (
    <div>
      {/* <ToastContainer /> */}
      <form onSubmit={handleSubmit(onSubmit)} className="row">
        <div className="col-lg-6">
          <label className="cs_input_label cs_heading_color">First Name</label>
          <input
            {...register("firstName", { required: true })}
            type="text"
            className="cs_form_field p-2 mt-[-10px] mb-[10px]"
            placeholder="David John"
          />
          {errors.firstName && (
            <div className="error text-danger">This field is required</div>
          )}
        </div>
        <div className="col-lg-6">
          <label className="cs_input_label cs_heading_color">Last Name</label>
          <input
            {...register("lastName", { required: true })}
            type="text"
            className="cs_form_field p-2 mt-[-10px] mb-[10px]"
            placeholder="Smith"
          />
          {errors.lastName && (
            <div className="error text-danger">This field is required</div>
          )}
        </div>
        <div className="col-lg-12">
          <label className="cs_input_label cs_heading_color">Email</label>
          <input
            {...register("email", { required: true })}
            type="email"
            className="cs_form_field p-2 mt-[-10px] mb-[10px]"
            placeholder="example@gmail.com"
          />
          {errors.email && (
            <div className="error text-danger">This field is required</div>
          )}
        </div>
        <div className="col-lg-12">
          <label className="cs_input_label cs_heading_color">Address</label>
          <input
            {...register("address", { required: true })}
            type="text"
            className="cs_form_field p-2 mt-[-10px] mb-[10px]"
            placeholder="Address"
          />
          {errors.address && (
            <div className="error text-danger">This field is required</div>
          )}
        </div>
        <div className="col-lg-4">
          <label className="cs_input_label cs_heading_color">
            Select Persons:
          </label>
          <select
            {...register("persons", { required: true })}
            className="cs_form_field w-80 p-2 mt-[-10px] mb-[10px]"
          >
            <option value="1">Online Seminar</option>
            <option value="2">1 person</option>
            <option value="3">2 persons</option>
            <option value="4">3 persons</option>
            <option value="5">4 persons</option>
            <option value="6">Voucher available for 1 person</option>
            <option value="7">Voucher available for 2 persons</option>
          </select>
          {errors.persons && (
            <div className="error text-danger">This field is required</div>
          )}
        </div>
        <div className="col-lg-8 d-flex align-items-end">
          <label className="cs_input_label cs_heading_color me-2">
            Total Fee:
          </label>
          {originalPrice > totalFee && (
            <span
              style={{
                textDecoration: "line-through",
                color: "red",
                marginBottom: "0.65rem",
              }}
            >
              €{originalPrice.toFixed(2)}
            </span>
          )}
          <span
            style={{
              backgroundColor: "#2FCE2E",
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
              marginLeft: "10px",
              marginBottom: "0.4rem",
            }}
          >
            €{totalFee.toFixed(2)}
          </span>
        </div>
        <div className="col-lg-12">
          <label className="cs_input_label cs_heading_color">
            Name of Persons
          </label>
          <input
            {...register("personNames", { required: true })}
            type="text"
            className="cs_form_field p-2 mt-[-10px] mb-[10px]"
            placeholder="name1, name2 etc"
          />
          {errors.personNames && (
            <div className="error text-danger">This field is required</div>
          )}
        </div>
        <div className="col-lg-12">
          <label className="cs_input_label cs_heading_color">
            Select Option
          </label>
          <div className="cs_radio_group">
            <div className="cs_radio_wrap">
              <input
                {...register("gender", { required: true })}
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
                {...register("gender", { required: true })}
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
          {errors.gender && (
            <div className="error text-danger">This field is required</div>
          )}
        </div>
        <div className="col-lg-12">
          <label
            className="cs_input_label cs_heading_color"
            style={{
              marginTop: "15px",
              backgroundColor: "#CFECF7",
              padding: "0.7rem",
              borderRadius: "10px",
            }}
          >
            <input
              type="checkbox"
              {...register("policyAccepted", { required: true })}
            />{" "}
            I hereby confirm that I have read the information below and have
            taken note of the information on{" "}
            <Link
              to="/policy"
              style={{ color: "blue" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              data protection
            </Link>
            .
          </label>
          {errors.policyAccepted && (
            <div className="error text-danger">This field is required</div>
          )}
        </div>
        <div className="col-lg-12 flex justify-end">
          <button
            className="cs_btn cs_style_1"
            type="submit"
            disabled={isSubmitting}
          >
            <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
            <i>
              <img src={arrowWhiteSvg} alt="Icon" />
            </i>
          </button>
        </div>
      </form>
    </div>
  );
}
