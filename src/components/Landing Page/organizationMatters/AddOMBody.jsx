import React, { useState } from 'react';
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { addDocument } from '../../../services/dbService'; // Import Firestore services
import FeatherIcon from 'feather-icons-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCurrentUser } from '../../../services/authService';
import { useEffect } from'react';
const AddOMBody = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!getCurrentUser()) {
          navigate('/login');
        }
      
        
      }, [])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addDocument('OrganizationMattersBody', { // Add document to collection
                OMBodyTitle: formData.title,
                OMBodyDescription: formData.description
            });
            sessionStorage.setItem('addOMBodySuccess', 'true');
            navigate("/landingpage/organizationmattersbody");
        } catch (error) {
            toast.error('Error adding document: ' + error.message, { autoClose: 2000 });
            setLoading(false);
        }
    };
   
    

    return (
        <div>
            <Header />
            <Sidebar
                id="menu-item4"
                id1="menu-items4"
                activeClassName="add-appoinment"
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
                                            <Link to="/landingpage/organizationmattersbody">Landing Page</Link>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <i className="feather-chevron-right">
                                                <FeatherIcon icon="chevron-right" />
                                            </i>
                                        </li>
                                        <li className="breadcrumb-item active">
                                            <Link to="/landingpage/organizationmattersbody">Organization Matters Body</Link>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <i className="feather-chevron-right">
                                                <FeatherIcon icon="chevron-right" />
                                            </i>
                                        </li>
                                        <li className="breadcrumb-item active">Add Organization Matters Body</li>
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
                                                        <h4>Organization Matters Body Details</h4>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-6 col-xl-6">
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
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12">
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
                                                            required
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
                                                            {loading ? "Submitting..." : "Submit"}
                                                        </button>
                                                        <Link
                                                            to="/landingpage/organizationmattersbody"
                                                            className="btn btn-primary cancel-form"
                                                        >
                                                            Cancel
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

export default AddOMBody;
