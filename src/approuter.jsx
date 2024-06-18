import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AddAdmin from "./components/Admin/Add-Admin";
import Contactlist from "./components/contactlist";
import Admin_Dashboard from "./components/Dashboard/Admin_Dashboard/Admin_Dashboard";
import AddAktuell1 from "./components/DoctorsDashboard/Doctor1/Aktuell1/AddAktuell1";
import Aktuell1 from "./components/DoctorsDashboard/Doctor1/Aktuell1/Aktuell1";
import EditAktuell1 from "./components/DoctorsDashboard/Doctor1/Aktuell1/EditAktuell1";
import EditHeaderAndPicture1 from "./components/DoctorsDashboard/Doctor1/HeaderAndPicture1/EditHeaderAndPicture1";
import HeaderandPicture1 from "./components/DoctorsDashboard/Doctor1/HeaderAndPicture1/HeaderAndPicture1";
import AddIntroduction1 from "./components/DoctorsDashboard/Doctor1/Introduction1/AddIntroduction1";
import EditIntroduction1 from "./components/DoctorsDashboard/Doctor1/Introduction1/EditIntroduction1";
import Introduction1 from "./components/DoctorsDashboard/Doctor1/Introduction1/Introduction1";
import AddZusatzqualifikationen1 from "./components/DoctorsDashboard/Doctor1/Zusatzqualifikationen1/AddZusatzqualifikationen1";
import EditZusatzqualifikationen1 from "./components/DoctorsDashboard/Doctor1/Zusatzqualifikationen1/EditZusatzqualifikationen1";
import Zusatzqualifikationen1 from "./components/DoctorsDashboard/Doctor1/Zusatzqualifikationen1/Zusatzqualifikationen1";
import AddAktuell2 from "./components/DoctorsDashboard/Doctor2/Aktuell2/AddAktuell2";
import Aktuell2 from "./components/DoctorsDashboard/Doctor2/Aktuell2/Aktuell2";
import EditAktuell2 from "./components/DoctorsDashboard/Doctor2/Aktuell2/EditAktuell2";
import EditHeaderAndPicture2 from "./components/DoctorsDashboard/Doctor2/HeaderAndPicture2/EditHeaderAndPicture2";
import HeaderandPicture2 from "./components/DoctorsDashboard/Doctor2/HeaderAndPicture2/HeaderAndPicture2";
import AddIntroduction2 from "./components/DoctorsDashboard/Doctor2/Introduction2/AddIntroduction2";
import EditIntroduction2 from "./components/DoctorsDashboard/Doctor2/Introduction2/EditIntroduction2";
import Introduction2 from "./components/DoctorsDashboard/Doctor2/Introduction2/Introduction2";
import AddZusatzqualifikationen2 from "./components/DoctorsDashboard/Doctor2/Zusatzqualifikationen2/AddZusatzqualifikationen2";
import EditZusatzqualifikationen2 from "./components/DoctorsDashboard/Doctor2/Zusatzqualifikationen2/EditZusatzqualifikationen2";
import Zusatzqualifikationen2 from "./components/DoctorsDashboard/Doctor2/Zusatzqualifikationen2/Zusatzqualifikationen2";
import AddGallery from "./components/Gallery/AddGallery";
import EditCategories from "./components/Gallery/EditCategories";
import EditGallery from "./components/Gallery/EditGallery";
import GalleryList from "./components/Gallery/GalleryList";
import AddCEBody from "./components/Landing Page/ChildEmergency/AddCEBody";
import CEBody from "./components/Landing Page/ChildEmergency/CEBody";
import CEHeader from "./components/Landing Page/ChildEmergency/CEHeader";
import EditCEBody from "./components/Landing Page/ChildEmergency/EditCEBody";
import EditCEHeader from "./components/Landing Page/ChildEmergency/EditCEHeader";
import AddCCBody from "./components/Landing Page/courseContent/AddCCBody";
import CCBody from "./components/Landing Page/courseContent/CCBody";
import CCHeading from "./components/Landing Page/courseContent/CCHeading";
import EditCCBody from "./components/Landing Page/courseContent/EditCCBody";
import EditCCHeading from "./components/Landing Page/courseContent/EditCCHeading";
import EditHeroSection from "./components/Landing Page/Hero Section/EditHeroSection";
import HeroSection from "./components/Landing Page/Hero Section/HeroSection";
import AddOMBody from "./components/Landing Page/organizationMatters/AddOMBody";
import EditOMBody from "./components/Landing Page/organizationMatters/EditOMBody";
import EditOMHeading from "./components/Landing Page/organizationMatters/EditOMHeading";
import OMBody from "./components/Landing Page/organizationMatters/OMBody";
import OMHeading from "./components/Landing Page/organizationMatters/OMHeading";
import Layout from "./components/Layout";
import AddMeeting from "./components/meeting/AddMeeting";
import EditMeeting from "./components/meeting/EditMeeting";
import MeetingList from "./components/meeting/MeetingList";
import MeetingTrash from "./components/meeting/MeetingTrash";
import Blog_client_side from "./components/pages/Blog";
import Addblog from "./components/pages/Blog/Addblog";
import BlogView from "./components/pages/Blog/BlogView";
import Editblog from "./components/pages/Blog/Editblog";
import BlogDetail from "./components/pages/BlogDetails";
import Contact from "./components/pages/Contact";
import ErrorPage from "./components/pages/ErrorPage";
import Home from "./components/pages/Home";
import Login from "./components/pages/login";
import ChangePassword from "./components/pages/login/ChangePassword";
import ForgotPassword from "./components/pages/login/ForgotPassword";
import ServerError from "./components/pages/login/ServerError";
import DeletedParticipants from "./components/participent/DeletedParticipant";
import EditParticipent from "./components/participent/EditParticipent";
import Invoice_Details from "./components/participent/Invoice_Details";
import ParticipentList from "./components/participent/ParticipentList";
import Policy from "./components/Policy";
import Settings from "./components/Settings";
import SubscriberList from "./components/Suscribers";

const ProtectedRoute = ({ element, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const Approuter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />

          <Route
            path="/settings"
            element={<ProtectedRoute element={<Settings />} />}
          />

          <Route
            path="/changepassword"
            element={<ProtectedRoute element={<ChangePassword />} />}
          />
          <Route path="/server-error" element={<ServerError />} />

          <Route
            path="/gallerylist"
            element={<ProtectedRoute element={<GalleryList />} />}
          />
          <Route
            path="/gallerylist/add"
            element={<ProtectedRoute element={<AddGallery />} />}
          />
          <Route
            path="/gallerylist/edit"
            element={<ProtectedRoute element={<EditGallery />} />}
          />
          <Route
            path="/edit-categories"
            element={<ProtectedRoute element={<EditCategories />} />}
          />

          <Route
            path="/contactlist"
            element={<ProtectedRoute element={<Contactlist />} />}
          />
          <Route
            path="/suscribers"
            element={<ProtectedRoute element={<SubscriberList />} />}
          />

          <Route
            path="/addblog"
            element={<ProtectedRoute element={<Addblog />} />}
          />
          <Route
            path="/editblog/:id"
            element={<ProtectedRoute element={<Editblog />} />}
          />
          <Route
            path="/blogview"
            element={<ProtectedRoute element={<BlogView />} />}
          />

          <Route
            path="/meetinglist"
            element={<ProtectedRoute element={<MeetingList />} />}
          />
          <Route
            path="/add-meeting"
            element={<ProtectedRoute element={<AddMeeting />} />}
          />
          <Route
            path="/editmeeting"
            element={<ProtectedRoute element={<EditMeeting />} />}
          />
          <Route
            path="/meeting-trash"
            element={<ProtectedRoute element={<MeetingTrash />} />}
          />

          <Route
            path="/meetinglist/participantlist"
            element={<ProtectedRoute element={<ParticipentList />} />}
          />
          <Route
            path="/meetinglist/participantlist/edit"
            element={<ProtectedRoute element={<EditParticipent />} />}
          />
          <Route
            path="/deleted-participants"
            element={<ProtectedRoute element={<DeletedParticipants />} />}
          />
        
        <Route path="/invoice-details/:id" element={<Invoice_Details />} />

          

          <Route
            path="/doctors/headerandpicture1"
            element={<ProtectedRoute element={<HeaderandPicture1 />} />}
          />
          <Route
            path="/doctors/headerandpicture1/editheaderandpicture1/:id"
            element={<ProtectedRoute element={<EditHeaderAndPicture1 />} />}
          />

          <Route
            path="/doctors/headerandpicture2"
            element={<ProtectedRoute element={<HeaderandPicture2 />} />}
          />
          <Route
            path="/doctors/headerandpicture2/editheaderandpicture2/:id"
            element={<ProtectedRoute element={<EditHeaderAndPicture2 />} />}
          />

          <Route
            path="/doctors/introduction1"
            element={<ProtectedRoute element={<Introduction1 />} />}
          />
          <Route
            path="/doctors/introduction1/addintroduction1"
            element={<ProtectedRoute element={<AddIntroduction1 />} />}
          />
          <Route
            path="/doctors/introduction1/editintroduction1/:id"
            element={<ProtectedRoute element={<EditIntroduction1 />} />}
          />

          <Route
            path="/doctors/introduction2"
            element={<ProtectedRoute element={<Introduction2 />} />}
          />
          <Route
            path="/doctors/introduction2/addintroduction2"
            element={<ProtectedRoute element={<AddIntroduction2 />} />}
          />
          <Route
            path="/doctors/introduction2/editintroduction2/:id"
            element={<ProtectedRoute element={<EditIntroduction2 />} />}
          />

          <Route
            path="/doctors/zusatzqualifikationen1"
            element={<ProtectedRoute element={<Zusatzqualifikationen1 />} />}
          />
          <Route
            path="/doctors/zusatzqualifikationen1/addzusatzqualifikationen1"
            element={<ProtectedRoute element={<AddZusatzqualifikationen1 />} />}
          />
          <Route
            path="/doctors/zusatzqualifikationen1/editzusatzqualifikationen1/:id"
            element={
              <ProtectedRoute element={<EditZusatzqualifikationen1 />} />
            }
          />

          <Route
            path="/doctors/zusatzqualifikationen2"
            element={<ProtectedRoute element={<Zusatzqualifikationen2 />} />}
          />
          <Route
            path="/doctors/zusatzqualifikationen2/addzusatzqualifikationen2"
            element={<ProtectedRoute element={<AddZusatzqualifikationen2 />} />}
          />
          <Route
            path="/doctors/zusatzqualifikationen2/editzusatzqualifikationen2/:id"
            element={
              <ProtectedRoute element={<EditZusatzqualifikationen2 />} />
            }
          />

          <Route
            path="/doctors/aktuell1"
            element={<ProtectedRoute element={<Aktuell1 />} />}
          />
          <Route
            path="/doctors/aktuell1/addaktuell1"
            element={<ProtectedRoute element={<AddAktuell1 />} />}
          />
          <Route
            path="/doctors/aktuell1/editaktuell1/:id"
            element={<ProtectedRoute element={<EditAktuell1 />} />}
          />

          <Route
            path="/doctors/aktuell2"
            element={<ProtectedRoute element={<Aktuell2 />} />}
          />
          <Route
            path="/doctors/aktuell2/addaktuell2"
            element={<ProtectedRoute element={<AddAktuell2 />} />}
          />
          <Route
            path="/doctors/aktuell2/editaktuell2/:id"
            element={<ProtectedRoute element={<EditAktuell2 />} />}
          />

          <Route
            path="/landingpage/herosection"
            element={<ProtectedRoute element={<HeroSection />} />}
          />
          <Route
            path="/landingpage/editherosection/:id"
            element={<ProtectedRoute element={<EditHeroSection />} />}
          />

          <Route
            path="/landingpage/childemergencyheader"
            element={<ProtectedRoute element={<CEHeader />} />}
          />
          <Route
            path="/landingpage/editchildemergencyheader/:id"
            element={<ProtectedRoute element={<EditCEHeader />} />}
          />

          <Route
            path="/landingpage/childemergencybody"
            element={<ProtectedRoute element={<CEBody />} />}
          />
          <Route
            path="/landingpage/childemergencybody/addchildemergencybody"
            element={<ProtectedRoute element={<AddCEBody />} />}
          />
          <Route
            path="/landingpage/childemergencybody/editchildemergencybody/:id"
            element={<ProtectedRoute element={<EditCEBody />} />}
          />

          <Route
            path="/landingpage/coursecontentheading"
            element={<ProtectedRoute element={<CCHeading />} />}
          />
          <Route
            path="/landingpage/coursecontentheading/editcoursecontentheading/:id"
            element={<ProtectedRoute element={<EditCCHeading />} />}
          />

          <Route
            path="/landingpage/coursecontentbody"
            element={<ProtectedRoute element={<CCBody />} />}
          />
          <Route
            path="/landingpage/coursecontentbody/editcoursecontentbody/:id"
            element={<ProtectedRoute element={<EditCCBody />} />}
          />
          <Route
            path="/landingpage/coursecontentbody/addcoursecontentbody"
            element={<ProtectedRoute element={<AddCCBody />} />}
          />

          <Route
            path="/landingpage/organizationmattersheading"
            element={<ProtectedRoute element={<OMHeading />} />}
          />
          <Route
            path="/landingpage/organizationmattersheading/editorganizationmattersheading/:id"
            element={<ProtectedRoute element={<EditOMHeading />} />}
          />

          <Route
            path="/landingpage/organizationmattersbody"
            element={<ProtectedRoute element={<OMBody />} />}
          />
          <Route
            path="/landingpage/organizationmattersbody/editorganizationmattersbody/:id"
            element={<ProtectedRoute element={<EditOMBody />} />}
          />
          <Route
            path="/landingpage/organizationmattersbody/addorganizationmattersbody"
            element={<ProtectedRoute element={<AddOMBody />} />}
          />

          <Route
            path="/addadmin"
            element={<ProtectedRoute element={<AddAdmin />} />}
          />

          <Route
            path="/admin-dashboard"
            element={<ProtectedRoute element={<Admin_Dashboard />} />}
          />

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
