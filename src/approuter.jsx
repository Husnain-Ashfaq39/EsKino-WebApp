import React from "react";
// eslint-disable-next-line no-unused-vars

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/pages/login";
// import config from "config";
import Addblog from "./components/pages/Blog/Addblog";
import Blogdetails from "./components/pages/Blog/Blogdetails";
import BlogView from "./components/pages/Blog/BlogView";
import Editblog from "./components/pages/Blog/Editblog";
//For Settings...
import SettingsChangePassword from "./components/settings/SettingsChangePassword";

//Meeting
import AddMeeting from "./components/meeting/AddMeeting";
import EditMeeting from "./components/meeting/EditMeeting";
import MeetingList from "./components/meeting/MeetingList";
//Participents...
import ParticipentList from "./components/participent/ParticipentList";

import HeroSection from "./components/Landing Page/Hero Section/HeroSection";
import EditHeroSection from "./components/Landing Page/Hero Section/EditHeroSection";

import EditParticipent from "./components/participent/EditParticipent";

import AddAdmin from "./components/Admin/Add-Admin";
import AdminList from "./components/Admin/AdminList";
import EditAdmin from "./components/Admin/EditAdmin";

import ForgotPassword from "./components/pages/login/ForgotPassword";
import Signup from "./components/pages/login/Signup";

import Admin_Dashboard from "./components/Dashboard/Admin_Dashboard/Admin_Dashboard";
import BlankPage from "./components/pages/login/BlankPage";
import ChangePassword from "./components/pages/login/ChangePassword";
import EditProfile from "./components/pages/login/EditProfile";
import Error from "./components/pages/login/Error";
import LockScreen from "./components/pages/login/LockScreen";
import Profile from "./components/pages/login/Profile";
import Register from "./components/pages/login/Register";
import ServerError from "./components/pages/login/ServerError";

import Layout from "./components/Layout";
import Home from "./components/pages/Home";
import Blog from "./components/pages/Blog";
import BlogDetail from "./components/pages/BlogDetails";
import Appointments from "./components/pages/Appointments";

// Landing Page
import CEHeader from "./components/Landing Page/ChildEmergency/CEHeader";
import EditCEHeader from "./components/Landing Page/ChildEmergency/EditCEHeader";
import CEBody from "./components/Landing Page/ChildEmergency/CEBody";
import AddCEBody from "./components/Landing Page/ChildEmergency/AddCEBody";
import EditCEBody from "./components/Landing Page/ChildEmergency/EditCEBody";
import CCHeading from "./components/Landing Page/courseContent/CCHeading";
import CCBody from "./components/Landing Page/courseContent/CCBody";
import EditCCBody from "./components/Landing Page/courseContent/EditCCBody";
import EditCCHeading from "./components/Landing Page/courseContent/EditCCHeading";
import AddCCBody from "./components/Landing Page/courseContent/AddCCBody";
import OMHeading from "./components/Landing Page/organizationMatters/OMHeading";
import EditOMHeading from "./components/Landing Page/organizationMatters/EditOMHeading";
import OMBody from "./components/Landing Page/organizationMatters/OMBody";
import EditOMBody from "./components/Landing Page/organizationMatters/EditOMBody";
import AddOMBody from "./components/Landing Page/organizationMatters/AddOMBody";

import Contact from "./components/pages/Contact";

import ErrorPage from "./components/pages/ErrorPage";

//Accounts
const Approuter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/lockscreen" element={<LockScreen />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/error" element={<Error />} />
          <Route path="/server-error" element={<ServerError />} />
          <Route path="/blankpage" element={<BlankPage />} />
          {/* Blog */}
          <Route path="/blog" element={<Blogdetails />} />
          <Route path="/addblog" element={<Addblog />} />
          <Route path="/editblog" element={<Editblog />} />
          <Route path="/blogview" element={<BlogView />} />
          {/* Settings */}
          <Route
            path="/settingschangepassword"
            element={<SettingsChangePassword />}
          />
          {/* Doctor  */}
          <Route path="/meetinglist" element={<MeetingList />} />
          <Route path="/add-meeting" element={<AddMeeting />} />
          <Route path="/editmeeting" element={<EditMeeting />} />

          {/* Participent */}
          <Route
            path="/meetinglist/participentlist"
            element={<ParticipentList />}
          />
          <Route
            path="/meetinglist/participentlist/edit"
            element={<EditParticipent />}
          />
          {/* Hero Section */}
          <Route path="/herosection" element={<HeroSection />} />
          <Route path="/editherosection" element={<EditHeroSection />} />
          {/* <Route path="/editappoinments" element={<EditAppoinments />} /> */}

          {/* Child Emergency */}
          <Route
            path="/landingpage/childemergencyheader"
            element={<CEHeader />}
          />
          <Route
            path="/landingpage/editchildemergencyheader"
            element={<EditCEHeader />}
          />

          <Route path="/landingpage/childemergencybody" element={<CEBody />} />
          <Route
            path="/landingpage/childemergencybody/addchildemergencybody"
            element={<AddCEBody />}
          />
          <Route
            path="/landingpage/childemergencybody/editchildemergencybody"
            element={<EditCEBody />}
          />

          {/* CCourse Content */}
          <Route
            path="/landingpage/coursecontentheading"
            element={<CCHeading />}
          />
          <Route
            path="/landingpage/coursecontentheading/editcoursecontentheading"
            element={<EditCCHeading />}
          />

          <Route path="/landingpage/coursecontentbody" element={<CCBody />} />
          <Route
            path="/landingpage/coursecontentbody/editcoursecontentbody"
            element={<EditCCBody />}
          />
          <Route
            path="/landingpage/coursecontentbody/addcoursecontentbody"
            element={<AddCCBody />}
          />

          {/* Orgazinzation Matters */}
          <Route
            path="/landingpage/organizationmattersheading"
            element={<OMHeading />}
          />
          <Route
            path="/landingpage/organizationmattersheading/editorganizationmattersheading"
            element={<EditOMHeading />}
          />

          <Route
            path="/landingpage/organizationmattersbody"
            element={<OMBody />}
          />
          <Route
            path="/landingpage/organizationmattersbody/editorganizationmattersbody"
            element={<EditOMBody />}
          />
          <Route
            path="/landingpage/organizationmattersbody/addorganizationmattersbody"
            element={<AddOMBody />}
          />

          {/* Admin */}
          <Route path="/adminlist" element={<AdminList />} />
          <Route path="/addadmin" element={<AddAdmin />} />
          <Route path="/editadmin" element={<EditAdmin />} />

          {/* Dashboard */}
          <Route path="/admin-dashboard" element={<Admin_Dashboard />} />

          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route path="appointments" element={<Appointments />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:blogId" element={<BlogDetail />} />

            <Route path="contact" element={<Contact />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
      <div className="sidebar-overlay"></div>
    </>
  );
};

export default Approuter;
