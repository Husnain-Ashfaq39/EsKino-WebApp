/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import { Link, useParams } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { getDocument, updateDocument } from '../../../services/dbService'; // Import Firestore service

const EditOMBody = () => {
    const { id } = useParams(); // Get the document ID from URL params
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            // Fetch data from Firebase collection
            const doc = await getDocument('OrganizationMattersBody', id);
            setTitle(doc.data().OMBodyTitle);
            setDescription(doc.data().OMBodyDescription);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Update title and description in Firebase
            await updateDocument('OrganizationMattersBody', id, { OMBodyTitle: title, OMBodyDescription: description });
            alert('Title and description updated successfully!');
        } catch (error) {
            console.error('Error updating title and description:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

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
                                    <li className="breadcrumb-item active">
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
                                    <li className="breadcrumb-item active">Edit Organization Matters Body</li>
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
                                                    <h4>Organization Matters Body Details</h4>
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
                                            <div className="col-12 col-sm-12">
                                                <div className="form-group local-forms">
                                                    <label>
                                                        Description <span className="login-danger">*</span>
                                                    </label>
                                                    <textarea
                                                        className="form-control"
                                                        rows={3}
                                                        value={description}
                                                        onChange={handleDescriptionChange}
                                                    />
                                                </div>
                                            </div>
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
        </div>
    );
};

export default EditOMBody;
