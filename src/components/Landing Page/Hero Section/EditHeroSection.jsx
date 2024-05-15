/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import { Link, useParams, useNavigate } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getDocument, updateDocument } from "../../../services/dbService";
import { uploadFile, deleteFileFromStorage } from "../../../services/storageService"; // Ensure correct import
import ImageUpload from "../ImageUpload"; // Import the ImageUpload component

const EditHeroSection = () => {
    const { id } = useParams(); // Retrieve the document ID from the URL
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        heroTitle: "",
        heroSubtitle: "",
        heroBackground: "",
        heroLogo: "",
    });

    useEffect(() => {
        const fetchDocumentData = async () => {
            try {
                const documentSnapshot = await getDocument('HeroSection', id);
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

    const handleBackgroundImageLoad = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const backgroundUrl = await uploadFile(file, `images/${file.name}`);
                setFormData((prevData) => ({
                    ...prevData,
                    heroBackground: backgroundUrl,
                }));
            } catch (error) {
                toast.error("Background image upload failed: " + error.message);
            } 
        }
    };

    const handleLogoLoad = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const logoUrl = await uploadFile(file, `images/${file.name}`);
                setFormData((prevData) => ({
                    ...prevData,
                    heroLogo: logoUrl,
                }));
            } catch (error) {
                toast.error("Logo image upload failed: " + error.message);
            } 
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateDocument('HeroSection', id, formData);
            toast.success('Hero Section updated successfully!');
            navigate("/landingpage/herosection");
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
                id="menu-item4"
                id1="menu-items4"
                activeClassName="edit-heroSection"
            />
            <div className="page-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/landingpage/herosection">Landing Page </Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <i className="feather-chevron-right">
                                            <FeatherIcon icon="chevron-right" />
                                        </i>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        <Link to="/landingpage/herosection">Hero Section</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <i className="feather-chevron-right">
                                            <FeatherIcon icon="chevron-right" />
                                        </i>
                                    </li>
                                    <li className="breadcrumb-item active">Edit Hero Section</li>
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
                                                    <h4>Edit Hero Section</h4>
                                                </div>
                                            </div>
                                            {/* Title */}
                                            <div className="col-12 col-md-6 col-xl-6">
                                                <div className="form-group local-forms">
                                                    <label>Title <span className="login-danger">*</span></label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="heroTitle"
                                                        value={formData.heroTitle}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>

                                            {/* Subtitle */}
                                            <div className="col-12 col-md-6 col-xl-6">
                                                <div className="form-group local-forms">
                                                    <label>Subtitle <span className="login-danger">*</span></label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="heroSubtitle"
                                                        value={formData.heroSubtitle}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>

                                            {/* Background Image Input */}
                                            <ImageUpload id="background" src={formData.heroBackground} loadFile={handleBackgroundImageLoad} imageName="Background Image" />

                                            {/* Logo Input */}
                                            <ImageUpload id="logo" src={formData.heroLogo} loadFile={handleLogoLoad} imageName="Logo" />

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
                                                        onClick={() => navigate("/landingpage/herosection")}
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

export default EditHeroSection;
