import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Spin, Table } from "antd";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-responsive-modal";
import 'react-responsive-modal/styles.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getCurrentUser } from "../../services/authService";
import {
  addDocument,
  deleteDocument,
  fetchDocumentsWithQuery,
  getAllDocuments,
  getDocument,
  updateDocument,
} from "../../services/dbService";
import Header from "../Header";
import { imagesend, refreshicon, searchnormal } from "../imagepath";
import Sidebar from "../Sidebar";

const ReportContainer = styled.div`
  padding: 20px;
  border-radius: 15px;
  background-color: #fff;
  max-width: 700px;
  margin: 0 auto;
`;

const ReportHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const PrintButton = styled(Button)`
  background-color: #2E7D32;
  color: #fff;
  &:hover {
    background-color: #1B5E20;
  }
`;

const StyledModal = styled(Modal)`
  &.react-responsive-modal-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  &.react-responsive-modal-modal {
    border-radius: 15px;
    max-width: 700px;
    padding: 20px;
  }
`;

const ReportContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ParticipantList = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const meetingId = searchParams.get("meetingid");
  const navigate = useNavigate();
  const [participentToDele, setParticipentToDele] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); 
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const printRef = useRef();

  const handleDelete = async (participantId) => {
    setIsDeleting(true); // Set loading state to true
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

        // Move participant to "Deleted Participants" collection
        await addDocument("Deleted Participants", {
          persons: participant.persons,
          gender: participant.gender,
          title: meetingData.title,
          sectionId: participant.sectionId,
          totalFee:participant.totalFee,
          streetAddress:meetingData.streetAddress,
          startDate:meetingData.startDate
        });

        // Remove participant from "Participants" collection
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
      setIsDeleting(false); // Reset loading state
    }
  };

  const [participentData, setParticipantData] = useState([]);

  useEffect(() => {
    if (!getCurrentUser()) {
      navigate('/login');
    }
    if (meetingId) {
      fetchDocumentsWithQuery("participants", "sectionId", meetingId).then(
        (querySnapshot) => {
          const loadedParticipants = querySnapshot.docs.map((doc) => ({
            id: doc.id,
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
          }));
          setParticipantData(loadedParticipants);
        }
      );
    } else {
      getAllDocuments("participants").then((querySnapshot) => {
        const loadedParticipants = querySnapshot.docs.map((doc) => ({
          id: doc.id,
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
        }));
        setParticipantData(loadedParticipants);
      });
    }
  }, [meetingId]);

  useEffect(() => {
    const filtered = participentData.filter(
      (participant) =>
        participant.firstName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        participant.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredParticipants(filtered);
  }, [searchQuery, participentData]);

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
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
        <Button className="btn btn-primary" onClick={() => {
          setSelectedParticipant(record);
          setIsReportOpen(true);
        }}>
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
                Edit
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
      <Sidebar id="menu-item2" activeClassName="participant-list" />
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
                  {selectedParticipant && (
                    <StyledModal open={isReportOpen} onClose={() => setIsReportOpen(false)} center>
                      <ReportContainer ref={printRef}>
                        <ReportHeader>
                          <h2 className="mr-10">Participant Report</h2>
                          <PrintButton
                            icon={<FontAwesomeIcon icon={faPrint} />}
                            onClick={handlePrint}
                          >
                            Print
                          </PrintButton>
                        </ReportHeader>
                        <ReportContent className="report-content">
                          <p><strong>First Name:</strong> {selectedParticipant.firstName}</p>
                          <p><strong>Last Name:</strong> {selectedParticipant.lastName}</p>
                          <p><strong>Email:</strong> {selectedParticipant.email}</p>
                          <p><strong>Persons:</strong> {selectedParticipant.persons}</p>
                          <p><strong>Plan:</strong> {selectedParticipant.plan}</p>
                          <p><strong>Total Fee:</strong> €{selectedParticipant.totalFee}</p>
                          <p><strong>Name of Participants:</strong> {selectedParticipant.personNames}</p>
                          <p><strong>Owner Address:</strong> {selectedParticipant.address}</p>
                          <p><strong>Gender:</strong> {selectedParticipant.gender}</p>
                        </ReportContent>
                      </ReportContainer>
                    </StyledModal>
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
                          <img src={imagesend} alt="#" width={50} height={46} />
                          <h3>Are you sure want to delete this participant?</h3>
                          <div className="m-t-20">
                            <Button
                              onClick={() => setIsDeleteModalOpen(false)}
                              className="btn btn-white me-2"
                              disabled={isDeleting} 
                            >
                              Close
                            </Button>
                            <Button
                              type="button"
                              className="btn btn-danger"
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
