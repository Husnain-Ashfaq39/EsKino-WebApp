import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import { getAllDocuments, fetchDocumentsWithQuery, getMeetingStatus } from "../../../services/dbService";
import Header from "../../Header";
import {
  calendar,
  empty_wallet,
  profile_add,
  scissor,
} from "../../imagepath";
import Sidebar from "../../Sidebar";
import DonutChart from "./DonutChart";
import PatientChart from "./PaitentChart";
import { convertTimestamp, convertTime } from "../../../services/general_functions";

const Admin_Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [countActive, setCountActive] = useState(0);
  const [countClose, setCountClose] = useState(0);
  const [countTimeout, setCountTimeout] = useState(0);
  const [totalEarning, setTotalEarning] = useState(0);

  useEffect(() => {
    toast.success('Login Successful Welcome');
    
    const fetchMeetings = async () => {
      const querySnapshot = await getAllDocuments("meetings");
      const loadedMeetings = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        Name: doc.data().title,
        StartTime: convertTime(doc.data().startTime),
        endTime: convertTime(doc.data().endTime),
        Participent: doc.data().participent,
        Capacity: doc.data().capacity,
        Location: doc.data().streetAddress,
        StartDate: convertTimestamp(doc.data().startDate),
        endDate: convertTimestamp(doc.data().endDate),
      }));

      const activeCount = loadedMeetings.filter(meeting => getMeetingStatus(meeting) === "Active").length;
      const closeCount = loadedMeetings.filter(meeting => getMeetingStatus(meeting) === "Closed").length;
      const timeoutCount = loadedMeetings.filter(meeting => getMeetingStatus(meeting) === "Timeout").length;

      setMeetings(loadedMeetings.slice(0, 4)); // Fetch only the first 4 meetings
      setCountActive(activeCount);
      setCountClose(closeCount);
      setCountTimeout(timeoutCount);

      // Calculate total earnings from timeout meetings
      let totalEarnings = 0;

      for (const meeting of loadedMeetings.filter(meeting => getMeetingStatus(meeting) === "Timeout")) {
        const participantsSnapshot = await fetchDocumentsWithQuery("participants", "sectionId", meeting.id);
        const participants = participantsSnapshot.docs.map(doc => doc.data());
        
        participants.forEach(participant => {
          totalEarnings += participant.totalFee || 0; // Assuming each participant has a totalFee attribute
        });
      }

      setTotalEarning(totalEarnings);
    };

    fetchMeetings();
  }, []);

  const [year, setYear] = useState([
    { value: 1, label: "2022" },
    { value: 2, label: "2021" },
    { value: 3, label: "2020" },
    { value: 4, label: "2019" },
  ]);

  return (
    <>
      <ToastContainer autoClose={2000} />
      <Header />
      <Sidebar id="menu-item" id1="menu-items" activeClassName="admin-dashboard" />
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
              <div className="dash-widget">
                <div className="dash-boxs comman-flex-center">
                  <img src={calendar} alt="#" />
                </div>
                <div className="dash-content dash-count flex-grow-1">
                  <h4>Active Meeting</h4>
                  <h2>{countActive}</h2>
                  <p>
                    <span className="passive-view">
                      <i className="feather-arrow-up-right me-1">
                        <FeatherIcon icon="arrow-up-right" />
                      </i>
                      40%
                    </span>{" "}
                    vs last month
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="dash-widget">
                <div className="dash-boxs comman-flex-center">
                  <img src={profile_add} alt="#" />
                </div>
                <div className="dash-content dash-count">
                  <h4>Close Meeting</h4>
                  <h2>{countClose}</h2>
                  <p>
                    <span className="passive-view">
                      <i className="feather-arrow-up-right me-1">
                        <FeatherIcon icon="arrow-up-right" />
                      </i>
                      20%
                    </span>{" "}
                    vs last month
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="dash-widget">
                <div className="dash-boxs comman-flex-center">
                  <img src={scissor} alt="#" />
                </div>
                <div className="dash-content dash-count">
                  <h4>Timeout</h4>
                  <h2>{countTimeout}</h2>
                  <p>
                    <span className="negative-view">
                      <i className="feather-arrow-down-right me-1">
                        <FeatherIcon icon="arrow-down-right" />
                      </i>
                      15%
                    </span>{" "}
                    vs last month
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="dash-widget">
                <div className="dash-boxs comman-flex-center">
                  <img src={empty_wallet} alt="#" />
                </div>
                <div className="dash-content dash-count">
                  <h4>Earnings</h4>
                  <h2>€{totalEarning}</h2>
                  <p>
                    <span className="passive-view">
                      <i className="feather-arrow-up-right me-1">
                        <FeatherIcon icon="arrow-up-right" />
                      </i>
                      30%
                    </span>{" "}
                    vs last month
                  </p>
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
                    <div>
                      <ul className="nav chat-user-total">
                        <li>
                          <i className="fa fa-circle current-users" aria-hidden="true" />
                          Male 75%
                        </li>
                        <li>
                          <i className="fa fa-circle old-users" aria-hidden="true" />
                          Female 25%
                        </li>
                      </ul>
                    </div>
                    <div className="form-group mb-0">
                      <Select
                        className="custom-react-select"
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={year}
                        id="search-commodity"
                        components={{
                          IndicatorSeparator: () => null,
                        }}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused
                              ? "none"
                              : "2px solid rgba(46, 55, 164, 0.1);",
                            boxShadow: state.isFocused
                              ? "0 0 0 1px #2e37a4"
                              : "none",
                            "&:hover": {
                              borderColor: state.isFocused
                                ? "none"
                                : "2px solid rgba(46, 55, 164, 0.1)",
                            },
                            borderRadius: "10px",
                            fontSize: "14px",
                            minHeight: "45px",
                          }),
                          dropdownIndicator: (base, state) => ({
                            ...base,
                            transform: state.selectProps.menuIsOpen
                              ? "rotate(-180deg)"
                              : "rotate(0)",
                            transition: "250ms",
                            width: "35px",
                            height: "35px",
                          }),
                        }}
                      />
                    </div>
                  </div>
                  <div id="patient-chart" />
                  <PatientChart />
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
                    <DonutChart countActive={countActive} countClose={countClose} countTimeout={countTimeout} />
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
                                <td>{meeting.Name}</td>
                                <td>{meeting.StartTime}</td>
                                <td>{meeting.EndTime}</td>
                                <td>{meeting.Participent}</td>
                                <td>{meeting.Location}</td>
                                <td>{meeting.StartDate}</td>
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
