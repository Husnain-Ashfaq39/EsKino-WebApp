import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDocumentByField, updateDocument } from "../../../../services/dbService"; // Import Firestore services
import Header from "../../../Header";
import Sidebar from "../../../Sidebar";

const AddIntroduction1 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    point: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const documentSnapshot = await getDocumentByField('Doctors', 'doctorID', 1);
      if (documentSnapshot) {
        const documentData = documentSnapshot.data();
        const updatedIntroduction = [...documentData.introduction, formData.point];
        await updateDocument('Doctors', documentSnapshot.id, { ...documentData, introduction: updatedIntroduction });
        sessionStorage.setItem('addIntroduction1', 'true');
        navigate("/doctors/introduction1");
      } else {
        toast.error('Doctor document not found', { autoClose: 2000 });
        setLoading(false);
      }
    } catch (error) {
      toast.error('Error adding point: ' + error.message, { autoClose: 2000 });
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <Sidebar
        id="doctorCard"
        id1="doctorCards"
        activeClassName="doctor1"

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
                      <Link to="/doctors/headerandpicture1">Doctor 1</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <i className="feather-chevron-right">
                        <FeatherIcon icon="chevron-right" />
                      </i>
                    </li>
                    <li className="breadcrumb-item ">
                      <Link to="/landingpage/introduction1">Introduction</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <i className="feather-chevron-right">
                        <FeatherIcon icon="chevron-right" />
                      </i>
                    </li>
                    <li className="breadcrumb-item active">Add Introduction Point</li>
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
                            <h4>Add Introduction Point</h4>
                          </div>
                        </div>
                        {/* Point */}
                        <div className="col-12 col-sm-12">
                          <div className="form-group local-forms">
                            <label>
                              Point <span className="login-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              rows={3}
                              name="point"
                              value={formData.point}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        {/* Submit and Cancel Button */}
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
                              to="/doctors/introduction1"
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

export default AddIntroduction1;
