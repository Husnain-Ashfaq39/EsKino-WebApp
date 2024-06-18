/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Header from "../../../Header";
import Sidebar from "../../../Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getDocumentByField, updateDocument } from "../../../../services/dbService";
import { getCurrentUser } from "../../../../services/authService";

const EditZusatzqualifikationen2 = () => {
    const { id } = useParams(); // Retrieve the document ID from the URL
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        zusatzqualifikationen: []
    });
    const [currentPoint, setCurrentPoint] = useState('');
    const [pointIndex, setPointIndex] = useState(null);
    const doctorID = 2;

    useEffect(() => {
       
        const fetchDocumentData = async () => {
            try {
                const documentSnapshot = await getDocumentByField('Doctors', 'doctorID', doctorID);
                if (documentSnapshot.exists()) {
                    const documentData = documentSnapshot.data();
                    setFormData({ zusatzqualifikationen: documentData.zusatzqualifikationen });
                    const pointIndex = parseInt(id, 10);
                    setCurrentPoint(documentData.zusatzqualifikationen[pointIndex]);
                    setPointIndex(pointIndex);
                } else {
                    console.error('Document does not exist');
                }
            } catch (error) {
                console.error('Error fetching document data:', error);
            }
        };

        fetchDocumentData();
    }, [doctorID, id]);

    const handleChange = (e) => {
        setCurrentPoint(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const documentSnapshot = await getDocumentByField('Doctors', 'doctorID', doctorID);
            if (documentSnapshot.exists()) {
                const newZusatzqualifikationen = [...formData.zusatzqualifikationen];
                newZusatzqualifikationen[pointIndex] = currentPoint;
                await updateDocument('Doctors', documentSnapshot.id, { zusatzqualifikationen: newZusatzqualifikationen });
                sessionStorage.setItem("updateZusatzqualifikationen2", 'true');
                navigate("/doctors/zusatzqualifikationen2");
            } else {
                toast.error('Document does not exist', { autoClose: 2000 });
            }
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
                activeClassName="edit-zusatzqualifikationen2"
            />
            <div className="page-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/doctors/headerandpicture2">Doctor 2 </Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <i className="feather-chevron-right">
                                            <FeatherIcon icon="chevron-right" />
                                        </i>
                                    </li>
                                    <li className="breadcrumb-item ">
                                        <Link to="/doctors/zusatzqualifikationen2">Zusatzqualifikationen</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <i className="feather-chevron-right">
                                            <FeatherIcon icon="chevron-right" />
                                        </i>
                                    </li>
                                    <li className="breadcrumb-item active">Edit Zusatzqualifikationen</li>
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
                                                    <h4>Edit Zusatzqualifikationen Point</h4>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group local-forms">
                                                    <label>Point {pointIndex + 1}</label>
                                                    <input
                                                        className="form-control"
                                                        rows={3}
                                                        value={currentPoint}
                                                        onChange={handleChange}
                                                        required
                                                    />
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
                                                        {loading ? "Submitting..." : "Submit"}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary cancel-form"
                                                        onClick={() => navigate("/doctors/zusatzqualifikationen2")}
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

export default EditZusatzqualifikationen2;
