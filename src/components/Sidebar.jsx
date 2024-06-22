import React, { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { Link, useNavigate } from "react-router-dom";
import { signOutUser } from "../services/authService";
import {
  blog,
  dashboard,
  doctor,
  logout,
  menuicon04,
  menuicon08,
  menuicon10,
  menuicon12,
  menuicon15,
  menuicon16,
  patients
} from "./imagepath";
const Sidebar = (props) => {
  const [sidebar, setSidebar] = useState("");
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    await signOutUser();
    navigate("/login");
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
                <li className="menu-title"></li>
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
                    <li>
                      <Link
                        className={
                          props?.activeClassName === "meeting-trash"
                            ? "active"
                            : ""
                        }
                        to="/meeting-trash"
                      >
                        Trash Meeting
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
                    <span>Participant </span> <span className="menu-arrow" />
                  </Link>
                  <ul style={{ display: "none" }} className="menu-items2">
                    <li>
                      <Link
                        className={
                          props?.activeClassName === "participent-list"
                            ? "active"
                            : ""
                        }
                        to="/meetinglist/participantlist"
                      >
                        Participant List
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={
                          props?.activeClassName === "deleted-participants"
                            ? "active"
                            : ""
                        }
                        to="/deleted-participants"
                      >
                        Deleted Participants
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
                      <img src={doctor} alt="" />
                    </span>{" "}
                    <span> Admin </span> <span className="menu-arrow" />
                  </Link>
                  <ul style={{ display: "none" }} className="menu-items3">
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

                {/* Doctors */}
                <li className="submenu">
                  <Link
                    to="#"
                    id="menu-itemDoctors"
                    onClick={(e) => handleClick(e, "menu-itemDoctors", "menu-itemDoctors")}
                  >
                    <span className="menu-side">
                      <img src={menuicon08} alt="" />
                    </span>{" "}
                    <span>Doctors</span> <span className="menu-arrow" />
                  </Link>
                  <ul style={{ display: "none" }} className="menu-itemDoctors">
{/* Doctor Header */}
<li>
                        <Link
                          className={
                            props?.activeClassName === "shedule-list"
                              ? "active"
                              : ""
                          }
                          to="/doctors/doctorsheader"
                        >
                          Doctors Header
                        </Link>
                      </li>


  {/* Doctor 2 */}
  <li>
                        <Link
                          className={
                            props?.activeClassName === "shedule-list"
                              ? "active"
                              : ""
                          }
                          to="/doctors/headerandpicture2"
                        >
                          Doctor 1
                        </Link>
                      </li>


                    {/* Doctor 1 */}
                    <li>
                      <Link
                        className={
                          props?.activeClassName === "heroSection"
                            ? "active"
                            : ""
                        }
                        to="/doctors/headerandpicture1"
                      >
                        Doctor 2
                      </Link>

                    

                      
                    </li>
                  </ul>
                </li>




                {/* Landing Page */}
                <li className="submenu">
                  <Link
                    to="#"
                    id="menu-item4"
                    onClick={(e) => handleClick(e, "menu-item4", "menu-items4")}
                  >
                    <span className="menu-side">
                      <img src={blog} alt="" />
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
                        <Link
                          className={
                            props?.activeClassName === "shedule-list"
                              ? "active"
                              : ""
                          }
                          to="/landingpage/childemergencyheader"
                        >
                          Child Emergency
                        </Link>
                      </li>

                      {/* Course Content */}
                      <li>
                        <Link
                          className={
                            props?.activeClassName === "shedule-list"
                              ? "active"
                              : ""
                          }
                          to="/landingpage/coursecontentheading"
                        >
                          Course Content
                        </Link>
                      </li>

                      {/* Organization Matters*/}
                      <li>
                        <Link
                          className={
                            props?.activeClassName === "shedule-list"
                              ? "active"
                              : ""
                          }
                          to="/landingpage/organizationmattersheading"
                        >
                          Organization Matters
                        </Link>
                      </li>
                    </li>
                  </ul>
                </li>

                {/* About Us */}
                {/* <li className="submenu">
                  <Link to="/aboutus" id="menu-item11">
                    <span className="menu-side">
                      <img src={blog} alt="" />
                    </span>{" "}
                    <span>About Us</span>
                  </Link>
                </li> */}

{/* Gallery */}
                <li className="submenu">
                  <Link
                    to="#"
                    id="menu-item7"
                    onClick={(e) => handleClick(e, "menu-item7", "menu-items7")}
                  >
                    <span className="menu-side">
                      <img src={menuicon15} alt="" />
                    </span>{" "}
                    <span>Gallery</span> <span className="menu-arrow" />
                  </Link>
                  <ul style={{ display: "none" }} className="menu-items7">
                    <li>
                      <Link
                        className={
                          props?.activeClassName === "gallerylist"
                            ? "active"
                            : ""
                        }
                        to="/gallerylist"
                      >
                        Gallery List
                      </Link>

                      {/* Child Emergency */}
                      <li>
                        <Link
                          className={
                            props?.activeClassName === "addgallery"
                              ? "active"
                              : ""
                          }
                          to="/gallerylist/add"
                        >
                          Add Image
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            props?.activeClassName === "editcategories"
                              ? "active"
                              : ""
                          }
                          to="/edit-categories"
                        >
                          Edit Categories
                        </Link>
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
                    <li>
                      <Link
                        className={
                          props?.activeClassName === "blog-view" ? "active" : ""
                        }
                        to="/blogview"
                      >
                        View Blogs
                      </Link>
                    </li>
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
                  </ul>
                </li>
                <li className="submenu">
                  <Link to="/contactlist" id="menu-item11">
                    <span className="menu-side">
                      <img src={menuicon10} alt="" />
                    </span>{" "}
                    <span>Contacts</span>
                  </Link>
                </li>
                <li className="submenu">
                  <Link to="/suscribers" id="menu-item11">
                    <span className="menu-side">
                      <img src={menuicon12} alt="" />
                    </span>{" "}
                    <span>Suscribers</span>
                  </Link>
                </li>
                <li className="submenu">
                  <Link to="/settings" id="menu-item12">
                    <span className="menu-side">
                      <img src={menuicon16} alt="" />
                    </span>{" "}
                    <span>Settings</span>
                  </Link>
                </li>
                <li className="submenu">
                  <Link to="/color-settings" id="menu-item12">
                    <span className="menu-side">
                      <img src={menuicon15} alt="" />
                    </span>{" "}
                    <span>Colours Settings</span>
                  </Link>
                </li>
              </ul>
              <div className="logout-btn">
                <Link to="#" onClick={handleLogout}>
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
