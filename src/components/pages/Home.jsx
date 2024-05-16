import React, { useState, useEffect } from "react";
import Hero from "../Hero";
import Section from "../Section";
import AboutSection from "../Section/AboutSection";
import Banner from "../Section/BannerSection";
import SectionHeading from "../SectionHeading";
import { useQuery } from "@tanstack/react-query";
import { pageTitle } from "../../helpers/PageTitle";
import { getAllDocuments } from "../../services/dbService";
import BlogSection from "../Section/BlogSection";
import Spacing from "../Spacing";
import DepartmentSectionStyle1 from "../WebChildEmergency/DepartmentSectionStyle2";
import {
  aboutMiniSvg,
  about_img,
  banner_img50,
  ctaBgSvg,
  heroBgJpeg,
  post1Jpeg,
  post2Jpeg,
  post3Jpeg,
} from "../imagepath";
import Gallery from "./Gallery";
import WebCourseContent from "../WebLandingPage/WebCourseContent/WebCourseContent";
import SessionCard from "../SessionCard";
import FeaturesSection from "../WebLandingPage/WebOrganizationMatters/OrganizationMattersSection";
import { useNavigate } from "react-router-dom";
import { Timestamp } from "firebase/firestore";
// Sample data

const workingProcessData = [
  {
    title: "Book Appointment",
    subTitle:
      "You can book an appointment with us by <br />calling our office, filling out an online form, or <br />using our mobile app.",
    iconUrl: "/images/home_2/wording_process_icon_1.svg",
    number: "01",
  },
  {
    title: "Visit Our Facility",
    subTitle:
      "On the day of your appointment, come to our <br />facility at the designated time. Our staff will greet <br />you and guide you through the check-in process.",
    iconUrl: "/images/home_2/wording_process_icon_2.svg",
    number: "02",
  },
  {
    title: "Meet with Our Healthcare <br />Professionals",
    subTitle:
      "You will meet with one of our healthcare <br />professionals who will conduct a thorough <br />examination and provide a diagnosis or <br />treatment plan.",
    iconUrl: "/images/home_2/wording_process_icon_3.svg",
    number: "03",
  },
  {
    title: "Follow-up Care",
    subTitle:
      "We will schedule any necessary follow-up <br />appointments, tests, or procedures to ensure <br />that you receive the best possible care.",
    iconUrl: "/images/home_2/wording_process_icon_4.svg",
    number: "04",
  },
  {
    title: "Insurance and Billing",
    subTitle:
      "We accept most major insurance plans and <br />our billing department will work with you to <br />ensure that you understand your coverage <br />and any out-of-pocket expenses.",
    iconUrl: "/images/home_2/wording_process_icon_5.svg",
    number: "05",
  },
];

export default function Home() {
  // const navigate = useNavigate();
  const [blogData, setBlogData] = useState([]);
  // Hero Section useQuery
  const {
    data: heroData,
    isLoading: heroLoading,
    error: heroError,
  } = useQuery({
    queryKey: ["HeroSection"],
    queryFn: () =>
      getAllDocuments("HeroSection").then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          title: doc.data().heroTitle,
          subTitle: doc.data().heroSubtitle,
          imgUrl: doc.data().heroBackground,
        }));
        return data[0];
      }),
  });

  // Child Emergency Header useQuery
  const {
    data: CEHeader,
    isLoading: CEHeaderLoading,
    error: CEHeaderError,
  } = useQuery({
    queryKey: ["ChildEmergencyHeader"],
    queryFn: () =>
      getAllDocuments("ChildEmergencyHeader").then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          title: doc.data().CEHeadTitle,
        }));
        return data[0];
      }),
  });

  // Child Emergency Body useQuery
  const {
    data: CEBody,
    isLoading: CEBodyLoading,
    error: CEBodyError,
  } = useQuery({
    queryKey: ["ChildEmergencyBody"],
    queryFn: () =>
      getAllDocuments("ChildEmergencyBody").then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          title: doc.data().CEBodyTitle,
          subTitle: doc.data().CEBodySubtitle,
          description: doc.data().CEBodyDescription,
          href: "#",
        }));
        return data;
      }),
  });

  // Course Content Heading useQuery
  const {
    data: CCHeadData,
    isLoading: CCHeadLoading,
    error: CCHeadError,
  } = useQuery({
    queryKey: ["CourseContentHeading"],
    queryFn: () =>
      getAllDocuments("CourseContentHeading").then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          CCHeadTitle: doc.data().CCHeadTitle,
          CCHeadSubtitle: doc.data().CCHeadSubtitle,
        }));
        return data[0];
      }),
  });

  // Course Content Body useQuery
  const [CCBodyDataKey, setCCBodyDataKey] = useState([]);

  const {
    data: CCBodyData,
    isLoading: CCBodyLoading,
    error: CCBodyError,
  } = useQuery({
    queryKey: ["CourseContentBodyKey:", ...CCBodyDataKey], // Concatenating with a string
    queryFn: () =>
      getAllDocuments("CourseContentHeading").then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          CCTitle: doc.data().CCTitle,
          CCSubtitle: doc.data().CCSubtitle,
          CCQuote: doc.data().CCQuote,
          CCImage: doc.data().CCImage,
        }));

        setCCBodyDataKey(data);
        return data;
      }),
  });

  // Organization Matters Heading useQuery
  // const [OMHeadDataKey, setOMHeadDataKey] = useState();

  const {
    data: OMHeadData,
    isLoading: OMHeadLoading,
    error: OMHeadError,
  } = useQuery({
    queryKey: ["OrganizationMattersHeading: "],
    queryFn: () =>
      getAllDocuments("OrganizationMattersHeading").then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          OMHeadTitle: doc.data().OMHeadTitle,
          OMHeadDescription: doc.data().OMHeadDescription,
        }));
        // setOMHeadDataKey(data[0]);
        // console.log(data[0])
        return data[0];
      }),
  });

  useEffect(() => {
    pageTitle("Home");

    const fetchBlogData = async () => {
      try {
        const snapshot = await getAllDocuments("blogs");
        const blogDataArray = snapshot.docs.map((doc) => {
          const data = doc.data();
          let publicationDate;

          if (data.publicationDate instanceof Timestamp) {
            publicationDate = data.publicationDate
              .toDate()
              .toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
          } else if (
            data.publicationDate.seconds &&
            data.publicationDate.nanoseconds
          ) {
            const timestamp = new Timestamp(
              data.publicationDate.seconds,
              data.publicationDate.nanoseconds
            );
            publicationDate = timestamp.toDate().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
          } else {
            publicationDate = new Date(data.publicationDate).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            );
          }

          return {
            id: doc.id,
            title: data.title,
            thumbUrl: data.imageUrl,
            date: publicationDate,
            btnText: "Learn More",
            href: `/blog/blog-details/${doc.id}`,
            socialShare: true,
          };
        });

        setBlogData(blogDataArray);
      } catch (error) {
        console.error("Error fetching blog data: ", error);
      }
    };

    fetchBlogData();
  }, []);

  if (heroLoading || CEHeaderLoading || CEBodyLoading || CCHeadLoading) {
    return <div>Loading...</div>;
  }

  if (heroError || CEHeaderError || CEBodyError || CCHeadError) {
    return <div>Error loading data</div>;
  }

  if (!heroData || !CEHeader || !CEBody || !CCHeadData) {
    return <div>No data available</div>;
  }

  return (
    <>
      {/* Hero Section */}
      <Hero
        title={heroData.title}
        subTitle={heroData.subTitle}
        bgUrl={heroBgJpeg}
        imgUrl={heroData.imgUrl}
      />

      {/* Child Emergency Section */}
      <Section topMd={200} topLg={150} topXl={110}>
        {CEHeader && (
          <DepartmentSectionStyle1
            sectionTitle={CEHeader.title}
            data={CEBody}
          />
        )}
      </Section>

      <Spacing md="182" lg="150" />

      {/* Course Content Section */}
      <WebCourseContent
        sectionTitle={CCHeadData.CCHeadTitle}
        sectionTitleUp=""
        sectionTitleDown=""
        sectionSubTitle={CCHeadData.CCHeadSubtitle}
        data={workingProcessData}
      />

      <Spacing md="182" lg="150" />

      {/* Organization Matters Section */}
      <Section
        topMd={185}
        topLg={140}
        topXl={100}
        bottomMd={185}
        bottomLg={140}
        bottomXl={100}
      >
        <FeaturesSection
          sectionTitle={OMHeadData.OMHeadTitle}
          sectionSubtile={OMHeadData.OMHeadDescription}
        />
      </Section>

      {/* Training session */}
      <div className="container cs_hero cs_style_1">
        <SectionHeading title="Upcoming Training Sessions" center={true} />
        <Spacing md="72" lg="50" />
        {/* Render your training session component here */}
        <SessionCard />
      </div>

      <Section>
        <AboutSection
          imgUrl={about_img}
          spiningImgUrl={aboutMiniSvg}
          title="About Us"
          subTitle="EsKino"
          featureList={[
            {
              featureListTitle:
                "Eskino is a team of experienced medical professionals",
              featureListSubTitle:
                "We offers essential child emergency aid sessions, equipping parents with the knowledge and skills to handle critical situations. From CPR to first aid, we provide the tools to ensure your childs safety.",
            },
          ]}
        />
      </Section>
      <Spacing md="182" lg="150" />
      {/* Render your testimonial section here */}
      <Spacing md="165" lg="125" />
      <Section>
        <Banner
          bgUrl={ctaBgSvg}
          imgUrl={banner_img50}
          title="Emergency Aid Made Easy for Parents"
          subTitle="Equipping parents with essential skills for child emergency response, ensuring confident and effective action in critical situations."
        />
      </Section>

      <Gallery />
      <Section topMd={190} topLg={145} topXl={105}>
        <BlogSection
          sectionTitle="Latest Update"
          sectionTitleUp="BLOG POSTS"
          data={blogData}
        />
      </Section>
 <Spacing md="182" lg="150" />
    </>
  );
}
