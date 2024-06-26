/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import { Link, useParams, useNavigate } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { getDocument, updateDocument } from "../../../services/dbService"; // Import Firestore service
import { toast, ToastContainer } from "react-toastify";

const EditCEHeader = () => {
    const { id } = useParams(); // Get the document ID from URL params
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            // Fetch data from Firebase collection
            const doc = await getDocument('ChildEmergencyHeader', id);
            setTitle(doc.data().CEHeadTitle);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            // Update title in Firebase
            await updateDocument('ChildEmergencyHeader', id, { CEHeadTitle: title });
            sessionStorage.setItem('updateCEHeaderSuccess', 'true'); // Set update flag
            navigate("/landingpage/childemergencyheader");
        } catch (error) {
            toast.error("Error updating title: " + error.message, { autoClose: 2000 });
            console.error('Error updating title:', error);
            setLoading(false);
        }
    };

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div>
            <Header />
            <Sidebar
                id="menu-item4"
                id1="menu-items4"
                activeClassName="childEmergency"
            />
            <div className="page-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item active">
                                        <Link to="/landingpage/childemergencyheader">Landing Page</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <i className="feather-chevron-right">
                                            <FeatherIcon icon="chevron-right" />
                                        </i>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        <Link to="/landingpage/childemergencyheader">Child Emergency Heading</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <i className="feather-chevron-right">
                                            <FeatherIcon icon="chevron-right" />
                                        </i>
                                    </li>
                                    <li className="breadcrumb-item active">Edit Child Emergency Header</li>
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
                                                    <h4>Child Emergency Heading Details</h4>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6 col-xl-12">
                                                <div className="form-group local-forms">
                                                    <label>
                                                        Title <span className="login-danger">*</span>
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={title}
                                                        onChange={handleTitleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="doctor-submit text-end">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary submit-form me-2"
                                                        disabled={loading}
                                                    >
                                                        {loading ? "Updating..." : "Submit"}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary cancel-form"
                                                        onClick={() => navigate("/landingpage/childemergencyheader")}
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

export default EditCEHeader;
