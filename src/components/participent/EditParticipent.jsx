import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import { getDocument, updateDocument } from "../../services/dbService";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useLocation, useNavigate } from "react-router-dom";
import { DatePicker, Modal } from "antd"; // Importing Modal
import { toast, ToastContainer } from "react-toastify"; // Importing ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Importing react-toastify CSS
import moment from "moment"; // Importing moment for date formatting

const EditParticipant = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const participentId = searchParams.get("participentid");

  const initialParticipentData = {
    sectionId: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    persons: 0,
    personNames: "",
    gender: "",
    issueDate: null, // Initial state for issue date
    dueDate: null, // Initial state for due date
    note: "Please pay within 15 days. Thank you for your business.", // Default note
  };

  const [participantData, setParticipantData] = useState(initialParticipentData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

  useEffect(() => {
    if (participentId) {
      getDocument("participants", participentId)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setParticipantData({
              firstName: data.firstName || "",
              lastName: data.lastName || "",
              email: data.email || "",
              address: data.address || "",
              persons: data.persons || "",
              personNames: data.personNames || "",
              gender: data.gender || "",
              sectionId: data.sectionId || "",
              issueDate: data.issueDate ? moment(data.issueDate, "DD/MM/YYYY") : null,
              dueDate: data.dueDate ? moment(data.dueDate, "DD/MM/YYYY") : null,
              note: data.note || "Please pay within 15 days. Thank you for your business.",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [participentId]);

  const handleChange = (e) => {
    setParticipantData({ ...participantData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleDateChange = (date, dateString, fieldName) => {
    setParticipantData({ ...participantData, [fieldName]: date });
    if (errors[fieldName]) {
      setErrors({ ...errors, [fieldName]: null });
    }
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "address",
      "persons",
      "personNames",
      "gender",
      "issueDate",
      "dueDate",
      "note",
    ];
    requiredFields.forEach((field) => {
      if (!participantData[field]) {
        isValid = false;
        newErrors[field] = "This field is required";
      }
    });

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (participantData.email && !emailPattern.test(participantData.email)) {
      isValid = false;
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsModalVisible(true); // Show confirmation modal
    }
  };

  const handleModalOk = async () => {
    setIsSubmitting(true);
    const data = {
      firstName: participantData.firstName,
      lastName: participantData.lastName,
      email: participantData.email,
      address: participantData.address,
      persons: participantData.persons,
      personNames: participantData.personNames,
      gender: participantData.gender,
      issueDate: participantData.issueDate ? participantData.issueDate.format("DD/MM/YYYY") : null,
      dueDate: participantData.dueDate ? participantData.dueDate.format("DD/MM/YYYY") : null,
      note: participantData.note,
    };

    try {
      await updateDocument("participants", participentId, data);
      setIsSubmitting(false);
      setIsModalVisible(false);
      navigate(`/meetinglist/participantlist?meetingid=${participantData.sectionId}`, {
        state: { showSuccessToast: true }
      });
    } catch (error) {
      console.error("Error updating participant data:", error);
      setIsSubmitting(false);
      toast.error('There was an error updating the participant data.');
      setIsModalVisible(false);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    navigate(`/meetinglist/participantlist?meetingid=${participantData.sectionId}`, {
      state: { showCancelToast: true }
    });
  };

  return (
    <div>
      <Header />
      <Sidebar id="menu-item2" activeClassName="edit-participant" />
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/participentlist">Participants</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <FeatherIcon icon="chevron-right" />
                  </li>
                  <li className="breadcrumb-item active">Edit Participant</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="firstName"
                        value={participantData.firstName}
                        onChange={handleChange}
                      />
                      {errors.firstName && (
                        <div className="error text-danger">
                          {errors.firstName}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="lastName"
                        value={participantData.lastName}
                        onChange={handleChange}
                      />
                      {errors.lastName && (
                        <div className="error text-danger">
                          {errors.lastName}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Email</label>
                      <input
                        className="form-control"
                        type="email"
                        name="email"
                        value={participantData.email}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <div className="error text-danger">{errors.email}</div>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Address</label>
                      <input
                        className="form-control"
                        type="text"
                        name="address"
                        value={participantData.address}
                        onChange={handleChange}
                      />
                      {errors.address && (
                        <div className="error text-danger">
                          {errors.address}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Name of Participants</label>
                      <input
                        className="form-control"
                        type="text"
                        name="personNames"
                        value={participantData.personNames}
                        onChange={handleChange}
                      />
                      {errors.personNames && (
                        <div className="error text-danger">
                          {errors.personNames}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Gender</label>
                      <div className="d-flex align-items-center">
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="male"
                            value="Male"
                            checked={participantData.gender === "Male"}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor="male">
                            Male
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="female"
                            value="Female"
                            checked={participantData.gender === "Female"}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor="female">
                            Female
                          </label>
                        </div>
                      </div>
                      {errors.gender && (
                        <div className="error text-danger">{errors.gender}</div>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Issue Date</label>
                      <DatePicker
                        className="form-control"
                        format="DD/MM/YYYY"
                        value={participantData.issueDate}
                        onChange={(date, dateString) =>
                          handleDateChange(date, dateString, "issueDate")
                        }
                      />
                      {errors.issueDate && (
                        <div className="error text-danger">
                          {errors.issueDate}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Due Date</label>
                      <DatePicker
                        className="form-control"
                        format="DD/MM/YYYY"
                        value={participantData.dueDate}
                        onChange={(date, dateString) =>
                          handleDateChange(date, dateString, "dueDate")
                        }
                      />
                      {errors.dueDate && (
                        <div className="error text-danger">{errors.dueDate}</div>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Note</label>
                      <textarea
                        className="form-control"
                        name="note"
                        value={participantData.note}
                        onChange={handleChange}
                      />
                      {errors.note && (
                        <div className="error text-danger">{errors.note}</div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </form>
                  <Modal
                    title="Confirm Update"
                    visible={isModalVisible}
                    onOk={handleModalOk}
                    onCancel={handleModalCancel}
                    okButtonProps={{ loading: isSubmitting }}
                  >
                    <p>Are you sure you want to update the participant data?</p>
                  </Modal>
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditParticipant;
