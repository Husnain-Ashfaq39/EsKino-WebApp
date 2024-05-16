import { Button, Modal, Table } from "antd";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";
import { deleteDocument } from "../../services/dbService";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { imagesend, plusicon, refreshicon, searchnormal } from "../imagepath";
import {
  fetchParticipantCount,
  getMeetingStatus,
} from "../../services/dbService";
import { collection, getDocs, query, where } from "firebase/firestore";
import {
  convertTimestamp,
  convertTime,
} from "../../services/general_functions";

const MeetingList = () => {
  const [meetings, setMeetings] = useState([]);
  const navigate = useNavigate();
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [meetingToDelete, setMeetingToDelete] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = async (meetingId) => {
    try {
      const participantQuery = query(
        collection(db, "participants"),
        where("sectionId", "==", meetingId)
      );
      const participantsSnapshot = await getDocs(participantQuery);

      const deleteParticipantsPromises = participantsSnapshot.docs.map(
        (participantDoc) => {
          return deleteDocument("participants", participantDoc.id);
        }
      );

      await Promise.all(deleteParticipantsPromises);

      await deleteDocument("meetings", meetingId);
      setMeetings((prevMeetings) =>
        prevMeetings.filter((meeting) => meeting.id !== meetingId)
      );
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting document and participants: ", error);
    }
  };

  useEffect(() => {
    const getAllMeetings = async () => {
      const meetingsRef = collection(db, "meetings");
      const snapshot = await getDocs(meetingsRef);
      const meetingsWithCounts = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const participantCount = await fetchParticipantCount(doc.id);
          return {
            id: doc.id,
            Name: doc.data().title,
            StartTime: convertTime(doc.data().startTime),
            endTime: convertTime(doc.data().endTime),
            Participants: participantCount,
            Capacity: doc.data().capacity,
            Location: doc.data().streetAddress,
            StartDate: convertTimestamp(doc.data().startDate),
            endDate: convertTimestamp(doc.data().endDate),
            PriceInEuro: doc.data().priceInEuro,
            DiscountFor2Persons: doc.data().discountFor2Persons,
            DiscountFor3Persons: doc.data().discountFor3Persons,
          };
        })
      );
      setMeetings(meetingsWithCounts);
    };

    getAllMeetings();
  }, [updateTrigger]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState({});
  const [hoveredRow, setHoveredRow] = useState(null);

  const showModal = (meeting) => {
    setSelectedMeeting(meeting);
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
      title: "Name",
      dataIndex: "Name",
      render: (text, record) => (
        <Link to={`/meetinglist/participantlist?meetingid=${record.id}`}>
          {text}
        </Link>
      ),
      sorter: (a, b) => a.Name.length - b.Name.length,
    },
    {
      title: "Start Time",
      dataIndex: "StartTime",
      sorter: (a, b) => a.StartTime.length - b.StartTime.length,
    },
    {
      title: "Status",
      dataIndex: "EndTime",
      render: (_, record) => {
        const status = getMeetingStatus(record);
        let badgeClasses = "badge font-weight-bold p-2 ";

        if (status === "Active") {
          badgeClasses += "badge-success";
        } else if (status === "Timeout") {
          badgeClasses += "badge-warning";
        } else if (status === "Closed") {
          badgeClasses += "badge-danger";
        }

        return (
          <span className={badgeClasses} style={{ borderRadius: "15px" }}>
            {status}
          </span>
        );
      },
    },
    {
      title: "Participants",
      dataIndex: "Participants",
      sorter: (a, b) => a.Participants - b.Participants,
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_, record) => (
        <Button
          className="btn btn-primary"
          onClick={(e) => {
            e.stopPropagation();
            showModal(record);
          }}
        >
          View Details
        </Button>
      ),
    },
    {
      title: "",
      dataIndex: "FIELD8",
      render: (_, record) => (
        <>
          <div className="text-end">
            <div
              className="dropdown dropdown-action"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
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
                  onClick={() => {
                    setUpdateTrigger(!updateTrigger);
                  }}
                  className="dropdown-item"
                  to={`/editmeeting?id=${record.id}`}
                >
                  <i className="far fa-edit me-2" />
                  Edit
                </Link>
                <Link
                  className="dropdown-item"
                  to="#"
                  onClick={() => {
                    setMeetingToDelete(record.id);
                    setIsDeleteModalOpen(true);
                  }}
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

  const rowClickHandler = (record) => {
    navigate(`/meetinglist/participantlist?meetingid=${record.id}`);
  };

  return (
    <>
      <Header />
      <Sidebar
        id="menu-item1"
        id2="menu-item1"
        activeClassName="meeting-list"
      />
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
                  <li className="breadcrumb-item active">Meetings List</li>
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
                          <h3>Meeting List</h3>
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
                                to="/add-meeting"
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
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="card">
                        <div className="card-body">
                          <Table
                            columns={columns}
                            dataSource={meetings}
                            rowKey="id"
                            onRow={(record, rowIndex) => ({
                              onClick: () => rowClickHandler(record),
                              onMouseEnter: () => setHoveredRow(rowIndex),
                              onMouseLeave: () => setHoveredRow(null),
                              style: {
                                cursor: "pointer",
                                backgroundColor:
                                  hoveredRow === rowIndex
                                    ? "#f5f5f5"
                                    : "inherit",
                              },
                            })}
                          />
                          {isModalOpen && (
                            <Modal
                              title="Meeting Details"
                              open={isModalOpen}
                              onOk={handleOk}
                              onCancel={handleCancel}
                              footer={[
                                <Button key="close" onClick={handleCancel}>
                                  Close
                                </Button>,
                                <Button
                                  key="ok"
                                  onClick={handleOk}
                                  type="primary"
                                >
                                  OK
                                </Button>,
                              ]}
                            >
                              <p>
                                <strong>Name:</strong> {selectedMeeting.Name}
                              </p>
                              <p>
                                <strong>Start Time:</strong>{" "}
                                {selectedMeeting.StartTime}
                              </p>
                              <p>
                                <strong>End Time:</strong>{" "}
                                {selectedMeeting.endTime}
                              </p>
                              <p>
                                <strong>Participants:</strong>{" "}
                                {selectedMeeting.Participants}
                              </p>
                              <p>
                                <strong>Capacity:</strong>{" "}
                                {selectedMeeting.Capacity}
                              </p>
                              <p>
                                <strong>Location:</strong>{" "}
                                {selectedMeeting.Location}
                              </p>
                              <p>
                                <strong>Start Date:</strong>{" "}
                                {selectedMeeting.StartDate}
                              </p>
                              <p>
                                <strong>End Date:</strong>{" "}
                                {selectedMeeting.endDate}
                              </p>
                              <p>
                                <strong>Price in Euro:</strong>{" "}
                                {selectedMeeting.PriceInEuro}
                              </p>
                              <p>
                                <strong>Discount for 2 Persons (%):</strong>{" "}
                                {selectedMeeting.DiscountFor2Persons}
                              </p>
                              <p>
                                <strong>Discount for 3 Persons (%):</strong>{" "}
                                {selectedMeeting.DiscountFor3Persons}
                              </p>
                            </Modal>
                          )}
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
                                  <h3>Are you sure want to delete this?</h3>
                                  <div className="m-t-20">
                                    <button
                                      onClick={() =>
                                        setIsDeleteModalOpen(false)
                                      }
                                      className="btn btn-white me-2"
                                    >
                                      Close
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      onClick={() => {
                                        handleDelete(meetingToDelete);
                                      }}
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

export default MeetingList;
