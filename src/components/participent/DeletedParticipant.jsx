import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { getAllDocuments } from "../../services/dbService";
import { getCurrentUser } from "../../services/authService";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { searchnormal } from "../imagepath";
import { convertTimestamp } from "../../services/general_functions"; // Import the function to format date

const DeletedParticipants = () => {
  const navigate = useNavigate();
  const [deletedParticipants, setDeletedParticipants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredParticipants, setFilteredParticipants] = useState([]);

  useEffect(() => {
    
    getAllDocuments("Deleted Participants").then((querySnapshot) => {
      const loadedParticipants = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        firstName: doc.data().firstName,
        lastName: doc.data().lastName,
        persons: doc.data().persons,
        gender: doc.data().gender,
        title: doc.data().title,
        startDate: doc.data().startDate
          ? formatDateWithDots(convertTimestamp(doc.data().startDate)) 
          : "", 
      }));
      setDeletedParticipants(loadedParticipants);
      setFilteredParticipants(loadedParticipants);
    });
  }, []);

  const formatDateWithDots = (date) => {
    const dateParts = date.split("/");
    return `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;
  };

  useEffect(() => {
    const filtered = deletedParticipants.filter(
      (participant) =>
        participant.title &&
        participant.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredParticipants(filtered);
  }, [searchQuery, deletedParticipants]);

  const columns = [
    {
      title: "Meeting Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.length - b.title.length,
    },
    {
      title: "Persons",
      dataIndex: "persons",
      sorter: (a, b) => a.persons - b.persons,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      sorter: (a, b) => a.gender.length - b.gender.length,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
    },
  ];

  return (
    <>
      <Header />
      <Sidebar id="participant" id1="participants" activeClassName="deletedParticipants" />
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/meetinglist/participantlist">Participants</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <i className="feather-chevron-right">
                      <FeatherIcon icon="chevron-right" />
                    </i>
                  </li>
                  <li className="breadcrumb-item active">Deleted Participants</li>
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
                        <h3>Deleted Participants</h3>
                        <div className="doctor-search-blk">
                          <div className="top-nav-search table-search-blk">
                            <form>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search by meeting title"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                              />
                              <Link className="btn">
                                <img src={searchnormal} alt="#" />
                              </Link>
                            </form>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeletedParticipants;
