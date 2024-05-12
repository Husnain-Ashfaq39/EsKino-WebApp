import React, { useState, useEffect } from "react";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import { Link, useParams } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { imagesend } from "../../imagepath";
import { getDocument, updateDocument } from "../../../services/dbService";

const EditCCBody = () => {
    const { id } = useParams(); // Retrieve the document ID from the URL
    const [formData, setFormData] = useState({
        CCTitle: "",
        CCQuote: "",
        CCDescription: "",
        CCImage: "",
    });

    useEffect(() => {
        const fetchDocumentData = async () => {
            try {
                const documentSnapshot = await getDocument('CourseContentBody', id);
                if (documentSnapshot.exists()) {
                    const documentData = documentSnapshot.data();
                    setFormData(documentData);
                } else {
                    console.error('Document does not exist');
                }
            } catch (error) {
                console.error('Error fetching document data:', error);
            }
        };

        fetchDocumentData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDocument('CourseContentBody', id, formData);
            console.log('Document updated successfully!');
        } catch (error) {
            console.error('Error updating document:', error);
        }
    };

    const loadFile = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
            // Update the CCImage state with the data URL of the uploaded image
            setFormData((prevData) => ({
                ...prevData,
                CCImage: reader.result,
            }));
        };
    
        if (file) {
            // Read the file as a data URL
            reader.readAsDataURL(file);
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
            <div className="page-wrapper">
                <div className="content">
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
                                        <Link to="/landingpage/coursecontentbody">Course Content Body</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <i className="feather-chevron-right">
                                            <FeatherIcon icon="chevron-right" />
                                        </i>
                                    </li>
                                    <li className="breadcrumb-item active">Edit Course Content Body</li>
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
                                            <div className="col-12">
                                                <div className="form-heading">
                                                    <h4>Edit Course Content Body</h4>
                                                </div>
                                            </div>
                                            {/* TItle */}
                                            <div className="col-12 col-md-6 col-xl-6">
                                                <div className="form-group local-forms">
                                                    <label>Title <span className="login-danger">*</span></label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="CCTitle"
                                                        value={formData.CCTitle}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>

                                            {/* Quote */}
                                            <div className="col-12 col-md-6 col-xl-6">
                                                <div className="form-group local-forms">
                                                    <label>Quote <span className="login-danger">*</span></label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="CCQuote"
                                                        value={formData.CCQuote}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <div className="col-12 col-sm-12">
                                                <div className="form-group local-forms">
                                                    <label>Description <span className="login-danger">*</span></label>
                                                    <textarea
                                                        className="form-control"
                                                        rows={3}
                                                        name="CCDescription"
                                                        value={formData.CCDescription}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>

                                            {/* Image Input */}
                                                                 
{/* Image Input */}
<div className="col-10 col-md-2 col-xl-4">
  <div className="form-group">
    <label className={formData.CCImage ? "" : "local-top"}>
      Image <span className="login-danger">*</span>
    </label>
    <div className={formData.CCImage ? "upload-files-avator" : "upload-files-avator settings-btn"} style={{ position: 'relative' }}>
      {/* Display the uploaded image */}
      {formData.CCImage && (
        <div className="uploaded-image">
          <img
            src={formData.CCImage}
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
      {!formData.CCImage && (
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
        </div>
    );
};

export default EditCCBody;
