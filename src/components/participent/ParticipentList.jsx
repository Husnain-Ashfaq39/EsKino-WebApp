import React, { useState, useEffect } from "react";
import { Table, Modal, Button } from "antd";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { blogimg2, imagesend, refreshicon, searchnormal } from "../imagepath";
import { db } from "../../config/firebase";
import { getDoc, doc } from "firebase/firestore";
import moment from "moment";
import { fetchDocumentsWithQuery } from "../../services/dbService";
const ParticipantList = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const meetingId = searchParams.get("meetingid");

  const initialParticipentData = {
    sectionId: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    persons: 4,
    personNames: "",
    gender: "",
    FIELD9: "",
  };

  const [participentData, setParticipantData] = useState([]);

  useEffect(() => {
    if (meetingId) {
      fetchDocumentsWithQuery("participants", "sectionId", meetingId).then(
        (querySnapshot) => {
          const loadedParticipants = querySnapshot.docs.map((doc) => ({
            id: doc.id,

            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            email: doc.data().email,
            address: doc.data().address, // Check your actual field names
            persons: doc.data().persons,
            personNames: doc.data().personNames,
            gender: doc.data().gender,
            sectionId: doc.data().sectionId,
          }));
          setParticipantData(loadedParticipants);
        }
      );
    }
  }, [meetingId]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState({});

  const showModal = (participant) => {
    setSelectedParticipant(participant);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "",
      dataIndex: "sectionId",
      render: (text) => <Link to="#"></Link>,
      sorter: (a, b) => a.sectionId.length - b.sectionId.length,
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      render: (text) => <Link to="#">{text}</Link>,
      sorter: (a, b) => a.firstName.length - b.firstName.length,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      sorter: (a, b) => a.lastName.length - b.lastName.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Persons",
      dataIndex: "persons",
      sorter: (a, b) => a.persons - b.persons,
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_, record) => (
        <Button className="btn btn-primary" onClick={() => showModal(record)}>
          View Details
        </Button>
      ),
    },
    {
      title: "",
      dataIndex: "FIELD9",
      render: (_, record) => (
        <div className="text-end">
          <div className="dropdown dropdown-action">
            <Link
              to="#"
              className="action-icon dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-ellipsis-v" />
            </Link>
            <div className="dropdown-menu dropdown-menu-end">
              <Link
                className="dropdown-item"
                to={`/meetinglist/participentlist/edit?meetingid=${record.sectionId}&participentid=${record.id}`}
              >
                <i className="far fa-edit me-2" />
                Edit
              </Link>
              <Link
                className="dropdown-item"
                to="#"
                data-bs-toggle="modal"
                data-bs-target="#delete_patient"
              >
                <i className="fa fa-trash-alt m-r-5"></i> Delete
              </Link>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <Header />
      <Sidebar id="menu-item2" activeClassName="participant-list" />
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="#">Participants</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <i className="feather-chevron-right">
                      <FeatherIcon icon="chevron-right" />
                    </i>
                  </li>
                  <li className="breadcrumb-item active">Participants List</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="page-table-header mb-2">
                  <div className="row align-items-center">
                    <div className="col">
                      <div className="doctor-table-blk">
                        <h3>Participent List</h3>
                        <div className="doctor-search-blk">
                          <div className="top-nav-search table-search-blk">
                            <form>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search here"
                              />
                              <Link className="btn">
                                <img src={searchnormal} alt="#" />
                              </Link>
                            </form>
                          </div>
                          <div className="add-group">
                            <Link
                              to="#"
                              className="btn btn-primary doctor-refresh ms-2"
                            >
                              <img src={refreshicon} alt="#" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <Table
                    columns={columns}
                    dataSource={participentData}
                    rowKey="id"
                  />
                  {isModalOpen && (
                    <Modal
                      title="Participant Details"
                      open={isModalOpen}
                      onOk={handleOk}
                      onCancel={handleCancel}
                      footer={[
                        <Button key="close" onClick={handleCancel}>
                          Close
                        </Button>,
                        <Button key="ok" onClick={handleOk} type="primary">
                          OK
                        </Button>,
                      ]}
                    >
                      <p>
                        <strong>First Name:</strong>{" "}
                        {selectedParticipant.firstName}
                      </p>
                      <p>
                        <strong>Last Name:</strong>{" "}
                        {selectedParticipant.lastName}
                      </p>
                      <p>
                        <strong>Email:</strong> {selectedParticipant.email}
                      </p>
                      <p>
                        <strong>Personnals:</strong>{" "}
                        {selectedParticipant.persons}
                      </p>
                      <p>
                        <strong>Name of Participants:</strong>{" "}
                        {selectedParticipant.personNames}
                      </p>
                      <p>
                        <strong>Owner Address:</strong>{" "}
                        {selectedParticipant.address}
                      </p>
                      <p>
                        <strong>Gender:</strong> {selectedParticipant.gender}
                      </p>{" "}
                      {/* Display Gender here */}
                    </Modal>
                  )}

                  <div
                    id="delete_patient"
                    className="modal fade delete-modal"
                    role="dialog"
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-body text-center">
                          <img src={imagesend} alt="#" width={50} height={46} />
                          <h3>Are you sure want to delete this ?</h3>
                          <div className="m-t-20">
                            {" "}
                            <Link
                              to="#"
                              className="btn btn-white me-2"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </Link>
                            <button type="submit" className="btn btn-danger">
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParticipantList;
