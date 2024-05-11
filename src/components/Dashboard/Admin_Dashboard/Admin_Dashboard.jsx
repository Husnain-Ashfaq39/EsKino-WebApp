import React, { useState, useEffect } from "react";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import DonutChart from "./DonutChart";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import PatientChart from "./PaitentChart";
import Select from "react-select";
import { getAllDocuments } from "../../../services/dbService";
import { db } from "../../../config/firebase";
import {
  Avatar2,
  Avatar3,
  Avatar4,
  Avatar5,
  calendar,
  dep_icon1,
  dep_icon2,
  dep_icon3,
  dep_icon4,
  dep_icon5,
  empty_wallet,
  imagesend,
  profile_add,
  scissor,
  user001,
} from "../../imagepath";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

const Admin_Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      const querySnapshot = await getAllDocuments('meetings');
      const loadedMeetings = querySnapshot.docs.map(doc => ({
        id: doc.id,
        Name: doc.data().title,
        StartTime: convertTime(doc.data().startTime),
        EndTime: convertTime(doc.data().endTime),
        Participent: doc.data().participent,
        Capacity: doc.data().capacity,
        Location: doc.data().streetAddress,
        StartDate: convertTimestamp(doc.data().startDate),
      }));
      setMeetings(loadedMeetings.slice(0, 4)); // Fetch only the first 4 meetings
    };

    fetchMeetings();
  }, []);

  const convertTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const convertTime = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
  };


  // eslint-disable-next-line no-unused-vars
  const [year, setyear] = useState([
    { value: 1, label: "2022" },
    { value: 2, label: "2021" },
    { value: 3, label: "2020" },
    { value: 4, label: "2019" },
  ]);

  return (
    <>
      <Header />
      <Sidebar
        id="menu-item"
        id1="menu-items"
        activeClassName="admin-dashboard"
      />
      <>
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
                    <h2>
                      {" "}
                      <CountUp delay={0.4} end={250} duration={0.6} />
                    </h2>
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
                    <h2>
                      <CountUp delay={0.4} end={140} duration={0.6} />
                    </h2>
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
                    <h2>
                      <CountUp delay={0.4} end={56} duration={0.6} />
                    </h2>
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
                    <h2>
                      $<CountUp delay={0.4} end={20250} duration={0.6} />
                    </h2>
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
                      <h4>Participents</h4>
                      <div>
                        <ul className="nav chat-user-total">
                          <li>
                            <i
                              className="fa fa-circle current-users"
                              aria-hidden="true"
                            />
                            Male 75%
                          </li>
                          <li>
                            <i
                              className="fa fa-circle old-users"
                              aria-hidden="true"
                            />{" "}
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
                      <DonutChart />
                      <img src={user001} alt="#" />
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className=" w-100">
              <div className="content">
                <div className="row">
                  <div className="col-12 col-xl-12">
                    <div className="card">
                      <div className="card-header pb-0">
                        <h4 className="card-title d-inline-block">Recent Meetings</h4>
                        <Link to="/meetinglist" className="float-end">Show all</Link>
                      </div>
                      <div className="card-block table-dash">
                        <div className="table-responsive">
                          <table className="table mb-0 border-0 datatable custom-table">
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Participents</th>
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
    </>
  );
};

export default Admin_Dashboard;
