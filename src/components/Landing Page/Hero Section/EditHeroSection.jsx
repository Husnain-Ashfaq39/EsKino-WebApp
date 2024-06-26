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
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        heroTitle: "",
        heroSubtitle: "",
        heroBackground: "",
        heroLogo: "",
        newHeroBackground: "", // State to handle new background image URL
        newHeroLogo: "", // State to handle new logo image URL
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
            const toastId = toast.loading("Uploading background image...");
            try {
                const backgroundUrl = await uploadFile(file, `herosection/images/${file.name}`, (progress) => {
                    const percent = Math.round((progress.loaded / progress.total) * 100);
                    toast.update(toastId, { render: `Uploading background image... ${percent}%`, type: "info", isLoading: true });
                });
                setFormData((prevData) => ({
                    ...prevData,
                    newHeroBackground: backgroundUrl,
                }));
                toast.update(toastId, { render: "Background image uploaded successfully!", type: "success", isLoading: false, autoClose: 1000 });
            } catch (error) {
                toast.update(toastId, { render: "Background image upload failed: " + error.message, type: "error", isLoading: false, autoClose: 2000 });
            }
        }
    };

    const handleLogoLoad = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const toastId = toast.loading("Uploading logo image...");
            try {
                const logoUrl = await uploadFile(file, `images/${file.name}`, (progress) => {
                    const percent = Math.round((progress.loaded / progress.total) * 100);
                    toast.update(toastId, { render: `Uploading logo image... ${percent}%`, type: "info", isLoading: true });
                });
                setFormData((prevData) => ({
                    ...prevData,
                    newHeroLogo: logoUrl,
                }));
                toast.update(toastId, { render: "Logo image uploaded successfully!", type: "success", isLoading: false, autoClose: 1000 });
            } catch (error) {
                toast.update(toastId, { render: "Logo image upload failed: " + error.message, type: "error", isLoading: false, autoClose: 2000 });
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Delete old images if new ones are uploaded
            if (formData.newHeroBackground && formData.heroBackground !== formData.newHeroBackground) {
                try {
                    await deleteFileFromStorage(formData.heroBackground);
                } catch (error) {
                    console.warn("Previous background image not found, skipping deletion.");
                }
            }
            if (formData.newHeroLogo && formData.heroLogo !== formData.newHeroLogo) {
                try {
                    await deleteFileFromStorage(formData.heroLogo);
                } catch (error) {
                    console.warn("Previous logo image not found, skipping deletion.");
                }
            }
            await updateDocument('HeroSection', id, {
                heroTitle: formData.heroTitle,
                heroSubtitle: formData.heroSubtitle,
                heroBackground: formData.newHeroBackground || formData.heroBackground,
                heroLogo: formData.newHeroLogo || formData.heroLogo,
            });
            sessionStorage.setItem("updateHeroSuccess", 'true');
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
