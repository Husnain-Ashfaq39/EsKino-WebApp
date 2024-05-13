/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  blog,
  dashboard,
  doctor,
  doctorschedule,
  logout,
  menuicon04,
  menuicon06,
  menuicon08,
  menuicon09,
  menuicon10,
  menuicon11,
  menuicon12,
  menuicon14,
  menuicon15,
  menuicon16,
  patients,
  sidemenu,
} from "./imagepath";
import Scrollbars from "react-custom-scrollbars-2";

const Sidebar = (props) => {
  const [sidebar, setSidebar] = useState("");
  const handleClick = (e, item, item1, item3) => {
    const div = document.querySelector(`#${item}`);
    const ulDiv = document.querySelector(`.${item1}`);
    e?.target?.className
      ? (ulDiv.style.display = "none")
      : (ulDiv.style.display = "block");
    e?.target?.className
      ? div.classList.remove("subdrop")
      : div.classList.add("subdrop");
  };

  useEffect(() => {
    if (props?.id && props?.id1) {
      const ele = document.getElementById(`${props?.id}`);
      handleClick(ele, props?.id, props?.id1);
    }
  }, []);

  const expandMenu = () => {
    document.body.classList.remove("expand-menu");
  };
  const expandMenuOpen = () => {
    document.body.classList.add("expand-menu");
  };
  return (
    <>
      <div className="sidebar" id="sidebar">
        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          autoHeight
          autoHeightMin={0}
          autoHeightMax="95vh"
          thumbMinSize={30}
          universal={false}
          hideTracksWhenNotNeeded={true}
        >
          <div className="sidebar-inner slimscroll">
            <div
              id="sidebar-menu"
              className="sidebar-menu"
              onMouseLeave={expandMenu}
              onMouseOver={expandMenuOpen}
            >
              <ul>
                <li className="menu-title">Main</li>
                <li className="submenu">
                  <Link
                    to="#"
                    id="menu-item"
                    onClick={(e) => {
                      handleClick(e, "menu-item", "menu-items");
                    }}
                  >
                    <span className="menu-side">
                      <img src={dashboard} alt="" />
                    </span>
                    <span>
                      <Link
                        className={
                          props?.activeClassName === "admin-dashboard"
                            ? "active"
                            : ""
                        }
                        to="/admin-dashboard"
                      >
                        {" "}
                        Dashboard{" "}
                      </Link>
                    </span>
                  </Link>
                  <ul
                    style={{
                      display: sidebar === "Dashboard" ? "block" : "none",
                    }}
                    className="menu-items"
                  ></ul>
                </li>
                <li className="submenu">
                  <Link
                    to="#"
                    id="menu-item1"
                    onClick={(e) => {
                      // setSidebar('Doctors')
                      handleClick(e, "menu-item1", "menu-items1");
                    }}
                  >
                    <span className="menu-side">
                      <img src={doctor} alt="" />
                    </span>{" "}
                    <span> Meetings </span> <span className="menu-arrow" />
                  </Link>
                  <ul
                    style={{
                      display: sidebar === "Doctors" ? "block" : "none",
                    }}
                    className="menu-items1"
                  >
                    <li>
                      <Link
                        className={
                          props?.activeClassName === "doctor-list"
                            ? "active"
                            : ""
                        }
                        to="/meetinglist"
                      >
                        Meeting List
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          props?.activeClassName === "add-doctor"
                            ? "active"
                            : ""
                        }
                        to="/add-meeting"
                      >
                        Add Meeting
                      </Link>
                    </li>
                    
                  </ul>
                </li>
                <li className="submenu">
                  <Link
                    to="#"
                    id="menu-item2"
                    onClick={(e) => handleClick(e, "menu-item2", "menu-items2")}
                  >
                    <span className="menu-side">
                      <img src={patients} alt="" />
                    </span>{" "}
                    <span>Participent </span> <span className="menu-arrow" />
                  </Link>
                  <ul style={{ display: "none" }} className="menu-items2">
                    <li>
                      <Link
                        className={
                          props?.activeClassName === "participent-list"
                            ? "active"
                            : ""
                        }
                        to="/participentlist"
                      >
                        Participent List
                      </Link>
                    </li>
                    <li>
                      {/* <Link className={props?.activeClassName === 'add-patient' ? 'active' : ''} to="/addpatients">Add Patients</Link> */}
                    </li>
                    <li>
                      <Link
                        className={
                          props?.activeClassName === "edit-participent"
                            ? "active"
                            : ""
                        }
                        to="/editparticipent"
                      >
                        Edit Participent
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="submenu">
                  <Link
                    to="#"
                    id="menu-item3"
                    onClick={(e) => handleClick(e, "menu-item3", "menu-items3")}
                  >
                    <span className="menu-side">
                      <img src={menuicon08} alt="" />
                    </span>{" "}
                    <span> Admin </span> <span className="menu-arrow" />
                  </Link>
                  <ul style={{ display: "none" }} className="menu-items3">
                    <li>
                      <Link
                        className={
                          props?.activeClassName === "staff-list"
                            ? "active"
                            : ""
                        }
                        to="/adminlist"
                      >
                        Admin List
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          props?.activeClassName === "add-staff" ? "active" : ""
                        }
                        to="/addadmin"
                      >
                        Add Admin
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="submenu">
                  <Link
                    to="#"
                    id="menu-item4"
                    onClick={(e) => handleClick(e, "menu-item4", "menu-items4")}
                  >
                    <span className="menu-side">
                      <img src={menuicon04} alt="" />
                    </span>{" "}
                    <span>Landing Page</span> <span className="menu-arrow" />
                  </Link>
                  <ul style={{ display: "none" }} className="menu-items4">
                    <li>
                      <Link
                        className={
                          props?.activeClassName === "heroSection"
                            ? "active"
                            : ""
                        }
                        to="/landingpage/herosection"
                      >
                Hero Section 
                      </Link>

                  {/* Child Emergency */}
                    <li>
                      <Link className={props?.activeClassName === 'shedule-list' ? 'active' : ''} to="/landingpage/childemergencyheader">Child Emergency</Link>
                    </li>

                  {/* Course Content */}
                    <li>
                      <Link className={props?.activeClassName === 'shedule-list' ? 'active' : ''} to="/landingpage/coursecontentheading">Course Content</Link>
                    </li>
                  
                  {/* Organization Matters*/}
                    <li>
                      <Link className={props?.activeClassName === 'shedule-list' ? 'active' : ''} to="/landingpage/organizationmattersheading">Organization Matters</Link>
                    </li>
                    </li>
                    
                    
                  </ul>
                </li>

                <li className="submenu">
                  <Link
                    to="#"
                    id="menu-item11"
                    onClick={(e) =>
                      handleClick(e, "menu-item11", "menu-items11")
                    }
                  >
                    <span className="menu-side">
                      <img src={blog} alt="" />
                    </span>{" "}
                    <span> Blog</span> <span className="menu-arrow" />
                  </Link>
                  <ul style={{ display: "none" }} className="menu-items11">
                    {/* <li>
                      <Link
                        className={
                          props?.activeClassName === "blog-grid" ? "active" : ""
                        }
                        to="/blogview"
                      >
                        Blog
                      </Link>
                    </li> */}
                    {/* <li>
                      <Link
                        className={
                          props?.activeClassName === "blog-details"
                            ? "active"
                            : ""
                        }
                        to="/blog"
                      >
                        Blog View
                      </Link>
                    </li> */}
                    <li>
                      <Link
                        className={
                          props?.activeClassName === "add-blog" ? "active" : ""
                        }
                        to="/addblog"
                      >
                        Add Blog
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          props?.activeClassName === "edit-blog" ? "active" : ""
                        }
                        to="/editblog"
                      >
                        Edit Blog
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
              <div className="logout-btn">
                <Link to="/login">
                  <span className="menu-side">
                    <img src={logout} alt="" />
                  </span>{" "}
                  <span>Logout</span>
                </Link>
              </div>
            </div>
          </div>
        </Scrollbars>
      </div>
    </>
  );
};
export default Sidebar;
