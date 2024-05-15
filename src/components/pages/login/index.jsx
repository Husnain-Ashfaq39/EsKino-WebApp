import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../../../services/authService";
import { login02, logo2Png } from "../../imagepath";
import { Eye, EyeOff } from "feather-icons-react";
import { ToastContainer, toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import "react-toastify/dist/ReactToastify.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!captchaValue) {
      setError("Please complete the CAPTCHA");
      return;
    }
    try {
      await signIn(email, password);
      navigate("/admin-dashboard");
    } catch (error) {
      setError(error.message);
      console.error("Failed to login", error);
    }
  };

  return (
    <div className="main-wrapper login-body">
      <ToastContainer />
      <div className="container-fluid px-0">
        <div className="row">
          <div className="col-lg-6 login-wrap">
            <div className="login-sec">
              <div className="log-img">
                <img className="img-fluid" src={login02} alt="#" />
              </div>
            </div>
          </div>
          <div className="col-lg-6 login-wrap-bg">
            <div className="login-wrapper">
              <div className="loginbox">
                <div className="login-right">
                  <div className="login-right-wrap">
                    <div className="account-logo">
                      <Link to="/admin-dashboard">
                        <div
                          className="account-logo"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <img
                            src={logo2Png}
                            alt="Eskino"
                            style={{ width: "50px", height: "auto" }}
                          />
                          <h3 style={{ marginLeft: "10px", marginTop: "25px" }}>
                            Eskino
                          </h3>
                        </div>
                      </Link>
                    </div>
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label>
                          Email <span className="login-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>
                          Password <span className="login-danger">*</span>
                        </label>
                        <input
                          type={passwordVisible ? "text" : "password"}
                          className="form-control pass-input"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <span
                          className="toggle-password"
                          onClick={togglePasswordVisibility}
                        >
                          {passwordVisible ? (
                            <EyeOff className="react-feather-custom" />
                          ) : (
                            <Eye className="react-feather-custom" />
                          )}
                        </span>
                      </div>
                      <div className="form-group text-right">
                        <Link to="/forgotpassword" className="forgot-link">
                          Forgot Password?
                        </Link>
                      </div>
                      <div className="form-group">
                        <ReCAPTCHA
                          sitekey="6Lej_twpAAAAAJ0kHb_xT7MjlNFPjFz5tksuhB0G"
                          onChange={handleCaptchaChange}
                        />
                      </div>
                      {error && <p className="text-danger">{error}</p>}
                      <div className="form-group login-btn">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
