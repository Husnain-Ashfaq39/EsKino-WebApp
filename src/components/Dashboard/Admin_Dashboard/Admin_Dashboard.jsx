import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchDocumentsWithQuery,
  getAllDocuments,
  getMeetingStatus,
} from "../../../services/dbService";
import {
  convertTime,
  convertTimestamp,
} from "../../../services/general_functions";
import Header from "../../Header";
import { calendar, empty_wallet, profile_add, scissor } from "../../imagepath";
import Sidebar from "../../Sidebar";
import DonutChart from "./DonutChart";
import ParticipantChart from "./ParticipantChart";

const Admin_Dashboard = () => {
  const [meetings, setMeetings] = useState([]);
  const [countActive, setCountActive] = useState(0);
  const [countClose, setCountClose] = useState(0);
  const [countTimeout, setCountTimeout] = useState(0);
  const [totalEarning, setTotalEarning] = useState(0);
  const [countTimeoutLatestMonth, setCountTimeoutLatestMonth] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    

    const fetchMeetings = async () => {
      const meetingsSnapshot = await getAllDocuments("meetings");
      const trashSnapshot = await getAllDocuments("Meeting Trash");

      const processSnapshot = (snapshot) => {
        return snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().title,
          startTime: convertTime(doc.data().startTime),
          endTime: convertTime(doc.data().endTime),
          participants: doc.data().Participants,
          capacity: doc.data().capacity,
          location: doc.data().streetAddress,
          startDate: convertTimestamp(doc.data().startDate),
          endDate: convertTimestamp(doc.data().endDate),
        }));
      };

      const loadedMeetings = processSnapshot(meetingsSnapshot);
      const loadedTrashMeetings = processSnapshot(trashSnapshot);

      const activeCount = loadedMeetings.filter(
        (meeting) => getMeetingStatus(meeting) === "Active"
      ).length;
      const closeCount = loadedMeetings.filter(
        (meeting) => getMeetingStatus(meeting) === "Closed"
      ).length;
      const timeoutCount = loadedMeetings.filter(
        (meeting) => getMeetingStatus(meeting) === "Timeout"
      ).length;

      // Add trash meetings to timeout count
      const trashTimeoutCount = trashSnapshot.docs.length;
      setCountTimeout(timeoutCount + trashTimeoutCount);

      setMeetings([...loadedMeetings.slice(0, 4), ...loadedTrashMeetings.slice(0, 4)]); // Fetch only the first 4 meetings from both collections
      setCountActive(activeCount);
      setCountClose(closeCount);

      // Calculate total earnings from both participants and deleted participants
      let totalEarnings = 0;

      for (const meeting of [...loadedMeetings, ...loadedTrashMeetings]) {
        const participantsSnapshot = await fetchDocumentsWithQuery(
          "participants",
          "sectionId",
          meeting.id
        );
        const participants = participantsSnapshot.docs.map((doc) => doc.data());

        participants.forEach((participant) => {
          totalEarnings += participant.totalFee || 0;
        });

        const deletedParticipantsSnapshot = await fetchDocumentsWithQuery(
          "Deleted Participants",
          "sectionId",
          meeting.id
        );
        const deletedParticipants = deletedParticipantsSnapshot.docs.map((doc) => doc.data());

        deletedParticipants.forEach((participant) => {
          totalEarnings += participant.totalFee || 0;
        });
      }

      setTotalEarning(totalEarnings);

      // Calculate count of timeout meetings for the latest month
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
      };

      const formattedFirstDay = formatDate(firstDayOfMonth);
      const formattedLastDay = formatDate(lastDayOfMonth);

      const timeoutLatestMonthCount = [...loadedMeetings, ...loadedTrashMeetings].filter((meeting) => {
        const meetingEndDate = formatDate(new Date(meeting.endDate));
        return (
          getMeetingStatus(meeting) === "Timeout" &&
          meetingEndDate >= formattedFirstDay &&
          meetingEndDate <= formattedLastDay
        );
      }).length;

      setCountTimeoutLatestMonth(timeoutLatestMonthCount);
    };

    fetchMeetings();
  }, [navigate]);

  const formatDate = (date) => {
    const [day, month, year] = date.split('/');
    return `${day}.${month}.${year}`;
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <Header />
      <Sidebar
        id="menu-item"
        id1="menu-items"
        activeClassName="admin-dashboard"
      />
      <div className="page-wrapper">
        <div className="content">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="#">Dashboard </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <i className="feather-chevron-right">
                      <FeatherIcon icon="chevron-right" />
                    </i>
                  </li>
                  <li className="breadcrumb-item active">Admin Dashboard</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <Link to="/meetinglist?status=Active">
                <div className="dash-widget">
                  <div className="dash-boxs comman-flex-center">
                    <img src={calendar} alt="#" />
                  </div>
                  <div className="dash-content dash-count flex-grow-1">
                    <h4>Active Meeting</h4>
                    <h2>{countActive}</h2>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <Link to="/meetinglist?status=Closed">
                <div className="dash-widget">
                  <div className="dash-boxs comman-flex-center">
                    <img src={profile_add} alt="#" />
                  </div>
                  <div className="dash-content dash-count">
                    <h4>Closed Meeting</h4>
                    <h2>{countClose}</h2>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <Link to="/meetinglist?status=Timeout">
                <div className="dash-widget">
                  <div className="dash-boxs comman-flex-center">
                    <img src={scissor} alt="#" />
                  </div>
                  <div className="dash-content dash-count">
                    <h4>Timeout Meeting</h4>
                    <h2>{countTimeout}</h2>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="dash-widget">
                <div className="dash-boxs comman-flex-center">
                  <img src={empty_wallet} alt="#" />
                </div>
                <div className="dash-content dash-count">
                  <h4>Earnings</h4>
                  <h2>€{totalEarning}</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-12 col-lg-6 col-xl-9">
              <div className="card">
                <div className="card-body">
                  <div className="chart-title patient-visit">
                    <h4>Participants</h4>
                  </div>
                  <div id="patient-chart" />
                  <ParticipantChart />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-12 col-lg-6 col-xl-3 d-flex">
              <div className="card">
                <div className="card-body">
                  <div className="chart-title">
                    <h4>Meetings</h4>
                  </div>
                  <div id="donut-chart-dash" className="chart-user-icon">
                    <DonutChart
                      countActive={countActive}
                      countClose={countClose}
                      countTimeout={countTimeoutLatestMonth}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-100">
            <div className="content">
              <div className="row">
                <div className="col-12 col-xl-12">
                  <div className="card">
                    <div className="card-header pb-0">
                      <h4 className="card-title d-inline-block">
                        Recent Meetings
                      </h4>
                      <Link to="/meetinglist" className="float-end">
                        Show all
                      </Link>
                    </div>
                    <div className="card-block table-dash">
                      <div className="table-responsive">
                        <table className="table mb-0 border-0 datatable custom-table">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Start Time</th>
                              <th>End Time</th>
                              <th>Participants</th>
                              <th>Location</th>
                              <th>Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {meetings.map((meeting, index) => (
                              <tr key={index}>
                                <td>{meeting.name}</td>
                                <td>{meeting.startTime}</td>
                                <td>{meeting.endTime}</td>
                                <td>{meeting.participants}</td>
                                <td>{meeting.location}</td>
                                <td>{formatDate(meeting.startDate)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
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

export default Admin_Dashboard;
