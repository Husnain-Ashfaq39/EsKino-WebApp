/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import FeatherIcon from "feather-icons-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getDocument, updateDocument } from "../../../services/dbService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditCCHeading = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    CCHeadTitle: "",
    CCHeadSubtitle: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const doc = await getDocument("CourseContentHeading", id);
      setFormData(doc.data());
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateDocument("CourseContentHeading", id, formData);
      sessionStorage.setItem("updateCCHeadingSuccess", "true");
      navigate("/landingpage/coursecontentheading");
    } catch (error) {
      toast.error("Error updating document: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <Sidebar
        id="menu-item4"
        id1="menu-items4"
        activeClassName="edit-heroSection"
      />
      <div className="page-wrapper">
        <div className="content">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item active">
                    <Link to="/landingpage/coursecontentheading">
                      Landing Page{" "}
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <i className="feather-chevron-right">
                      <FeatherIcon icon="chevron-right" />
                    </i>
                  </li>
                  <li className="breadcrumb-item active">
                    <Link to="/landingpage/coursecontentheading">
                      Course Content Heading
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <i className="feather-chevron-right">
                      <FeatherIcon icon="chevron-right" />
                    </i>
                  </li>
                  <li className="breadcrumb-item">Edit Course Content Heading</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-12">
                        <div className="form-heading">
                          <h4>Course Content Heading Details</h4>
                        </div>
                      </div>
                      {/* Title */}
                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>
                            Title <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="CCHeadTitle"
                            value={formData.CCHeadTitle}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      {/* SubTitle */}
                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>
                            Subtitle <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="CCHeadSubtitle"
                            value={formData.CCHeadSubtitle}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      {/* Submit and Cancel Button */}
                      <div className="col-12">
                        <div className="doctor-submit text-end">
                          <button
                            type="submit"
                            className="btn btn-primary submit-form me-2"
                            disabled={loading}
                          >
                            {loading ? "Updating..." : "Submit"}
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary cancel-form"
                            onClick={() => navigate("/landingpage/coursecontentheading")}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCCHeading;
