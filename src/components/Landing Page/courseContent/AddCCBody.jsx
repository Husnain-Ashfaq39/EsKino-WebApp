import React, { useState,useEffect } from "react";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { uploadFile } from "../../../services/storageService"; // Import Storage service
import { addDocument,getAllDocuments } from "../../../services/dbService"; // Import Firestore service
import { toast, ToastContainer } from "react-toastify"; // Import toast notifications
import FeatherIcon from "feather-icons-react";
import 'react-toastify/dist/ReactToastify.css';

const AddCCBody = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [quote, setQuote] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [numOrder, setNumOrder] = useState(0);

    useEffect(() => {
        const fetchNumOrder = async () => {
            try {
                const querySnapshot = await getAllDocuments('CourseContentBody');
                setNumOrder(querySnapshot.docs.length + 1); // Correctly setting the next order number
          
            } catch (error) {
                toast.error("Failed to fetch documents count: " + error.message, { autoClose: 2000 });
            }
        };
    
        fetchNumOrder();
    }, []);


    const loadFile = async (event) => {
        const file = event.target.files[0];

        if (file) {
            const toastId = toast.loading("Uploading image...");
            try {
                setLoading(true);
                const uploadedImageURL = await uploadFile(file, `ccbody/Images/${file.name}`, (progress) => {
                    toast.update(toastId, { render: `Uploading image...`, type: "info", isLoading: true });
                });
                setImageUrl(uploadedImageURL);
                setImage(file);
                toast.update(toastId, { render: "Image uploaded successfully!", type: "success", isLoading: false, autoClose: 2000 });
            } catch (error) {
                toast.update(toastId, { render: "Image upload failed: " + error.message, type: "error", isLoading: false, autoClose: 2000 });
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            // Store data in Firestore
            await addDocument('CourseContentBody', {
                numOrder: numOrder, // Add numOrder field with current count              
                CCTitle: title,
                CCQuote: quote,
                CCDescription: description,
                CCImage: imageUrl,
            });

            sessionStorage.setItem('addCCBodySuccess', 'true'); // Set update flag
            navigate("/landingpage/coursecontentbody");
 
        } catch (error) {
            toast.error('Error adding document: ' + error.message, { autoClose: 2000 });
            console.error('Error adding document: ', error);
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
                activeClassName="courseContent"

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
                                                            disabled={loading}
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
                                                            disabled={loading}
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
                                                            disabled={loading}
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
                                                                    <div className="edit-icon" style={{ position: 'absolute', backgroundColor: 'white', left: 170, top: 160 }}>
                                                                        {/* Input for choosing a new image */}
                                                                        <input
                                                                            type="file"
                                                                            accept="image/*"
                                                                            name="CCImage"
                                                                            id="file"
                                                                            onChange={loadFile}
                                                                            className="hide-input"
                                                                            style={{ display: 'none' }}
                                                                            disabled={loading}
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
                                                                        disabled={loading}
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
                                                            disabled={loading}
                                                        >
                                                            {loading ? "Adding..." : "Add"}
                                                        </button>
                                                        <Link to="/landingpage/coursecontentbody">
                                                            <button
                                                                type="button"
                                                                className="btn btn-primary cancel-form"
                                                                disabled={loading}
                                                            >
                                                                Cancel
                                                            </button>
                                                        </Link>
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
            </>
        </div>
    );
};

export default AddCCBody;
