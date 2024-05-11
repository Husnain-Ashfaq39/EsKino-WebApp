import React, { useState,useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { DatePicker, TimePicker } from "antd";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { getDocument } from "../../services/dbService";

const EditMeeting = () => {
  const { id } = useParams(); 
  const initialMeetingData = {
    title: "",
    startDate: null,
    endDate: null,
    startTime: null,
    endTime: null,
    houseOwner: "",
    zipCode: "",
    streetAddress: "",
    capacity: "",
  };

  const [meetingData, setMeetingData] = useState(initialMeetingData);

  useEffect(() => {
    getDocument('meetings', id)
      .then(querySnapshot => {
        if (querySnapshot.docs.length > 0) {
          const doc = querySnapshot.docs[0]; // Assuming you want the first document
          const loadedMeeting = {
            id: doc.id,
            title: doc.data().title, // Ensure correct field name
            startDate: moment(doc.data().startDate), // Use moment here for DatePicker compatibility
            endDate: moment(doc.data().endDate),
            startTime: moment(doc.data().startTime),
            endTime: moment(doc.data().endTime),
            houseOwner: doc.data().houseOwner,
            streetAddress: doc.data().streetAddress,
            zipCode: doc.data().zipCode,
            capacity: doc.data().capacity,
          };
          setMeetingData(loadedMeeting);
        }
      }).catch(error => {
        console.log(error);
      })
  }, [id]);
  
  


  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to handle input changes
  const handleChange = (e) => {
    setMeetingData({ ...meetingData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  // Function to handle date and time changes
  const handleDateTimeChange = (value, name) => {
    setMeetingData({ ...meetingData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  // Function to validate form inputs
  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    // Required field validation
    const requiredFields = [
      "title",
      "startDate",
      "endDate",
      "startTime",
      "endTime",
      "houseOwner",
      "streetAddress",
      "zipCode",
      "capacity",
    ];
    requiredFields.forEach((field) => {
      if (
        !meetingData[field] ||
        (meetingData[field] instanceof moment && !meetingData[field].isValid())
      ) {
        isValid = false;
        newErrors[field] = "This field is required";
      }
    });

    // Validate that end time is after start time
    if (
      meetingData.startTime &&
      meetingData.endTime &&
      !meetingData.endTime.isAfter(meetingData.startTime)
    ) {
      isValid = false;
      newErrors.endTime = "End time must be after start time";
    }

    // Validate that end date is the same or after start date
    if (
      meetingData.startDate &&
      meetingData.endDate &&
      meetingData.endDate.isBefore(meetingData.startDate)
    ) {
      isValid = false;
      newErrors.endDate = "End date must be the same or after start date";
    }

    setErrors(newErrors);
    return isValid;
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate an API call
      setTimeout(() => {
        console.log(meetingData); // Logging the data for now
        setIsSubmitting(false);
        setMeetingData(initialMeetingData); // Reset form after submission
      }, 2000); // Simulating a 2 second delay for the API call
    }
  };

  return (
    <div>
      <Header />
      <Sidebar id="menu-item2" activeClassName="add-meeting" />
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
                    <i className="feather-chevron-right">
                      <FeatherIcon icon="chevron-right" />
                    </i>
                  </li>
                  <li className="breadcrumb-item active">Edit Meeting</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <label>
                            Title <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="title"
                            placeholder="Enter meeting title"
                            value={meetingData.title}
                            onChange={handleChange}
                            defaultValue={meetingData.title}
                          />
                          {errors.title && (
                            <div className="error text-danger">
                              {errors.title}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-12 col-md-4">
                        <div className="form-group">
                          <label>
                            Start Date <span className="login-danger">*</span>
                          </label>
                          <DatePicker
                            className="form-control"
                            onChange={(date) =>
                              handleDateTimeChange(date, "startDate")
                            }
                            value={meetingData.startDate}
                          />
                          {errors.startDate && (
                            <div className="error text-danger">
                              {errors.startDate}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-12 col-md-4">
                        <div className="form-group">
                          <label>
                            End Date <span className="login-danger">*</span>
                          </label>
                          <DatePicker
                            className="form-control"
                            onChange={(date) =>
                              handleDateTimeChange(date, "endDate")
                            }
                            value={meetingData.endDate}
                          />
                          {errors.endDate && (
                            <div className="error text-danger">
                              {errors.endDate}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-12 col-md-4">
                        <div className="form-group">
                          <label>
                            Start Time{" "}
                            <span className="login-danger text-danger">*</span>
                          </label>
                          <TimePicker
                            className="form-control"
                            use12Hours
                            format="h:mm a"
                            onChange={(time) =>
                              handleDateTimeChange(time, "startTime")
                            }
                            value={meetingData.startTime}
                          />
                          {errors.startTime && (
                            <div className="error text-danger">
                              {errors.startTime}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-12 col-md-4">
                        <div className="form-group">
                          <label>
                            End Time <span className="login-danger">*</span>
                          </label>
                          <TimePicker
                            className="form-control"
                            use12Hours
                            format="h:mm a"
                            onChange={(time) =>
                              handleDateTimeChange(time, "endTime")
                            }
                            value={meetingData.endTime}
                          />
                          {errors.endTime && (
                            <div className="error text-danger">
                              {errors.endTime}
                            </div>
                          )}
                        </div>
                      </div>
                      {/* House Owner Input */}
                      <div className="col-12">
                        <div className="form-group">
                          <label>
                            House Owner <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="houseOwner"
                            placeholder="Enter house owner's name"
                            value={meetingData.houseOwner}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* Address Input */}
                      <div className="col-12">
                        <div className="form-group">
                          <label>
                            Street Address{" "}
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="streetAddress"
                            placeholder="Enter street address"
                            value={meetingData.streetAddress}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* ZIP Code Input */}
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label>
                            ZIP Code <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="zipCode"
                            placeholder="Enter ZIP code"
                            value={meetingData.zipCode}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* Capacity Input */}
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label>
                            Capacity <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            name="capacity"
                            placeholder="Enter capacity"
                            value={meetingData.capacity}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      {/* ... */}
                      <div className="col-12">
                        <div className="doctor-submit text-end">
                          <button
                            type="submit"
                            className="btn btn-primary submit-form me-2"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <span> Submitting...</span>
                            ) : (
                              "Submit"
                            )}
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary cancel-form"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMeeting;
