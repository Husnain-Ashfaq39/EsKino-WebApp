import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { DatePicker, TimePicker } from "antd";
import moment from "moment";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { addDocument } from "../../services/dbService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentUser } from "../../services/authService";
import Header from "../Header";
import Sidebar from "../Sidebar";

const AddMeeting = () => {
  const navigate = useNavigate();

 

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
      houseOwner: "",
      zipCode: "",
      streetAddress: "",
      capacity: "",
    },
  });

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const calculateStatus = (endDate, endTime, capacity) => {
    const currentTime = moment();
    const formattedEndDate = `${endDate.format("YYYY-MM-DD")}`;
    const endTimeMoment = moment(
      `${formattedEndDate} ${endTime.format("HH:mm")}`,
      "YYYY-MM-DD HH:mm"
    );

    if (currentTime.isAfter(endTimeMoment)) {
      return "Timeout";
    } else if (capacity == 0) {
      return "Closed";
    } else {
      return "Active";
    }
  };

  const showSuccessToast = () => {
    toast.success("Meeting added successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const onSubmit = async (data) => {
    setSubmitting(true);

    // Validation checks
    if (startDate && endDate && endDate.isBefore(startDate)) {
      toast.error("End Date should be the same as or after Start Date");
      setSubmitting(false);
      return;
    }
    if (startTime && endTime && endTime.isBefore(startTime)) {
      toast.error("End time should be after Start Date");
      setSubmitting(false);
      return;
    }


    if (
      startDate &&
      endDate &&
      startDate.isSame(endDate) &&
      startTime &&
      endTime &&
      !endTime.isAfter(startTime)
    ) {
      toast.error("End Time should be after Start Time when Start Date and End Date are the same");
      setSubmitting(false);
      return;
    }

    if (data.capacity <= 0) {
      toast.error("Capacity should be a positive number");
      setSubmitting(false);
      return;
    }

    const formattedData = {
      ...data,
      startDate: startDate ? startDate.toDate() : null,
      endDate: endDate ? endDate.toDate() : null,
      startTime: startTime ? startTime.toDate() : null,
      endTime: endTime ? endTime.toDate() : null,
      Participants: 0,
      Status: calculateStatus(endDate, endTime, data.capacity),
    };

    try {
      await addDocument("meetings", formattedData);
      showSuccessToast();
      reset();
      setStartDate(null);
      setEndDate(null);
      setStartTime(null);
      setEndTime(null);
      navigate("/meetinglist");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Header />
      <Sidebar id="meeting" id1="meetings"  activeClassName="addMeeting" />
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/meetinglist">Meetings</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <FeatherIcon icon="chevron-right" />
                  </li>
                  <li className="breadcrumb-item active">Add Meeting</li>
                </ul>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-12 d-flex">
                <div className="form-group flex-grow-1 me-2">
                  <label className="text-dark">
                    Title <span className="login-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    {...register("title", {
                      required: "This field is required",
                    })}
                  />
                  {errors.title && (
                    <div className="error text-danger">
                      {errors.title.message}
                    </div>
                  )}
                </div>
                <div className="form-group flex-grow-1 ms-2">
                  <label className="text-dark">
                    Capacity <span className="login-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    {...register("capacity", {
                      required: "This field is required",
                    })}
                  />
                  {errors.capacity && (
                    <div className="error text-danger">
                      {errors.capacity.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-12 d-flex">
                <div className="form-group flex-grow-1 me-2">
                  <label className="text-dark">
                    Start Date <span className="login-danger">*</span>
                  </label>
                  <DatePicker
                    className="form-control"
                    onChange={(date) => {
                      setStartDate(date);
                      setValue("startDate", date);
                    }}
                    value={getValues("startDate")}
                  />
                  {errors.startDate && (
                    <div className="error text-danger">
                      {errors.startDate.message}
                    </div>
                  )}
                </div>
                <div className="form-group flex-grow-1 ms-2">
                  <label className="text-dark">
                    End Date <span className="login-danger">*</span>
                  </label>
                  <DatePicker
                    className="form-control"
                    onChange={(date) => {
                      setEndDate(date);
                      setValue("endDate", date);
                    }}
                    value={getValues("endDate")}
                  />
                  {errors.endDate && (
                    <div className="error text-danger">
                      {errors.endDate.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-12 d-flex">
                <div className="form-group flex-grow-1 me-2">
                  <label className="text-dark">
                    Start Time <span className="login-danger">*</span>
                  </label>
                  <TimePicker
                    className="form-control"
                    format="HH:mm"
                    onChange={(time) => {
                      setStartTime(time);
                      setValue("startTime", time);
                    }}
                    value={getValues("startTime")}
                  />
                  {errors.startTime && (
                    <div className="error text-danger">
                      {errors.startTime.message}
                    </div>
                  )}
                </div>
                <div className="form-group flex-grow-1 ms-2">
                  <label className="text-dark">
                    End Time <span className="login-danger">*</span>
                  </label>
                  <TimePicker
                    className="form-control"
                    format="HH:mm"
                    onChange={(time) => {
                      setEndTime(time);
                      setValue("endTime", time);
                    }}
                    value={getValues("endTime")}
                  />
                  {errors.endTime && (
                    <div className="error text-danger">
                      {errors.endTime.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-12 d-flex">
                <div className="form-group flex-grow-1 me-2">
                  <label className="text-dark">
                    House Owner <span className="login-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    {...register("houseOwner", {
                      required: "This field is required",
                    })}
                  />
                  {errors.houseOwner && (
                    <div className="error text-danger">
                      {errors.houseOwner.message}
                    </div>
                  )}
                </div>
                <div className="form-group flex-grow-1 ms-2">
                  <label className="text-dark">
                    Street Address <span className="login-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    {...register("streetAddress", {
                      required: "This field is required",
                    })}
                  />
                  {errors.streetAddress && (
                    <div className="error text-danger">
                      {errors.streetAddress.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label className="text-dark">
                    ZIP Code <span className="login-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    {...register("zipCode", {
                      required: "This field is required",
                      pattern: {
                        value: /^\d+$/,
                        message: "Only numbers are allowed",
                      },
                    })}
                  />
                  {errors.zipCode && (
                    <div className="error text-danger">
                      {errors.zipCode.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-12">
                <div className="doctor-submit text-end">
                  <button
                    type="submit"
                    className="btn btn-primary submit-form me-2"
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Submit"}
                  </button>
                  <button
                    onClick={() => {
                      navigate("/meetinglist");
                    }}
                    type="button"
                    className="btn btn-primary cancel-form"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default AddMeeting;
