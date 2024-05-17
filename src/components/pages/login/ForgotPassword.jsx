import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login02, loginlogo, logo, logo2Png } from "../../imagepath";
import {
  getAuth,
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);

      if (signInMethods.length > 0) {
        await sendPasswordResetEmail(auth, email);
        setMessage("Password reset email sent. Check your inbox.");
        setTimeout(() => navigate("/login"), 5000); // Redirect to login after 5 seconds
      } else {
        setError("User not found!");
      }
    } catch (error) {
      setError(error.message);
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
                <img className="img-fluid" src={login02} alt="Logo" />
              </div>
            </div>
          </div>
          <div className="col-lg-6 login-wrap-bg">
            <div className="login-wrapper">
              <div className="loginbox">
                <div className="login-right">
                  <div className="login-right-wrap">
                    <div className="account-logo">
                      <Link to="/" className="logo">
                        <img src={logo} width={35} height={35} alt="" />{" "}
                        <h2 className="mb-0 ml-1">Eskino</h2>
                      </Link>
                    </div>
                    <h2>Reset Password</h2>
                    <form onSubmit={handleSendOtp}>
                      <div className="form-group">
                        <label>
                          Email <span className="login-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value.trim())} // Trim any spaces
                          required
                        />
                      </div>
                      {message && <p className="text-success">{message}</p>}
                      {error && <p className="text-danger">{error}</p>}
                      <div className="form-group login-btn">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          Reset Password
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

export default ForgotPassword;
