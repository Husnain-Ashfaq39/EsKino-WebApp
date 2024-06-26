import React, { useEffect, useState } from "react";
import { Button, Spin, Table } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchDocumentsWithQuery, getAllDocuments, getDocument, updateDocument, addDocument, deleteDocument } from "../../services/dbService";
import Header from "../Header";
import Sidebar from "../Sidebar";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { toast, ToastContainer } from "react-toastify"; // Importing ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Importing react-toastify CSS
import { searchnormal,refreshicon } from "../imagepath";

const ParticipantList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const meetingId = searchParams.get("meetingid");

  const [participentToDele, setParticipentToDele] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [participentData, setParticipantData] = useState([]);

  useEffect(() => {
    if (location.state?.showSuccessToast) {
      toast.success('Participant data updated successfully.');
      // Clear the state to avoid showing the toast again on page refresh
      navigate(location.pathname, { replace: true });
    }
    if (location.state?.showCancelToast) {
      toast.info('Update operation was cancelled.');
      // Clear the state to avoid showing the toast again on page refresh
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate]);

  const handleDelete = async (participantId) => {
    setIsDeleting(true);
    const participantIndex = participentData.findIndex(
      (p) => p.id === participantId
    );
    if (participantIndex === -1) return;

    const participant = participentData[participantIndex];
    const numberOfPersons = parseInt(participant.persons, 10);

    try {
      const meetingDoc = await getDocument("meetings", participant.sectionId);

      if (meetingDoc.exists()) {
        const meetingData = meetingDoc.data();
        const currentCapacity = parseInt(meetingData.capacity, 10) || 0;
        const updatedCapacity = currentCapacity + numberOfPersons;
        const updatedCapacityStr = updatedCapacity.toString();

        await updateDocument("meetings", participant.sectionId, { capacity: updatedCapacityStr });

        await addDocument("Deleted Participants", {
          persons: participant.persons,
          gender: participant.gender,
          title: meetingData.title,
          sectionId: participant.sectionId,
          totalFee: participant.totalFee,
          streetAddress: meetingData.streetAddress,
          startDate: meetingData.startDate,
          endDate: meetingData.endDate,
          issueDate: participant.issueDate
        });

        await deleteDocument("participants", participantId);

        const updatedParticipants = participentData.filter(
          (p) => p.id !== participantId
        );
        setParticipantData(updatedParticipants);

        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      navigate("/server-error");
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    if (meetingId) {
      fetchDocumentsWithQuery("participants", "sectionId", meetingId).then(
        (querySnapshot) => {
          const loadedParticipants = querySnapshot.docs.map((doc, index) => ({
            id: doc.id,
            index: index + 1,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            email: doc.data().email,
            address: doc.data().address,
            persons: doc.data().persons,
            personNames: doc.data().personNames,
            gender: doc.data().gender,
            sectionId: doc.data().sectionId,
            plan: doc.data().plan,
            totalFee: doc.data().totalFee,
            issueDate: doc.data().issueDate,
            originalPrice: doc.data().originalPrice,
            dueDate: doc.data().dueDate,
          }));
          setParticipantData(loadedParticipants);
        }
      );
    } else {
      getAllDocuments("participants").then((querySnapshot) => {
        const loadedParticipants = querySnapshot.docs.map((doc, index) => ({
          id: doc.id,
          index: index + 1,
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          email: doc.data().email,
          address: doc.data().address,
          persons: doc.data().persons,
          personNames: doc.data().personNames,
          gender: doc.data().gender,
          sectionId: doc.data().sectionId,
          plan: doc.data().plan,
          totalFee: doc.data().totalFee,
          issueDate: doc.data().issueDate,
          originalPrice: doc.data().originalPrice,
          dueDate: doc.data().dueDate,
        }));
        setParticipantData(loadedParticipants);
      });
    }
  }, [meetingId]);

  useEffect(() => {
    const filtered = participentData.filter(
      (participant) =>
        participant.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        participant.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        participant.index.toString().includes(searchQuery)
    );
    setFilteredParticipants(filtered);
  }, [searchQuery, participentData]);

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
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
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <Button
          className="btn btn-primary"
          onClick={() => {
            navigate(`/invoice-details/${record.id}`, { state: { participant: record } });
          }}
        >
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
                to={`/meetinglist/participantlist/edit?meetingid=${record.sectionId}&participentid=${record.id}`}
              >
                <i className="far fa-edit me-2" />
                Edit Invoice
              </Link>
              <Link
                className="dropdown-item"
                to="#"
                onClick={() => {
                  setParticipentToDele(record.id);
                  setIsDeleteModalOpen(true);
                }}
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
      <Sidebar id="participant" id1="participants" activeClassName="participantList" />
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/meetinglist">Meeting</Link>
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
                        <h3>Participant List</h3>
                        <div className="doctor-search-blk">
                          <div className="top-nav-search table-search-blk">
                            <form>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search by first or last name"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
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
                              onClick={() => window.location.reload()}
                            >
                              <img src={refreshicon} alt="#" />
                            </Link>
                            <Link
                              to="/deleted-participants"
                              className="btn btn-secondary ms-2"
                            >
                              Deleted Participants
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <Table
                      columns={columns}
                      dataSource={filteredParticipants}
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
                          <h3>Are you sure want to delete this participant?</h3>
                          <div className="m-t-20">
                            <Button
                              onClick={() => setIsDeleteModalOpen(false)}
                              className="btn btn-white me-2 p-0"
                              disabled={isDeleting}
                            >
                              Close
                            </Button>
                            <Button
                              type="button"
                              className="btn btn-danger p-0"
                              onClick={() => handleDelete(participentToDele)}
                              disabled={isDeleting}
                            >
                              {isDeleting ? (
                                <>
                                  <Spin size="small" />
                                </>
                              ) : (
                                "Delete"
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ToastContainer />
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
