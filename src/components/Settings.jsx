import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { getAllDocuments, addDocument, updateDocument } from "../services/dbService";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Settings = () => {
  const {
    register: registerContact,
    handleSubmit: handleSubmitContact,
    setValue: setValueContact,
    formState: { errors: errorsContact },
  } = useForm({
    defaultValues: {
      address: "",
      phone: "",
      email: "",
    },
  });

  const {
    register: registerSocial,
    handleSubmit: handleSubmitSocial,
    setValue: setValueSocial,
    formState: { errors: errorsSocial },
  } = useForm({
    defaultValues: {
      facebook: "",
      youtube: "",
      twitter: "",
      linkedin: "",
      instagram: "",
    },
  });

  const [submittingContact, setSubmittingContact] = useState(false);
  const [submittingSocial, setSubmittingSocial] = useState(false);

  const [contactDocId, setContactDocId] = useState(null);
  const [socialDocId, setSocialDocId] = useState(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const contactDocs = await getAllDocuments("contactInfo");
        if (!contactDocs.empty) {
          const contactDoc = contactDocs.docs[0];
          const data = contactDoc.data();
          setContactDocId(contactDoc.id);
          setValueContact("address", data.address);
          setValueContact("phone", data.phone);
          setValueContact("email", data.email);
        }
      } catch (error) {
        console.error("Error fetching contact info: ", error);
      }
    };

    const fetchSocialLinks = async () => {
      try {
        const socialDocs = await getAllDocuments("socialLinks");
        if (!socialDocs.empty) {
          const socialDoc = socialDocs.docs[0];
          const data = socialDoc.data();
          setSocialDocId(socialDoc.id);
          setValueSocial("facebook", data.facebook);
          setValueSocial("youtube", data.youtube);
          setValueSocial("twitter", data.twitter);
          setValueSocial("linkedin", data.linkedin);
          setValueSocial("instagram", data.instagram);
        }
      } catch (error) {
        console.error("Error fetching social links: ", error);
      }
    };

    fetchContactInfo();
    fetchSocialLinks();
  }, [setValueContact, setValueSocial]);

  const onSubmitContactInfo = async (data) => {
    setSubmittingContact(true);
    try {
      if (contactDocId) {
        await updateDocument("contactInfo", contactDocId, data);
      } else {
        const docRef = await addDocument("contactInfo", data);
        setContactDocId(docRef.id);
      }
      toast.success("Contacts updated Successfully!");
      setValueContact("address", data.address);
      setValueContact("phone", data.phone);
      setValueContact("email", data.email);
    } catch (error) {
      console.error("Error submitting contact info: ", error);
      toast.error("Failed to submit Contact Info!");
    } finally {
      setSubmittingContact(false);
    }
  };

  const onSubmitSocialLinks = async (data) => {
    setSubmittingSocial(true);
    try {
      if (socialDocId) {
        await updateDocument("socialLinks", socialDocId, data);
      } else {
        const docRef = await addDocument("socialLinks", data);
        setSocialDocId(docRef.id);
      }
      toast.success("Social Links updated Successfully!");
      setValueSocial("facebook", data.facebook);
      setValueSocial("youtube", data.youtube);
      setValueSocial("twitter", data.twitter);
      setValueSocial("linkedin", data.linkedin);
      setValueSocial("instagram", data.instagram);
    } catch (error) {
      console.error("Error submitting social links: ", error);
      toast.error("Failed to submit Social Links!");
    } finally {
      setSubmittingSocial(false);
    }
  };

  return (
    <div>
      <Header />
      <Sidebar id="menu-item2" activeClassName="settings" />
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
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
          <div className="row">
            <div className="col-12">
              <form onSubmit={handleSubmitContact(onSubmitContactInfo)}>
                <h3>Contact Information</h3>
                <div className="form-group">
                  <label className="text-dark">
                    Address <span className="login-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    {...registerContact("address", { required: "This field is required" })}
                  />
                  {errorsContact.address && (
                    <div className="error text-danger">
                      {errorsContact.address.message}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label className="text-dark">
                    Phone <span className="login-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    {...registerContact("phone", { required: "This field is required" })}
                  />
                  {errorsContact.phone && (
                    <div className="error text-danger">
                      {errorsContact.phone.message}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label className="text-dark">
                    Email <span className="login-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    {...registerContact("email", { required: "This field is required" })}
                  />
                  {errorsContact.email && (
                    <div className="error text-danger">
                      {errorsContact.email.message}
                    </div>
                  )}
                </div>
                <div className="doctor-submit text-end">
                  <button
                    type="submit"
                    className="btn btn-primary submit-form me-2"
                    disabled={submittingContact}
                  >
                    {submittingContact ? "Submitting..." : "Save Contact Info"}
                  </button>
                </div>
              </form>
            </div>
            <div className="col-12">
              <form onSubmit={handleSubmitSocial(onSubmitSocialLinks)}>
                <h3>Social Media Links</h3>
                <div className="form-group">
                  <label className="text-dark">
                    Facebook
                  </label>
                  <input
                    className="form-control"
                    {...registerSocial("facebook")}
                  />
                </div>
                <div className="form-group">
                  <label className="text-dark">
                    YouTube
                  </label>
                  <input
                    className="form-control"
                    {...registerSocial("youtube")}
                  />
                </div>
                <div className="form-group">
                  <label className="text-dark">
                    Twitter
                  </label>
                  <input
                    className="form-control"
                    {...registerSocial("twitter")}
                  />
                </div>
                <div className="form-group">
                  <label className="text-dark">
                    LinkedIn
                  </label>
                  <input
                    className="form-control"
                    {...registerSocial("linkedin")}
                  />
                </div>
                <div className="form-group">
                  <label className="text-dark">
                    Instagram
                  </label>
                  <input
                    className="form-control"
                    {...registerSocial("instagram")}
                  />
                </div>
                <div className="doctor-submit text-end">
                  <button
                    type="submit"
                    className="btn btn-primary submit-form me-2"
                    disabled={submittingSocial}
                  >
                    {submittingSocial ? "Submitting..." : "Save Social Links"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Settings;
