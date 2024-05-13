import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import { getDocument, updateDocument } from "../../services/dbService";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useLocation, useNavigate } from "react-router-dom";

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
    FIELD9: "",
  };

  const [participantData, setParticipantData] = useState(
    initialParticipentData
  );

  useEffect(() => {
    console.log(participentId);
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
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching document:", error);
        });
    }
    console.log(participantData);
  }, [participentId]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to handle input changes
  const handleChange = (e) => {
    setParticipantData({ ...participantData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  // Function to validate form inputs
  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    // Required field validation
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "address",
      "persons",
      "personNames",
      "gender",
    ];
    requiredFields.forEach((field) => {
      if (!participantData[field]) {
        isValid = false;
        newErrors[field] = "This field is required";
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate an API call
      const data = {
        firstName: participantData.firstName,
        lastName: participantData.lastName,
        email: participantData.email,
        address: participantData.address,
        persons: participantData.persons,
        personNames: participantData.personNames,
        gender: participantData.gender,
      };

      try {
        // Update the document
        updateDocument("participants", participentId, data);
        console.log("Document successfully updated!");
        setIsSubmitting(false);

        navigate(`/meetinglist/participentlist?meetingid=${participantData.sectionId}&participentid=${participentId}`);
      } catch (error) {
        console.error("Error updating document: ", error);
        setIsSubmitting(false);
      }
    }
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
                    <i className="feather-chevron-right">
                      <FeatherIcon icon="chevron-right" />
                    </i>
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
                    {/* Form fields */}
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
                      <label>Address Owner</label>
                      <input
                        className="form-control"
                        type="text"
                        name="addressOwner"
                        value={participantData.address}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Personals</label>
                      <input
                        className="form-control"
                        type="number"
                        name="personals"
                        value={participantData.persons}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Name of Participants</label>
                      <input
                        className="form-control"
                        type="text"
                        name="nameOfParticipants"
                        value={participantData.personNames}
                        onChange={handleChange}
                      />
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
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
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

export default EditParticipant;
