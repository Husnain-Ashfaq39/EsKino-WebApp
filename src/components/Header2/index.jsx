import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SocialWidget from "../Widget/SocialWidget";
import Newsletter from "../Widget/Newsletter";
import IconBoxStyle1 from "../IconBox/IconBoxStyle1";
import Spacing from "../Spacing";
import { closeSvg, icon1Svg, icon2Svg, icon3Svg, logo2Png, logoSvg } from "../imagepath";
import { getAllDocuments } from "../../services/dbService";
import { useQuery } from "@tanstack/react-query";
import colors from "../../colorTheme";

export default function Header2({ logoSrc, variant }) {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileToggle, setMobileToggle] = useState(false);
  const [sideNav, setSideNav] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);
  const [key, setKey] = useState({ logoUrl: "" });
  const [contactInfo, setContactInfo] = useState({
    address: "",
    phone: "",
    email: "",
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const {
    data: logoData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [key],
    queryFn: () =>
      getAllDocuments("HeroSection").then((querySnapshot) => {
        const logoData = querySnapshot.docs.map((doc) => ({
          logoUrl: doc.data().heroLogo,
        }));
        setKey(key);
        return logoData[0];
      }),
  });

  const fetchContactInfo = async () => {
    const colSnap = await getAllDocuments("contactInfo");

    if (!colSnap.empty) {
      const docSnap = colSnap.docs[0];
      return {
        address: docSnap.data().address,
        phone: docSnap.data().phone,
        email: docSnap.data().email,
      };
    } else {
      return {
        address: "",
        phone: "",
        email: "",
      };
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchContactInfo();
      setContactInfo(data);
    };

    fetchData();
  }, []);
  if (isLoading) {
    return <div></div>;
  }

  if (error) {
    return <div></div>;
  }

  if (!logoData) {
    return <div></div>;
  }

  const styles = {
    logo: isMobile ? { width: "30px", height: "auto" } : { width: "45px", height: "auto", marginTop : "4px" },
    menuToggle: isMobile ? { width: "25px", height: "auto" } : { width: "35px", height: "auto" },
    header: isMobile ? { padding: "25px" } : { padding: "20px" },
    companyName: isMobile ? { fontSize: "1.65rem", marginLeft: "-18px" ,marginTop : "0px"} : { fontSize: "2rem",  marginLeft: "2px" ,marginTop : "30px"},
  };

  return (
    <>
      <header
        className={`cs_site_header cs_style1 cs_sticky_header ${
          mobileToggle ? "cs_mobile_toggle_active" : ""
        } ${variant} ${isSticky ? "cs_sticky_active" : ""}`}
      >
        <div className="mb-10 cs_main_header mx-[-15px] py-0" style={{ ...styles.header, marginTop: "-10px", backgroundColor: colors.primary }}>
          <div className="container h-20">
            <div className="cs_main_header_in">
              <div className="cs_main_header_left">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: isMobile ? "0" : "-2.5rem",
                  }}
                >
                  <Link className="cs_site_branding logo_style" to="/">
                    <img src={logoData.logoUrl} alt="Logo" style={styles.logo} />
                  </Link>
                  <Link to="/">
                    <h2 className="company_name text-4xl font-semibold pb-2" style={styles.companyName}>
                      Eskino
                    </h2>
                  </Link>
                </div>
                <nav style={{marginTop:"-10px"}} className="cs_nav ml-24">
                  <ul
                    className={`${
                      mobileToggle ? "cs_nav_list cs_active" : "cs_nav_list"
                    }`}
                  >
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/blog">Our Blogs</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                  </ul>
                  <span
                    className={
                      mobileToggle
                        ? "cs_menu_toggle cs_teggle_active"
                        : "cs_menu_toggle"
                    }
                    onClick={() => setMobileToggle(!mobileToggle)}
                  >
                    <svg
                      width={styles.menuToggle.width}
                      height={styles.menuToggle.height}
                      viewBox="0 0 35 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.483887 2.46544C0.483887 1.10383 1.14618 0 1.96315 0H33.5208C34.3377 0 35 1.10383 35 2.46544C35 3.82708 34.3377 4.93088 33.5208 4.93088H1.96315C1.14618 4.93088 0.483887 3.82708 0.483887 2.46544Z"
                        fill="currentColor"
                      />
                      <path
                        d="M0.483887 14.6694C0.483887 13.3074 1.14618 12.2039 1.96315 12.2039H33.5208C34.3377 12.2039 35 13.3074 35 14.6694C35 16.0309 34.3377 17.1348 33.5208 17.1348H1.96315C1.14618 17.1348 0.483887 16.0309 0.483887 14.6694Z"
                        fill="currentColor"
                      />
                      <path
                        d="M0.483887 26.6267C0.483887 25.2648 1.14618 24.1613 1.96315 24.1613H33.5208C34.3377 24.1613 35 25.2648 35 26.6267C35 27.9883 34.3377 29.0922 33.5208 29.0922H1.96315C1.14618 29.0922 0.483887 27.9883 0.483887 26.6267Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </nav>
              </div>
              <div  className="cs_main_header_right">
                <div className="cs_toolbox">
                  <button
                  style={{marginTop:"-10px"}}
                    className="cs_toolbox_btn cs_sidebar_toggle_btn"
                    type="button"
                    onClick={() => setSideNav(!sideNav)}
                  >
                    <svg
                      width={styles.menuToggle.width}
                      height={styles.menuToggle.height}
                      viewBox="0 0 35 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.483887 2.46544C0.483887 1.10383 1.14618 0 1.96315 0H33.5208C34.3377 0 35 1.10383 35 2.46544C35 3.82708 34.3377 4.93088 33.5208 4.93088H1.96315C1.14618 4.93088 0.483887 3.82708 0.483887 2.46544Z"
                        fill="currentColor"
                      />
                      <path
                        d="M0.483887 14.6694C0.483887 13.3074 1.14618 12.2039 1.96315 12.2039H33.5208C34.3377 12.2039 35 13.3074 35 14.6694C35 16.0309 34.3377 17.1348 33.5208 17.1348H1.96315C1.14618 17.1348 0.483887 16.0309 0.483887 14.6694Z"
                        fill="currentColor"
                      />
                      <path
                        d="M0.483887 26.6267C0.483887 25.2648 1.14618 24.1613 1.96315 24.1613H33.5208C34.3377 24.1613 35 25.2648 35 26.6267C35 27.9883 34.3377 29.0922 33.5208 29.0922H1.96315C1.14618 29.0922 0.483887 27.9883 0.483887 26.6267Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className={`cs_sidenav ${sideNav ? "active" : ""}`}>
        <div
          className="cs_sidenav_overlay"
          onClick={() => setSideNav(!sideNav)}
        />
        <div className="cs_sidenav_in">
          <button
            className="cs_close"
            type="button"
            onClick={() => setSideNav(!sideNav)}
          >
            <img src={closeSvg} alt="Close" />
          </button>
          <div className="cs_logo_box">
            <div
              className="account-logo"
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                src={logo2Png}
                alt="Eskino"
                style={styles.logo}
              />
              <h3 style={{ marginLeft: "10px", marginTop: "25px" }}>Eskino</h3>
            </div>
            <div className="cs_height_15" />
            <h3 className="cs_fs_24 cs_semibold mb-0" style={{fontWeight:"300"}}>
              Your Partner in Health and Wellness
            </h3>
          </div>
          <Spacing md="35" lg="35" xl="35" />
          <hr />
          <Spacing md="35" lg="50" xl="35" />
          <IconBoxStyle1
            title="Phone"
            subTitle={contactInfo.phone}
            iconSrc={icon1Svg}
          />
          <Spacing md="30" lg="30" xl="30" />
          <IconBoxStyle1
            title="Email"
            subTitle={contactInfo.email}
            iconSrc={icon2Svg}
          />
          <Spacing md="30" lg="30" xl="30" />
          <IconBoxStyle1
            title="Location"
            subTitle={contactInfo.address}
            iconSrc={icon3Svg}
          />
          <Spacing md="60" lg="60" xl="60" />
          <Newsletter />
          <Spacing md="70" lg="50" xl="50" />
          <hr />
          <Spacing md="70" lg="50" xl="50" />
          <SocialWidget />
        </div>
      </div>
      <div className={`cs_header_search ${searchToggle ? "active" : ""}`}>
        <div className="cs_header_search_in">
          <div className="container">
            <div className="cs_header_search_box">
              <form className="cs_search_form">
                <input type="text" placeholder="Search Doctors" />
                <button className="cs_search_btn">
                  <svg
                    width={18}
                    height={18}
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.07914 0C3.62682 0 0 3.62558 0 8.07641C0 12.5272 3.62682 16.1599 8.07914 16.1599C9.98086 16.1599 11.7299 15.4936 13.1122 14.3875L16.4775 17.7498C16.6473 17.9126 16.8741 18.0024 17.1094 18C17.3446 17.9975 17.5695 17.9032 17.736 17.737C17.9025 17.5708 17.9972 17.3461 17.9999 17.111C18.0027 16.8758 17.9132 16.6489 17.7506 16.4789L14.3853 13.1148C15.4928 11.7308 16.16 9.97968 16.16 8.07641C16.16 3.62558 12.5315 0 8.07914 0ZM8.07914 1.79517C11.561 1.79517 14.3625 4.59577 14.3625 8.07641C14.3625 11.557 11.561 14.3647 8.07914 14.3647C4.59732 14.3647 1.79575 11.557 1.79575 8.07641C1.79575 4.59577 4.59732 1.79517 8.07914 1.79517Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </form>
              <button
                className="cs_close"
                type="button"
                onClick={() => setSearchToggle(!searchToggle)}
              >
                <img src={closeSvg} alt="Close" />
              </button>
            </div>
          </div>
        </div>
        <div
          className="cs_sidenav_overlay"
          onClick={() => setSearchToggle(!searchToggle)}
        />
      </div>
    </>
  );
}
