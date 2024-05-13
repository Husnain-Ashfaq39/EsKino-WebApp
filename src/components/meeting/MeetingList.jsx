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

import { collection, getDocs, query, where } from "firebase/firestore";

const MeetingList = () => {
  const [meetings, setMeetings] = useState([]);
  const navigate = useNavigate();
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [meetingtoDele, setMeetingtoDele] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = async (meetingId) => {
    try {
      // Fetch participants associated with the meeting
      const participantQuery = query(
        collection(db, "participants"),
        where("sectionId", "==", meetingId)
      );
      const participantsSnapshot = await getDocs(participantQuery);

      // Delete all participants
      const deleteParticipantsPromises = participantsSnapshot.docs.map(
        (participantDoc) => {
          return deleteDocument("participants", participantDoc.id);
        }
      );

      // Wait for all participants to be deleted
      await Promise.all(deleteParticipantsPromises);

      // Delete the meeting after all participants are deleted

      await deleteDocument("meetings", meetingId);
      setMeetings((prevMeetings) =>
        prevMeetings.filter((meeting) => meeting.id !== meetingId)
      );
      setIsDeleteModalOpen(false); // Hide the modal here after successful deletion
    } catch (error) {
      console.error("Error deleting document and participants: ", error);
    }
  };

  const fetchParticipantCount = async (meetingId) => {
    const q = query(
      collection(db, "participants"),
      where("sectionId", "==", meetingId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.length; // Assuming each doc is a participant
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
            EndTime: convertTime(doc.data().endTime),
            Participants: participantCount, // Adding participant count here
            Capacity: doc.data().capacity,
            Location: doc.data().streetAddress,
            StartDate: convertTimestamp(doc.data().startDate),
            EndDate: convertTimestamp(doc.data().endDate),
          };
        })
      );
      setMeetings(meetingsWithCounts);
    };

    getAllMeetings();
  }, [updateTrigger]);

  const convertTimestamp = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const convertTime = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState({});
  const [hoveredRow, setHoveredRow] = useState(null);

  const showModal = (meeting) => {
    setSelectedMeeting(meeting);
    setIsModalOpen(true);
  };

  const getMeetingStatus = (meeting) => {
    const currentTime = moment();
    console.log("Current Time:", currentTime.format());

    // Rearrange the date format from DD/MM/YYYY to YYYY-MM-DD
    const [day, month, year] = meeting.EndDate.split("/");
    const formattedEndDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
      2,
      "0"
    )}`;

    // Combine formatted EndDate and EndTime using moment
    const endTime = moment(
      `${formattedEndDate} ${meeting.EndTime}`,
      "YYYY-MM-DD hh:mm A"
    );
    console.log("End Time:", endTime.format());

    if (currentTime.isAfter(endTime)) {
      return "Timeout";
    } else if (0 == meeting.Capacity) {
      return "Closed";
    } else {
      return "Active";
    }
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
      render: (text, record) => (
        <Link to={`/meetinglist/participentlist?meetingid=${record.id}`}>
          {text}
        </Link>
      ),
      sorter: (a, b) => a.Name.length - b.Name.length,
    },
    {
      title: "StartTime",
      dataIndex: "StartTime",
      sorter: (a, b) => a.StartTime.length - b.StartTime.length,
    },
    {
      title: "Status",
      dataIndex: "EndTime",
      render: (_, record) => {
        const status = getMeetingStatus(record);
        let badgeClasses = "badge font-weight-bold p-2 "; // Bootstrap classes for padding and bold text

        // Append additional classes based on the status
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
      title: "Participent",
      dataIndex: "Participants",
      sorter: (a, b) => a.Participent - b.Participent,
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
                    setMeetingtoDele(record.id);
                    setIsDeleteModalOpen(true); // Show the modal when Delete is clicked
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
    navigate(`/meetinglist/participentlist?meetingid=${record.id}`);
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

                  {/* /Table Header */}
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
                                {selectedMeeting.EndTime}
                              </p>
                              <p>
                                <strong>Participent:</strong>{" "}
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
                                {selectedMeeting.EndDate}
                              </p>
                              {/* Add more details if needed */}
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
                                        handleDelete(meetingtoDele);
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
