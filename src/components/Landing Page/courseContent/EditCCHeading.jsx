/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import { favicon } from "../../imagepath";
import FeatherIcon from "feather-icons-react";
import { Link, useParams } from "react-router-dom";
import { getDocument, updateDocument } from "../../../services/dbService"; // Import Firestore service

const EditCCHeading = () => {
    const { id } = useParams(); // Get the document ID from URL params
    const [formData, setFormData] = useState({
        CCHeadTitle: "",
        CCHeadSubtitle: "",
        CCHeadDescription: "",
        CCHeadImage: ""
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const doc = await getDocument('CourseContentHeading', id); // Fetch document from Firestore by ID
            setFormData(doc.data()); // Set the fetched document data to state
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const loadFile = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
            // Update the CCHeadImage state with the data URL of the uploaded image
            setFormData((prevData) => ({
                ...prevData,
                CCHeadImage: reader.result,
            }));
        };
    
        if (file) {
            // Read the file as a data URL
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDocument('CourseContentHeading', id, formData); // Update document in Firestore with the new data
            // Optionally, you can redirect the user to another page after successful update
        } catch (error) {
            console.error('Error updating document:', error);
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
            <>
                <div className="page-wrapper">
                    <div className="content">
                        {/* Page Header */}
                        <div className="page-header">
                            <div className="row">
                                <div className="col-sm-12">
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item active">
                                            <Link to="/landingpage/coursecontentheading">Landing Page </Link>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <i className="feather-chevron-right">
                                                <FeatherIcon icon="chevron-right" />
                                            </i>
                                        </li>
                                        <li className="breadcrumb-item active">
                                            <Link to="/landingpage/coursecontentheading">Course Content Heading</Link>
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
                                                {/* Description */}
                                                <div className="col-12 col-sm-12">
                                                    <div className="form-group local-forms">
                                                        <label>
                                                            Description <span className="login-danger">*</span>
                                                        </label>
                                                        <textarea
                                                            className="form-control"
                                                            rows={3}
                                                            cols={30}
                                                            name="CCHeadDescription"
                                                            value={formData.CCHeadDescription}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>



                                              {/* Image Input */}
<div className="col-10 col-md-2 col-xl-4">
  <div className="form-group">
    <label className={formData.CCHeadImage ? "" : "local-top"}>
      Image <span className="login-danger">*</span>
    </label>
    <div className={formData.CCHeadImage ? "upload-files-avator" : "upload-files-avator settings-btn"} style={{ position: 'relative' }}>
      {/* Display the uploaded image */}
      {formData.CCHeadImage && (
        <div className="uploaded-image">
          <img
            src={formData.CCHeadImage}
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
              name="CCHeadImage"
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
      {!formData.CCHeadImage && (
        <div>
          <input
            type="file"
            accept="image/*"
            name="CCHeadImage"
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

                                                {/* Submit and Cancel Button */}
                                                <div className="col-12">
                                                    <div className="doctor-submit text-end">
                                                        <button
                                                            type="submit"
                                                            className="btn btn-primary submit-form me-2"
                                                        >
                                                            Submit
                                                        </button>
                                                        <button
                                                            type="submit"
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

export default EditCCHeading;
