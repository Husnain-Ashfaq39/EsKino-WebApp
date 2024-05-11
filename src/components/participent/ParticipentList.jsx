import React, { useState } from "react";
import { Table, Modal, Button } from "antd";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { blogimg2, imagesend, refreshicon, searchnormal } from "../imagepath";
const ParticipantList = () => {
  const datasource = [
    {
      id: 1,
      Img: blogimg2,
      FirstName: "Participent",
      LastName: "1",
      Email: "participent@gmail.com",
      AddressOwner: "nsdseid",
      Personnals: 4,
      NameOfParticipents: "Ali , Hamza",
      Gender: "Male",
      FIELD9: "",
    },
    {
      id: 1,
      Img: blogimg2,
      FirstName: "Ali",
      LastName: "1",
      Email: "participent@gmail.com",
      AddressOwner: "nsdseid",
      Personnals: 4,
      NameOfParticipents: "Ali , Hamza",
      Gender: "Male",
      FIELD9: "",
    },
    {
      id: 1,
      Img: blogimg2,
      FirstName: "Participent",
      LastName: "1",
      Email: "participent@gmail.com",
      AddressOwner: "nsdseid",
      Personnals: 4,
      NameOfParticipents: "Ali , Hamza",
      Gender: "Male",
      FIELD9: "",
    },
    {
      id: 1,
      Img: blogimg2,
      FirstName: "Participent",
      LastName: "1",
      Email: "participent@gmail.com",
      AddressOwner: "nsdseid",
      Personnals: 4,
      NameOfParticipents: "Ali , Hamza",
      Gender: "Male",
      FIELD9: "",
    },
    {
      id: 1,
      Img: blogimg2,
      FirstName: "Participent",
      LastName: "1",
      Email: "participent@gmail.com",
      AddressOwner: "nsdseid",
      Personnals: 4,
      NameOfParticipents: "Ali , Hamza",
      Gender: "Female",
      FIELD9: "",
    },
    {
      id: 1,
      Img: blogimg2,
      FirstName: "Participent",
      LastName: "1",
      Email: "participent@gmail.com",
      AddressOwner: "nsdseid",
      Personnals: 4,
      NameOfParticipents: "Ali , Hamza",
      Gender: "Female",
      FIELD9: "",
    },
    {
      id: 1,
      Img: blogimg2,
      FirstName: "Participent",
      LastName: "1",
      Email: "participent@gmail.com",
      AddressOwner: "nsdseid",
      Personnals: 4,
      NameOfParticipents: "Ali , Hamza",
      Gender: "Female",
      FIELD9: "",
    },
    {
      id: 1,
      Img: blogimg2,
      FirstName: "Participent",
      LastName: "1",
      Email: "participent@gmail.com",
      AddressOwner: "nsdseid",
      Personnals: 4,
      NameOfParticipents: "Ali , Hamza",
      Gender: "Female",
      FIELD9: "",
    },
    {
      id: 1,
      Img: blogimg2,
      FirstName: "Participent",
      LastName: "1",
      Email: "participent@gmail.com",
      AddressOwner: "nsdseid",
      Personnals: 4,
      NameOfParticipents: "Ali , Hamza",
      Gender: "Female",
      FIELD9: "",
    },
    {
      id: 1,
      Img: blogimg2,
      FirstName: "Participent",
      LastName: "1",
      Email: "participent@gmail.com",
      AddressOwner: "nsdseid",
      Personnals: 4,
      NameOfParticipents: "Ali , Hamza",
      Gender: "Female",
      FIELD9: "",
    },
    {
      id: 1,
      Img: blogimg2,
      FirstName: "Participent",
      LastName: "1",
      Email: "participent@gmail.com",
      AddressOwner: "nsdseid",
      Personnals: 4,
      NameOfParticipents: "Ali , Hamza",
      Gender: "Female",
      FIELD9: "",
    },
  ];

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
      title: "First Name",
      dataIndex: "FirstName",
      render: (text) => <Link to="#">{text}</Link>,
      sorter: (a, b) => a.FirstName.length - b.FirstName.length,
    },
    {
      title: "Last Name",
      dataIndex: "LastName",
      sorter: (a, b) => a.LastName.length - b.LastName.length,
    },
    {
      title: "Email",
      dataIndex: "Email",
      sorter: (a, b) => a.Email.length - b.Email.length,
    },
    {
      title: "Personnals",
      dataIndex: "Personnals",
      sorter: (a, b) => a.Personnals - b.Personnals,
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
      render: () => (
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
              <Link className="dropdown-item" to="/editparticipent">
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
                    dataSource={datasource}
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
                        {selectedParticipant.FirstName}
                      </p>
                      <p>
                        <strong>Last Name:</strong>{" "}
                        {selectedParticipant.LastName}
                      </p>
                      <p>
                        <strong>Email:</strong> {selectedParticipant.Email}
                      </p>
                      <p>
                        <strong>Personnals:</strong>{" "}
                        {selectedParticipant.Personnals}
                      </p>
                      <p>
                        <strong>Name of Participants:</strong>{" "}
                        {selectedParticipant.NameOfParticipents}
                      </p>
                      <p>
                        <strong>Owner Address:</strong>{" "}
                        {selectedParticipant.AddressOwner}
                      </p>
                      <p>
                        <strong>Gender:</strong> {selectedParticipant.Gender}
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
