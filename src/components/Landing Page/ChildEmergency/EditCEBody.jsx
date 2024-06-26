/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import { Link, useParams, useNavigate } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { getDocument, updateDocument } from "../../../services/dbService"; // Import Firestore service
import { toast, ToastContainer } from "react-toastify";

const EditCEBody = () => {
    const { id } = useParams(); // Get the document ID from URL params
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        description: ""
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            // Fetch data from Firebase collection
            const doc = await getDocument('ChildEmergencyBody', id);
            const data = doc.data();
            setFormData({
                title: data.CEBodyTitle,
                subtitle: data.CEBodySubtitle,
                description: data.CEBodyDescription
            });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            // Update data in Firebase
            await updateDocument('ChildEmergencyBody', id, {
                CEBodyTitle: formData.title,
                CEBodySubtitle: formData.subtitle,
                CEBodyDescription: formData.description
            });
            sessionStorage.setItem('updateCEBodySuccess', 'true'); // Set update flag
            navigate("/landingpage/childemergencybody");
        } catch (error) {
            console.error('Error updating data:', error);
            toast.error('Error updating data: ' + error.message, { autoClose: 2000 });
        }
        setLoading(false);
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
                                                    <h4>Child Emergency Body Details</h4>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-12 col-xl-6">
                                                <div className="form-group local-forms">
                                                    <label>
                                                        Title <span className="login-danger">*</span>
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="title"
                                                        value={formData.title}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-12 col-xl-6">
                                                <div className="form-group local-forms">
                                                    <label>
                                                        Subtitle <span className="login-danger">*</span>
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="subtitle"
                                                        value={formData.subtitle}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group local-forms">
                                                    <label>
                                                        Description <span className="login-danger">*</span>
                                                    </label>
                                                    <textarea
                                                        className="form-control"
                                                        rows={3}
                                                        name="description"
                                                        value={formData.description}
                                                        onChange={handleChange}
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
                                                        onClick={() => navigate("/landingpage/childemergencybody")}
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

export default EditCEBody;
