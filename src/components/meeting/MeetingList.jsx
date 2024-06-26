import { Button, Modal, Table, Spin } from "antd";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../../config/firebase";
import { getCurrentUser } from "../../services/authService";
import {
  deleteDocument,
  getDocument,
  addDocument,
  getMeetingStatus,
} from "../../services/dbService";
import {
  convertTime,
  convertTimestamp,
} from "../../services/general_functions";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { imagesend, plusicon, refreshicon, searchnormal } from "../imagepath";

const MeetingList = () => {
  const [allMeetings, setAllMeetings] = useState([]);
  const [filteredMeetings, setFilteredMeetings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [meetingToDelete, setMeetingToDelete] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchParticipantsSum = async (meetingId) => {
    const participantQuery = query(
      collection(db, "participants"),
      where("sectionId", "==", meetingId)
    );
    const participantsSnapshot = await getDocs(participantQuery);

    const totalPersons = participantsSnapshot.docs.reduce((sum, participantDoc) => {
      const data = participantDoc.data();
      return sum + (data.persons ? parseInt(data.persons, 10) : 0);
    }, 0);

    return totalPersons;
  };

  const fetchMeetings = async () => {
    const meetingsRef = collection(db, "meetings");
    const snapshot = await getDocs(meetingsRef);
    const meetingsWithCounts = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const participantCount = await fetchParticipantsSum(doc.id);

        return {
          id: doc.id,
          Name: doc.data().title,
          StartTime: convertTime(doc.data().startTime),
          endTime: convertTime(doc.data().endTime),
          Participants: participantCount,
          capacity: doc.data().capacity,
          Location: doc.data().streetAddress,
          StartDate: convertTimestamp(doc.data().startDate),
          endDate: convertTimestamp(doc.data().endDate),
        };
      })
    );
    setAllMeetings(meetingsWithCounts);
  };

  useEffect(() => {
    
    fetchMeetings();
  }, [updateTrigger]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const status = query.get("status");
    setStatusFilter(status || ""); // Set the status filter
  }, [location.search]);

  useEffect(() => {
    const filtered = allMeetings.filter((meeting) => {
      const matchesSearch = meeting.Name.toLowerCase().includes(
        searchQuery.toLowerCase()
      );
      const matchesStatus = statusFilter
        ? getMeetingStatus(meeting) === statusFilter
        : true;
      return matchesSearch && matchesStatus;
    });
    setFilteredMeetings(filtered);
  }, [searchQuery, statusFilter, allMeetings]);

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

  const formatDate = (date) => {
    const [day, month, year] = date.split('/');
    return `${day}.${month}.${year}`;
  };

  const handleDeleteMeeting = async (meetingId) => {
    setIsDeleting(true); // Set loading state to true
    try {
      // Fetch participants associated with the meeting
      const participantQuery = query(
        collection(db, "participants"),
        where("sectionId", "==", meetingId)
      );
      const participantsSnapshot = await getDocs(participantQuery);

      const participants = participantsSnapshot.docs.map((doc) => ({
        id: doc.id,
        persons: doc.data().persons,
        gender: doc.data().gender,
        sectionId: doc.data().sectionId,
        totalFee: doc.data().totalFee,
        issueDate: doc.data().issueDate 

      }));

      // Move each participant to "Deleted Participants" collection
      const meetingDoc = await getDocument("meetings", meetingId);
      const meetingData = meetingDoc.data();
      const moveParticipantsPromises = participants.map((participant) =>
        addDocument("Deleted Participants", {
          persons: participant.persons,
          gender: participant.gender,
          title: meetingData.title,
          sectionId: participant.sectionId,
          totalFee: participant.totalFee,
          streetAddress: meetingData.streetAddress,
          startDate: meetingData.startDate,
          endDate:meetingData.endDate,
          issueDate:participant.issueDate
        })
      );

      await Promise.all(moveParticipantsPromises);

      // Delete participants from the main collection
      const deleteParticipantsPromises = participants.map((participant) =>
        deleteDocument("participants", participant.id)
      );

      await Promise.all(deleteParticipantsPromises);

      // Move meeting to "Meeting Trash" collection
      await addDocument("Meeting Trash", { ...meetingData, status: 'timeout' });

      // Delete the meeting from the main collection
      await deleteDocument("meetings", meetingId);

      // Update state
      setAllMeetings((prevMeetings) =>
        prevMeetings.filter((meeting) => meeting.id !== meetingId)
      );

      setIsDeleteModalOpen(false);
      toast.success("Meeting moved to trash successfully");
    } catch (error) {
      toast.error("Failed to delete the meeting");
       navigate("/server-error");
    } finally {
      setIsDeleting(false); // Reset loading state
    }
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
      width: 200,
    },
    {
      title: "Status",
      dataIndex: "EndTime",
      render: (_, record) => {
        const status = getMeetingStatus(record);
        let badgeClasses = "badge font-weight-bold p-2 ";

        if (status === "Active") {
          badgeClasses += "badge-success";
        } else if (status === "Closed") {
          badgeClasses += "badge-danger";
        } else if (status === "Timeout") {
          badgeClasses += "badge-warning";
        }

        return (
          <span className={badgeClasses} style={{ borderRadius: "15px" }}>
            {status}
          </span>
        );
      },
      width: 100,
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      sorter: (a, b) => a.capacity.length - b.capacity.length,
      width: 100,
    },
    {
      title: "Participants",
      dataIndex: "Participants",
      sorter: (a, b) => a.Participants - b.Participants,
      width: 100,
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
      width: 120,
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
                  <i className="fa fa-trash-alt m-r-5"></i> Move to Trash
                </Link>
              </div>
            </div>
          </div>
        </>
      ),
      width: 80,
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
                                  value={searchQuery}
                                  onChange={(e) =>
                                    setSearchQuery(e.target.value)
                                  }
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
                                onClick={() => setUpdateTrigger(!updateTrigger)}
                              >
                                <img src={refreshicon} alt="#" />
                              </Link>
                              <Link
                                to="/meeting-trash"
                                className="btn btn-secondary ms-2"
                              >
                                Meeting Trash
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
                              dataSource={filteredMeetings}
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
                          </div>

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
                                {selectedMeeting.capacity}
                              </p>
                              <p>
                                <strong>Location:</strong>{" "}
                                {selectedMeeting.Location}
                              </p>
                              <p>
                                <strong>Start Date:</strong>{" "}
                                {formatDate(selectedMeeting.StartDate)}
                              </p>
                              <p>
                                <strong>End Date:</strong>{" "}
                                {formatDate(selectedMeeting.endDate)}
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
                                  <h3>
                                    Are you sure you want to move this meeting to trash?
                                  </h3>
                                  <div className="m-t-20">
                                    <button
                                      onClick={() => setIsDeleteModalOpen(false)}
                                      className="btn btn-white me-2 p-1"
                                      disabled={isDeleting}
                                    >
                                      Close
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-danger p-1"
                                      onClick={() => handleDeleteMeeting(meetingToDelete)}
                                      disabled={isDeleting}
                                    >
                                      {isDeleting ? (
                                        <>
                                          <Spin size="small" />
                                        </>
                                      ) : (
                                        "Trash"
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

export default MeetingList;
