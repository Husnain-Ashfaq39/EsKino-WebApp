import React from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";

const SettingsChangePassword = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="index.html">Dashboard </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <i className="feather-chevron-right">
                      <FeatherIcon icon="chevron-right" />
                    </i>
                  </li>
                  <li className="breadcrumb-item active">Settings</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="settings-menu-links">
            <ul className="nav nav-tabs menu-tabs">
              <li className="nav-item active">
                <Link className="nav-link" to="/settingschangepassword">
                  Change Password
                </Link>
              </li>
            </ul>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <form>
                    <div className="row">
                      <h4 className="page-title">Change Password</h4>
                      <div className="col-12 col-md-6 col-xl-12">
                        <div className="form-group local-forms">
                          <label>
                            Old password <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder=""
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>
                            New password <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder=""
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>
                            Confirm password{" "}
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder=""
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="doctor-submit text-end">
                          <button
                            type="submit"
                            className="btn btn-primary submit-form me-2"
                          >
                            Submit
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

export default SettingsChangePassword;
