import React, { useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { registerUser } from "../../services/authService"; // Import the registration function

const AddAdmin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let tempErrors = {};
    let formIsValid = true;

    if (!name) {
      formIsValid = false;
      tempErrors["name"] = "Cannot be empty";
    }

    if (!email) {
      formIsValid = false;
      tempErrors["email"] = "Cannot be empty";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formIsValid = false;
      tempErrors["email"] = "Email is not valid";
    }

    if (!password) {
      formIsValid = false;
      tempErrors["password"] = "Cannot be empty";
    } else if (password.length < 6) {
      formIsValid = false;
      tempErrors["password"] = "Password must be at least 6 characters long";
    }

    setErrors(tempErrors);
    return formIsValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const userCredential = await registerUser(name, email, password);
        console.log("User registered successfully:", userCredential);
        // Clear the form
        setName("");
        setEmail("");
        setPassword("");
        setErrors({});
      } catch (error) {
        console.error("Error registering new admin:", error.message);
        setErrors({ ...errors, form: error.message });
      }
      setLoading(false);
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
                    <Link to="/adminlist">Admins</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <i className="feather-chevron-right">
                      <FeatherIcon icon="chevron-right" />
                    </i>
                  </li>
                  <li className="breadcrumb-item active">Add Admins</li>
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                            disabled={loading}
                          >
                            Submit
                          </button>
                          {loading && <p>Loading...</p>}
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

export default AddAdmin;
