/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Header from "../../../Header";
import Sidebar from "../../../Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getDocumentByField, updateDocument} from "../../../../services/dbService";
import {deleteFileFromStorage } from "../../../../services/storageService";
import { uploadFile } from "../../../../services/storageService"; // Ensure correct import
import ImageUpload from "../../../ImageUpload"; // Import the ImageUpload component
import { getCurrentUser } from "../../../../services/authService";

const EditHeaderAndPicture2 = () => {
    const { id } = useParams(); // Retrieve the document ID from the URL
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        occupation: "",
        image: "",
        introduction: [],
        zusatzqualifikationen: [],
        aktuell: []
    });
    const doctorID = 2;
    const [newImageUrl, setNewImageUrl] = useState(""); // State for storing new image URL

    useEffect(() => {
        const fetchDocumentData = async () => {
            try {
                const documentSnapshot = await getDocumentByField('Doctors', 'doctorID', doctorID);
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
    }, [doctorID]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageLoad = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const toastId = toast.loading("Uploading image...");
            try {
                const imageUrl = await uploadFile(file, `doctor2/${file.name}`, (progress) => {
                    const percent = Math.round((progress.loaded / progress.total) * 100);
                    toast.update(toastId, { render: `Uploading image... ${percent}%`, type: "info", isLoading: true });
                });
                setNewImageUrl(imageUrl);
                toast.update(toastId, { render: "Image uploaded successfully!", type: "success", isLoading: false, autoClose: 1000 });
            } catch (error) {
                toast.update(toastId, { render: "Image upload failed: " + error.message, type: "error", isLoading: false, autoClose: 2000 });
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

         // Delete the old image if a new one was uploaded and it's different from the existing one
         if (newImageUrl && newImageUrl !== formData.image) {
            try {
                await deleteFileFromStorage(formData.image);
            } catch (error) {
                console.warn("Previous image not found, skipping deletion.");
            }
        }

        try {
            await updateDocument('Doctors', id, {
                ...formData,
                image: newImageUrl || formData.image // Use the new image URL if available
            });
            
            sessionStorage.setItem("updateHeaderAndPicture2", 'true');
            navigate("/doctors/headerandpicture2");
        } catch (error) {
            toast.error('Error updating document: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Header />
            <Sidebar
                id="doctorCard"
                id1="doctorCards"
                activeClassName="doctor2"
            />
            <div className="page-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/landingpage/headerandpicture">Landing Page </Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <i className="feather-chevron-right">
                                            <FeatherIcon icon="chevron-right" />
                                        </i>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        <Link to="/landingpage/headerandpicture">Header and Picture</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <i className="feather-chevron-right">
                                            <FeatherIcon icon="chevron-right" />
                                        </i>
                                    </li>
                                    <li className="breadcrumb-item active">Edit Header and Picture</li>
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
                                                    <h4>Edit Header and Picture</h4>
                                                </div>
                                            </div>
                                            {/* Name */}
                                            <div className="col-12 col-md-6 col-xl-6">
                                                <div className="form-group local-forms">
                                                    <label>Name <span className="login-danger">*</span></label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>

                                            {/* Occupation */}
                                            <div className="col-12 col-md-6 col-xl-6">
                                                <div className="form-group local-forms">
                                                    <label>Occupation <span className="login-danger">*</span></label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="occupation"
                                                        value={formData.occupation}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>

                                            {/* Image Input */}
                                            <ImageUpload id="image" src={formData.image} loadFile={handleImageLoad} imageName="Image" />

                                            {/* Submit/Cancel Button */}
                                            <div className="col-12">
                                                <div className="doctor-submit text-end">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary submit-form me-2"
                                                        disabled={loading}
                                                    >
                                                        {loading ? "Submitting..." : "Submit"}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary cancel-form"
                                                        onClick={() => navigate("/doctors/headerandpicture2")}
                                                    >
                                                        Cancel
                                                    </button>
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
        </div>
    );
};

export default EditHeaderAndPicture2;
