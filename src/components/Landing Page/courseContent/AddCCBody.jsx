/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import { Link } from "react-router-dom";
import { uploadFile } from "../../../services/storageService"; // Import Storage service
import { addDocument } from "../../../services/dbService"; // Import Firestore service
import { favicon } from "../../imagepath"; // Assuming imagesend is not used
import FeatherIcon from "feather-icons-react";

const AddCCBody = () => {
  const [show, setShow] = useState(false); // Define show state variable
  const [title, setTitle] = useState('');
  const [quote, setQuote] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const loadFile = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Upload image to Firebase Storage
      const imageUrl = await uploadFile(image, `images/${image.name}`);

      // Store data in Firestore
      const docId = await addDocument('CourseContentBody', {
        CCTitle: title,
        CCQuote: quote,
        CCDescription: description,
        CCImage: imageUrl,
      });

      console.log('Document added with ID:', docId);

      // Reset form fields
      setTitle('');
      setQuote('');
      setDescription('');
      setImage(null);
      setShow(false);
      
      // Show success message or redirect
    } catch (error) {
      console.error('Error adding document: ', error);
      // Handle error
    }
  };

  return (
    <div>
      <Header />
      <Sidebar
        id="menu-item4"
        id1="menu-items4"
        activeClassName="edit-appoinment"
      />
      <>
        <div className="page-wrapper">
          <div className="content">
            {/* Page Header */}
            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/landingpage/coursecontentbody">Landing Page </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <i className="feather-chevron-right">
                        <FeatherIcon icon="chevron-right" />
                      </i>
                    </li>
                    <li className="breadcrumb-item active">
                      <Link to="/landingpage/coursecontentbody">Course Content Body </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <i className="feather-chevron-right">
                        <FeatherIcon icon="chevron-right" />
                      </i>
                    </li>
                    <li className="breadcrumb-item active">Add Course Content Body</li>
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
                            <h4>Add Course Content Body</h4>
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
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                            />
                          </div>
                        </div>

                        {/* Quote */}
                        <div className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>
                              Quote <span className="login-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              value={quote}
                              onChange={(e) => setQuote(e.target.value)}
                            />
                          </div>
                        </div>
                     
                        {/* Description */}
                        <div className="col-12 col-sm-12">
                          <div className="form-group local-forms">
                            <label>
                              Description <span className="login-danger">*</span>
                            </label>
                            <textarea
                              className="form-control"
                              rows={3}
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </div>
                        </div>
                        
{/* Image Input */}
<div className="col-10 col-md-2 col-xl-4">
  <div className="form-group">
    <label className={image ? "" : "local-top"}>
      Image <span className="login-danger">*</span>
    </label>
    <div className={image ? "upload-files-avator" : "upload-files-avator settings-btn"} style={{ position: 'relative' }}>
      {/* Display the uploaded image */}
      {image && (
        <div className="uploaded-image">
          <img
            src={URL.createObjectURL(image)}
            alt="Uploaded Image"
            style={{
              width: '180px',
              height: '180px',
              objectFit: 'cover',
            }}
          />
          <div className="edit-icon" style={{ position: 'absolute',backgroundColor: 'white', left:170,top:160 }}>
            {/* Input for choosing a new image */}
            <input
              type="file"
              accept="image/*"
              name="CCImage"
              id="file"
              onChange={loadFile}
              className="hide-input"
              style={{ display: 'none' }}
            />
            <label htmlFor="file" className="upload" style={{ cursor: 'pointer' }}>
              <FeatherIcon icon="edit" />
            </label>
          </div>
        </div>
      )}
      {/* Input for choosing a new image */}
      {!image && (
        <div>
          <input
            type="file"
            accept="image/*"
            name="CCImage"
            id="file"
            onChange={loadFile}
            className="hide-input"
            placeholder="Select an Image..."
          />
          <label htmlFor="file" className="upload" style={{ cursor: 'pointer' }}>
            Choose File
          </label>
        </div>
      )}
    </div>
  </div>
</div>




                      {/* Submit/Cancel Button */}
                        <div className="col-12">
                          <div className="doctor-submit text-end">
                            <button
                              type="submit"
                              className="btn btn-primary submit-form me-2"
                            >
                              Submit
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
      </>
    </div>
  );
};

export default AddCCBody;
