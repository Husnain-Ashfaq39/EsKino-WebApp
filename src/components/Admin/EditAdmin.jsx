import React, { useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";

const EditAdmin = () => {
  const initialAdminData = {
    name: "",
    email: "",
    password: "",
  };

  const [adminData, setAdminData] = useState(initialAdminData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to handle input changes
  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  // Function to validate form inputs
  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    // Required field validation
    const requiredFields = ["name", "email", "password"];
    requiredFields.forEach((field) => {
      if (!adminData[field]) {
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
      setTimeout(() => {
        console.log(adminData); // Logging the data for now
        setIsSubmitting(false);
        setAdminData(initialAdminData); // Reset form fields after submission
      }, 2000); // Simulating a 2 second delay for the API call
    }
  };

  return (
    <div>
      <Header />
      <Sidebar id="menu-item3" id1="menu-items3" activeClassName="add-staff" />
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/adminlist">Admins </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <i className="feather-chevron-right">
                      <FeatherIcon icon="chevron-right" />
                    </i>
                  </li>
                  <li className="breadcrumb-item active">Edit Admin</li>
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
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label>
                            Name <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="name"
                            value={adminData.name}
                            onChange={handleChange}
                          />
                          {errors.name && (
                            <div className="error text-danger">
                              {errors.name}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label>
                            Email <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="email"
                            name="email"
                            value={adminData.email}
                            onChange={handleChange}
                          />
                          {errors.email && (
                            <div className="error text-danger">
                              {errors.email}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label>
                            Password <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="password"
                            name="password"
                            value={adminData.password}
                            onChange={handleChange}
                          />
                          {errors.password && (
                            <div className="error text-danger">
                              {errors.password}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="text-end">
                          <button
                            type="submit"
                            className="btn btn-primary me-2"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Submitting..." : "Submit"}
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

export default EditAdmin;
