import { Button, Modal, Table, Spin } from "antd";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../../config/firebase";
import { getCurrentUser } from "../../services/authService";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { imagesend, refreshicon, searchnormal } from "../imagepath";
import { deleteDocument } from "../../services/dbService";

const MeetingTrash = () => {
  const [trashedMeetings, setTrashedMeetings] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [meetingToDelete, setMeetingToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false); // Add state for loading
  const navigate = useNavigate();

  const fetchTrashedMeetings = async () => {
    const trashRef = collection(db, "Meeting Trash");
    const snapshot = await getDocs(trashRef);
    const meetings = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setTrashedMeetings(meetings);
  };

  useEffect(() => {
    if (!getCurrentUser()) {
      navigate("/login");
    }
    fetchTrashedMeetings();
  }, [navigate]);

  const handlePermanentDelete = async (meetingId) => {
    setIsDeleting(true); // Set loading state to true
    try {
      console.log(`Attempting to permanently delete meeting with ID: ${meetingId}`);

      // Permanently delete the meeting from "Meeting Trash" collection
      await deleteDocument("Meeting Trash", meetingId);

      console.log(`Meeting with ID: ${meetingId} successfully deleted from Firestore.`);

      // Update state
      setTrashedMeetings((prevMeetings) =>
        prevMeetings.filter((meeting) => meeting.id !== meetingId)
      );

      setIsDeleteModalOpen(false);
      toast.success("Meeting permanently deleted successfully");
    } catch (error) {
      console.error(`Failed to delete meeting with ID: ${meetingId}. Error:`, error);
      toast.error("Failed to permanently delete the meeting");
      navigate("/server-error");
    } finally {
      setIsDeleting(false); // Reset loading state
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "title",
      sorter: (a, b) => a.title.length - b.title.length,
      width: 200,
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      sorter: (a, b) => a.capacity.length - b.capacity.length,
      width: 100,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      render: (startDate) => formatDate(startDate),
      sorter: (a, b) => a.startDate.seconds - b.startDate.seconds,
      width: 100,
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      render: (endDate) => formatDate(endDate),
      sorter: (a, b) => a.endDate.seconds - b.endDate.seconds,
      width: 100,
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_, record) => (
        <Button
          className="btn btn-danger"
          onClick={() => {
            setMeetingToDelete(record.id);
            setIsDeleteModalOpen(true);
          }}
        >
          Permanently Delete
        </Button>
      ),
      width: 120,
    },
  ];

  return (
    <>
      <Header />
      <Sidebar id="menu-item1" id2="menu-item1" activeClassName="meeting-trash" />
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="#">Meetings</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <i className="feather-chevron-right">
                      <FeatherIcon icon="chevron-right" />
                    </i>
                  </li>
                  <li className="breadcrumb-item active">Meeting Trash</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="card card-table show-entire">
                <div className="card-body">
                  <div className="page-table-header mb-2">
                    <div className="row align-items-center">
                      <div className="col">
                        <div className="doctor-table-blk">
                          <h3>Meeting Trash</h3>
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
                                onClick={fetchTrashedMeetings}
                              >
                                <img src={refreshicon} alt="#" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="card">
                        <div className="card-body">
                          <div className="table-responsive">
                            <Table
                              columns={columns}
                              dataSource={trashedMeetings}
                              rowKey="id"
                            />
                          </div>

                          <div
                            className={
                              isDeleteModalOpen
                                ? "modal fade show delete-modal"
                                : "modal fade delete-modal"
                            }
                            style={{
                              display: isDeleteModalOpen ? "block" : "none",
                              backgroundColor: "rgba(0,0,0,0.5)",
                            }}
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
                                  <h3>
                                    Are you sure you want to permanently delete this meeting?
                                  </h3>
                                  <div className="m-t-20">
                                    <button
                                      onClick={() => setIsDeleteModalOpen(false)}
                                      className="btn btn-white me-2"
                                      disabled={isDeleting} // Disable while deleting
                                    >
                                      Close
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      onClick={() => {
                                        handlePermanentDelete(meetingToDelete);
                                      }}
                                      disabled={isDeleting} // Disable while deleting
                                    >
                                      {isDeleting ? (
                                        <>
                                          <Spin size="small" />
                                        </>
                                      ) : (
                                        "Delete"
                                      )}
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
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default MeetingTrash;
