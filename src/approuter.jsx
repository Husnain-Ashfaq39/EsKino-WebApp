import React from "react";
// eslint-disable-next-line no-unused-vars

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/pages/login";
// import config from "config";
import Addblog from "./components/pages/Blog/Addblog";

import BlogView from "./components/pages/Blog/BlogView";
import Editblog from "./components/pages/Blog/Editblog";
//For Settings...

//Meeting
import AddMeeting from "./components/meeting/AddMeeting";
import EditMeeting from "./components/meeting/EditMeeting";
import MeetingList from "./components/meeting/MeetingList";
import MeetingTrash from "./components/meeting/MeetingTrash";
//Participents...
import ParticipentList from "./components/participent/ParticipentList";

import HeroSection from "./components/Landing Page/Hero Section/HeroSection";
import EditHeroSection from "./components/Landing Page/Hero Section/EditHeroSection";

import EditParticipent from "./components/participent/EditParticipent";

import AddAdmin from "./components/Admin/Add-Admin";

import ForgotPassword from "./components/pages/login/ForgotPassword";

import Admin_Dashboard from "./components/Dashboard/Admin_Dashboard/Admin_Dashboard";
import ChangePassword from "./components/pages/login/ChangePassword";

import ServerError from "./components/pages/login/ServerError";

import Layout from "./components/Layout";
import Home from "./components/pages/Home";
import Blog_client_side from "./components/pages/Blog";
import BlogDetail from "./components/pages/BlogDetails";

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
import AddGallery from "./components/Gallery/AddGallery";
import ErrorPage from "./components/pages/ErrorPage";
import Contactlist from "./components/contactlist";
import GalleryList from "./components/Gallery/GalleryList";
import EditGallery from "./components/Gallery/EditGallery";
import Policy from "./components/Policy";
import Settings from "./components/Settings";
import SubscriberList from "./components/Suscribers";
import EditCategories from "./components/Gallery/EditCategories";
import DeletedParticipants from "./components/participent/DeletedParticipant";
import HeaderandPicture1 from "./components/DoctorsDashboard/Doctor1/HeaderAndPicture1/HeaderAndPicture1";
import EditHeaderAndPicture from "./components/DoctorsDashboard/Doctor1/HeaderAndPicture1/EditHeaderAndPicture1";
import EditHeaderAndPicture1 from "./components/DoctorsDashboard/Doctor1/HeaderAndPicture1/EditHeaderAndPicture1";
import Introduction1 from "./components/DoctorsDashboard/Doctor1/Introduction1/Introduction1";
import AddIntroduction1 from "./components/DoctorsDashboard/Doctor1/Introduction1/AddIntroduction1";
import EditIntroduction1 from "./components/DoctorsDashboard/Doctor1/Introduction1/EditIntroduction1";
import Zusatzqualifikationen1 from "./components/DoctorsDashboard/Doctor1/Zusatzqualifikationen1/Zusatzqualifikationen1";
import AddZusatzqualifikationen1 from "./components/DoctorsDashboard/Doctor1/Zusatzqualifikationen1/AddZusatzqualifikationen1";
import EditZusatzqualifikationen1 from "./components/DoctorsDashboard/Doctor1/Zusatzqualifikationen1/EditZusatzqualifikationen1";
import Aktuell1 from "./components/DoctorsDashboard/Doctor1/Aktuell1/Aktuell1";
import AddAktuell1 from "./components/DoctorsDashboard/Doctor1/Aktuell1/AddAktuell1";
import EditAktuell1 from "./components/DoctorsDashboard/Doctor1/Aktuell1/EditAktuell1";
import HeaderandPicture2 from "./components/DoctorsDashboard/Doctor2/HeaderAndPicture2/HeaderAndPicture2";
import EditHeaderAndPicture2 from "./components/DoctorsDashboard/Doctor2/HeaderAndPicture2/EditHeaderAndPicture2";
import Introduction2 from "./components/DoctorsDashboard/Doctor2/Introduction2/Introduction2";
import AddIntroduction2 from "./components/DoctorsDashboard/Doctor2/Introduction2/AddIntroduction2";
import EditIntroduction2 from "./components/DoctorsDashboard/Doctor2/Introduction2/EditIntroduction2";
import Zusatzqualifikationen2 from "./components/DoctorsDashboard/Doctor2/Zusatzqualifikationen2/Zusatzqualifikationen2";
import AddZusatzqualifikationen2 from "./components/DoctorsDashboard/Doctor2/Zusatzqualifikationen2/AddZusatzqualifikationen2";
import EditZusatzqualifikationen2 from "./components/DoctorsDashboard/Doctor2/Zusatzqualifikationen2/EditZusatzqualifikationen2";
import Aktuell2 from "./components/DoctorsDashboard/Doctor2/Aktuell2/Aktuell2";
import AddAktuell2 from "./components/DoctorsDashboard/Doctor2/Aktuell2/AddAktuell2";
import EditAktuell2 from "./components/DoctorsDashboard/Doctor2/Aktuell2/EditAktuell2";
//Accounts
const Approuter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />

          <Route path="/settings" element={<Settings />} />

          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/server-error" element={<ServerError />} />

          <Route path="/gallerylist" element={<GalleryList />} />
          <Route path="/gallerylist/add" element={<AddGallery />} />
          <Route path="/gallerylist/edit" element={<EditGallery />} />
          <Route path="/edit-categories" element={<EditCategories />} />


          {/* Contact */}

          <Route path="/contactlist" element={<Contactlist />} />
          <Route path="/suscribers" element={<SubscriberList />} />
          <Route path="/deleted-participants" element={<DeletedParticipants />} />

          {/* Blog */}

          <Route path="/addblog" element={<Addblog />} />
          <Route path="/editblog/:id" element={<Editblog />} />
          <Route path="/blogview" element={<BlogView />} />

          {/* meeting  */}
          <Route path="/meetinglist" element={<MeetingList />} />
          <Route path="/add-meeting" element={<AddMeeting />} />
          <Route path="/editmeeting" element={<EditMeeting />} />
          <Route path="/meeting-trash" element={<MeetingTrash />} />

          {/* Participent */}
          <Route
            path="/meetinglist/participantlist"
            element={<ParticipentList />}
          />
          <Route
            path="/meetinglist/participantlist/edit"
            element={<EditParticipent />}
          />

          {/* Doctors Cards */}
           {/* Header And Picture 1*/}
           <Route path="/doctors/headerandpicture1" element={<HeaderandPicture1/>} />
           <Route
            path="/doctors/headerandpicture1/editheaderandpicture1/:id"
            element={<EditHeaderAndPicture1/>}
          />

            {/* Header And Picture 2*/}
            <Route path="/doctors/headerandpicture2" element={<HeaderandPicture2/>} />
            <Route
            path="/doctors/headerandpicture2/editheaderandpicture2/:id"
            element={<EditHeaderAndPicture2/>}
          />

          {/* Introduction 1*/}
          <Route path="/doctors/introduction1" element={<Introduction1/>} />
          <Route
            path="/doctors/introduction1/addintroduction1"
            element={<AddIntroduction1/>}
          />
          <Route/>
          <Route
            path="/doctors/introduction1/editintroduction1/:id"
            element={<EditIntroduction1/>}
          />

           {/* Introduction 2*/}
           <Route path="/doctors/introduction2" element={<Introduction2/>} />
           <Route
            path="/doctors/introduction2/addintroduction2"
            element={<AddIntroduction2/>}
          />
            <Route
            path="/doctors/introduction2/editintroduction2/:id"
            element={<EditIntroduction2/>}
          />

          {/* Zusatzqualifikationen 2*/}
          <Route path="/doctors/zusatzqualifikationen1" element={<Zusatzqualifikationen1/>} />
          <Route
            path="/doctors/zusatzqualifikationen1/addzusatzqualifikationen1"
            element={<AddZusatzqualifikationen1/>}
          />
          <Route/>
          <Route
            path="/doctors/zusatzqualifikationen1/editzusatzqualifikationen1/:id"
            element={<EditZusatzqualifikationen1/>}
          />
          <Route/>

            {/* Zusatzqualifikationen 2*/}
            <Route path="/doctors/zusatzqualifikationen2" element={<Zusatzqualifikationen2/>} />
          <Route
            path="/doctors/zusatzqualifikationen2/addzusatzqualifikationen2"
            element={<AddZusatzqualifikationen2/>}
          />
          <Route/>
          <Route
            path="/doctors/zusatzqualifikationen2/editzusatzqualifikationen2/:id"
            element={<EditZusatzqualifikationen2/>}
          />
          <Route/>

{/* Aktuell1 */}
<Route path="/doctors/aktuell1" element={<Aktuell1/>} />
<Route
            path="/doctors/aktuell1/addaktuell1"
            element={<AddAktuell1/>}
          />
          <Route
            path="/doctors/aktuell1/editaktuell1/:id"
            element={<EditAktuell1/>}
          />

          {/* Aktuell1 */}
<Route path="/doctors/aktuell2" element={<Aktuell2/>} />
<Route
            path="/doctors/aktuell2/addaktuell2"
            element={<AddAktuell2/>}
          />
          <Route
            path="/doctors/aktuell2/editaktuell2/:id"
            element={<EditAktuell2/>}
          />

         



          {/* Hero Section */}
          <Route path="/landingpage/herosection" element={<HeroSection />} />
          <Route
            path="/landingpage/editherosection/:id"
            element={<EditHeroSection />}
          />
          {/* <Route path="/editappoinments" element={<EditAppoinments />} /> */}

          {/* Child Emergency */}
          <Route
            path="/landingpage/childemergencyheader"
            element={<CEHeader />}
          />
          <Route
            path="/landingpage/editchildemergencyheader/:id"
            element={<EditCEHeader />}
          />

          <Route path="/landingpage/childemergencybody" element={<CEBody />} />
          <Route
            path="/landingpage/childemergencybody/addchildemergencybody"
            element={<AddCEBody />}
          />
          <Route
            path="/landingpage/childemergencybody/editchildemergencybody/:id"
            element={<EditCEBody />}
          />

          {/* CCourse Content */}
          <Route
            path="/landingpage/coursecontentheading"
            element={<CCHeading />}
          />
          <Route
            path="/landingpage/coursecontentheading/editcoursecontentheading/:id"
            element={<EditCCHeading />}
          />

          <Route path="/landingpage/coursecontentbody" element={<CCBody />} />
          <Route
            path="/landingpage/coursecontentbody/editcoursecontentbody/:id"
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
            path="/landingpage/organizationmattersheading/editorganizationmattersheading/:id"
            element={<EditOMHeading />}
          />

          <Route
            path="/landingpage/organizationmattersbody"
            element={<OMBody />}
          />
          <Route
            path="/landingpage/organizationmattersbody/editorganizationmattersbody/:id"
            element={<EditOMBody />}
          />
          <Route
            path="/landingpage/organizationmattersbody/addorganizationmattersbody"
            element={<AddOMBody />}
          />

          {/* Admin */}

          <Route path="/addadmin" element={<AddAdmin />} />

          {/* Dashboard */}
          <Route path="/admin-dashboard" element={<Admin_Dashboard />} />

          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route path="/blog" element={<Blog_client_side />} />
            <Route path="/blog/blog-details/:id" element={<BlogDetail />} />
            <Route path="/policy" element={<Policy />} />
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
