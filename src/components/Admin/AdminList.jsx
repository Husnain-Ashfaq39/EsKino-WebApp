/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Table, Modal, Button } from "antd";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import {
  imagesend,
  plusicon,
  refreshicon,
  searchnormal,
  blogimg2,
} from "../imagepath";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
const AdminList = () => {
  const datasource = [
    {
      id: 1,
      Img: blogimg2,
      Name: "Meeting 1",
      Email: "10:00:00",
      Password: "1234",
      FIELD9: "",
    },
    {
      id: 2,
      Img: blogimg2,
      Name: "Meeting 1",
      Email: "10:00:00",
      Password: "1234",
      FIELD9: "",
    },
    {
      id: 3,
      Img: blogimg2,
      Name: "Meeting 1",
      Email: "10:00:00",
      Password: "1234",
      FIELD9: "",
    },
    {
      id: 4,
      Img: blogimg2,
      Name: "Meeting 1",
      Email: "10:00:00",
      Password: "1234",
      FIELD9: "",
    },
    {
      id: 5,
      Img: blogimg2,
      Name: "Meeting 1",
      Email: "10:00:00",
      Password: "1234",
      FIELD9: "",
    },
    {
      id: 6,
      Img: blogimg2,
      Name: "Meeting 1",
      Email: "10:00:00",
      Password: "1234",
      FIELD9: "",
    },
    {
      id: 7,
      Img: blogimg2,
      Name: "Meeting 1",
      Email: "10:00:00",
      Password: "1234",
      FIELD9: "",
    },
    {
      id: 8,
      Img: blogimg2,
      Name: "Meeting 1",
      Email: "10:00:00",
      Password: "1234",
      FIELD9: "",
    },
    {
      id: 9,
      Img: blogimg2,
      Name: "Meeting 1",
      Email: "10:00:00",
      Password: "1234",
      FIELD9: "",
    },
    {
      id: 10,
      Img: blogimg2,
      Name: "Meeting 1",
      Email: "10:00:00",
      Password: "1234",
      FIELD9: "",
    },
    {
      id: 11,
      Img: blogimg2,
      Name: "Meeting 1",
      Email: "10:00:00",
      Password: "1234",
      FIELD9: "",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState({});

  const showModal = (meeting) => {
    setSelectedMeeting(meeting);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    ``;
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "Name",
      sorter: (a, b) => a.Name.length - b.Name.length,
    },
    {
      title: "Email",
      dataIndex: "Email",
      sorter: (a, b) => a.Email.length - b.Email.length,
    },
    {
      title: "Password",
      dataIndex: "Password",
    },
    {
      title: "",
      dataIndex: "FIELD8",
      render: () => (
        <>
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
                <Link className="dropdown-item" to="/editadmin">
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
        </>
      ),
    },
  ];

  return (
    <>
      <Header />
      <Sidebar
        id="menu-item3"
        id2="menu-item3"
        activeClassName="meeting-list"
      />
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="#">Admins</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <i className="feather-chevron-right">
                      <FeatherIcon icon="chevron-right" />
                    </i>
                  </li>
                  <li className="breadcrumb-item active">Admins List</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card card-table show-entire">
                <div className="card-body">
                  {/* Table Header */}
                  <div className="page-table-header mb-2">
                    <div className="row align-items-center">
                      <div className="col">
                        <div className="doctor-table-blk">
                          <h3>Admins List</h3>
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
                                to="/addadmin"
                                className="btn btn-primary add-pluss ms-2"
                              >
                                <img src={plusicon} alt="#" />
                              </Link>
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

                  {/* /Table Header */}
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="card">
                        <div className="card-body">
                          <Table
                            columns={columns}
                            dataSource={datasource}
                            rowKey="id"
                          />
                          <div
                            id="delete_patient"
                            className="modal fade delete-modal"
                            role="dialog"
                          >
                            <div className="modal-dialog modal-dialog-centered">
                              <div className="modal-content">
                                <div className="modal-body text-center">
                                  <img
                                    src={imagesend}
                                    alt="#"
                                    width={50}
                                    height={46}
                                  />
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
                                    <button
                                      type="submit"
                                      className="btn btn-danger"
                                    >
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminList;
