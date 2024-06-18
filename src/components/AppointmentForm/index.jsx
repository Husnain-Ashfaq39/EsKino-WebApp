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
import { convertTimestamp } from "../../services/general_functions"; // Assuming this function exists for timestamp conversion

export default function AppointmentForm({ sectionId, onClose, onBookingSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: { persons: "1 person" },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalFee, setTotalFee] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [capacity, setCapacity] = useState(null); // State to store the capacity
  const [warning, setWarning] = useState(""); // State to store the warning message
  const [startDate, setStartDate] = useState(null); // State to store the startDate

  const calculateTotalFee = (plan) => {
    let fee = 0;
    let original = 0;
    switch (plan) {
      case "Online Seminar":
        fee = 50;
        original = 50;
        break;
      case "1 person":
        fee = 60;
        original = 60;
        break;
      case "2 persons":
        fee = 90;
        original = 120;
        break;
      case "3 persons":
        fee = 135;
        original = 180;
        break;
      case "4 persons":
        fee = 180;
        original = 240;
        break;
      case "Voucher for 1 person":
        fee = 0;
        original = 60;
        break;
      case "Voucher for 2 persons":
        fee = 0;
        original = 120;
        break;
      default:
        break;
    }
    setTotalFee(fee);
    setOriginalPrice(original);
  };

  useEffect(() => {
    const fetchMeetingData = async () => {
      try {
        const doc = await getDocument("meetings", sectionId);
        if (doc.exists()) {
          const meetingData = doc.data();
          setCapacity(meetingData.capacity);
          setStartDate(formatDate(convertTimestamp(meetingData.startDate))); // Format the date to DD.MM.YYYY
        }
      } catch (error) {
        console.error("Error fetching meeting data: ", error);
      }
    };

    fetchMeetingData();
  }, [sectionId]);

  const formatDate = (date) => {
    const [day, month, year] = date.split('/');
    return `${day}.${month}.${year}`;
  };

  const onSubmit = async (data) => {
    data.sectionId = sectionId;
    data.totalFee = totalFee;
    data.plan = data.persons; // Store the selected plan
    data.issueDate = new Date().toLocaleDateString('en-GB'); // Capture the current date in DD/MM/YYYY format
    data.originalPrice = originalPrice; // Store the original price
    setIsSubmitting(true);

    try {
      const doc = await getDocument("meetings", data.sectionId);
      if (doc.exists()) {
        const meetingData = doc.data();

        let personsCount = 0;
        if (data.persons === "Online Seminar" || data.persons === "Voucher for 1 person") {
          personsCount = 1;
        } else if (data.persons === "Voucher for 2 persons") {
          personsCount = 2;
        } else {
          personsCount = parseInt(data.persons.split(" ")[0], 10);
        }

        data.persons = personsCount; // Update the data to store numerical value

        if (parseInt(meetingData.capacity, 10) >= personsCount) {
          const updatedCapacity = (parseInt(meetingData.capacity, 10) - personsCount).toString();
          const updatedParticipants = (parseInt(meetingData.Participants, 10) + personsCount).toString();

          await updateDocument("meetings", data.sectionId, {
            capacity: updatedCapacity,
            Participants: updatedParticipants,
          });
          await addDocument("participants", data);
          toast.success("Thank you for your binding registration.");
          onBookingSuccess(); // Fetch updated data after successful booking
          onClose(); // Close the modal on successful submission
        } else {
          toast.error(
            "Not enough capacity for the requested number of persons."
          );
          reset(); // Reset the form on unsuccessful submission
        }
      } else {
        toast.error("Meeting not found.");
        reset(); // Reset the form on unsuccessful submission
      }
    } catch (error) {
      console.error("Error handling meeting data: ", error);
      toast.error("Failed to handle meeting data.");
      reset(); // Reset the form on unsuccessful submission
    } finally {
      setIsSubmitting(false);
    }
  };

  const persons = watch("persons");

  useEffect(() => {
    calculateTotalFee(persons);

    if (capacity !== null && parseInt(persons.split(" ")[0], 10) > parseInt(capacity, 10)) {
      setWarning(`Only ${capacity} places left.`);
    } else {
      setWarning("");
    }
  }, [persons, capacity]);

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
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
            type="email"
            className="cs_form_field p-2 mt-[-10px] mb-[10px]"
            placeholder="example@gmail.com"
          />
          {errors.email && (
            <div className="error text-danger">
              {errors.email.message}
            </div>
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
        {startDate && (
          <div className="col-lg-12">
            <div className="alert alert-info" role="alert" style={{ margin: "10px 0" }}>
              Date : {startDate}
            </div>
          </div>
        )}
        <div className="col-lg-4">
          <label className="cs_input_label cs_heading_color">
            Select Plan:
          </label>
          <select
            {...register("persons", { required: true })}
            className="cs_form_field p-2 mt-[-10px] mb-[10px]"
          >
            <option value="Online Seminar">Online Seminar</option>
            <option value="1 person">1 person</option>
            <option value="2 persons">2 persons</option>
            <option value="3 persons">3 persons</option>
            <option value="4 persons">4 persons</option>
            <option value="Voucher for 1 person">Voucher for 1 person</option>
            <option value="Voucher for 2 persons">Voucher for 2 persons</option>
          </select>
          {errors.persons && (
            <div className="error text-danger">This field is required</div>
          )}
          {warning && (
            <div className="warning text-danger">{warning}</div>
          )}
        </div>
        {!warning && (
          <div className=" col-lg-8 d-flex align-items-end">
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
        )}
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
