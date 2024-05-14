import React from "react";
import Hero from "../Hero";
import AboutSection from "../Section/AboutSection";
import SectionHeading from "../SectionHeading";
import Banner from "../Section/BannerSection";
import Section from "../Section";
// import FeaturesSection from '../Section/FeaturesSection';
import { useNavigate } from "react-router-dom"; // Import useNavigate
import BlogSection from "../Section/BlogSection";
import DepartmentSection from "../Section/DepartmentSection";
import { pageTitle } from "../../helpers/PageTitle";
import SessionCard from "../SessionCard";
import { useQuery } from "@tanstack/react-query";
import Spacing from "../Spacing";
import {
  aboutMiniSvg,
  aboutPng,
  about_img,
  arrowWhiteSvg,
  bannerBgSvg,
  bannerImgPng,
  banner_img50,
  compassionSvg,
  ctaBgSvg,
  dep_icon1,
  dep_icon2,
  dep_icon3,
  dep_icon4,
  departmentIcon1Svg,
  departmentIcon2Svg,
  departmentIcon3Svg,
  departmentIcon4Svg,
  departmentIcon5Svg,
  departmentIcon6Svg,
  excellenceSvg,
  heroBgJpeg,
  heroImgPng,
  integritySvg,
  pinSvg,
  post1Jpeg,
  post2Jpeg,
  post3Jpeg,
  respectSvg,
  teamworkSvg,
  titleIconPng,
  titleIconsSvg,
} from "../imagepath";
import Gallery from "./Gallery";
import { getAllDocuments } from "../../services/dbService";

const blogData = [
  {
    title: "The Benefits of Mindfulness Meditation for Stress and Anxiety",
    thumbUrl: post1Jpeg,
    date: "May 1, 2023",
    btnText: "Learn More",
    href: "/blog/blog-details",
    socialShare: true,
  },
  {
    title: "Healthy Eating on a Budget: Tips and Strategies",
    thumbUrl: post2Jpeg,
    date: "May 4, 2023",
    btnText: "Learn More",
    href: "/blog/blog-details",
    socialShare: true,
  },
  {
    title: "The Importance of Regular Cancer Screenings and Early Detection",
    thumbUrl: post3Jpeg,
    date: "May 1, 2023",
    btnText: "Learn More",
    href: "/blog/blog-details",
    socialShare: true,
  },
];

const departmentData = [
  {
    title: "Emergency Department",
    iconUrl: departmentIcon1Svg,
    href: "/departments/department-details",
  },
  {
    title: "Pediatric Department",
    iconUrl: departmentIcon2Svg,
    href: "/departments/department-details",
  },
  {
    title: "Gynecology Department",
    iconUrl: departmentIcon3Svg,
    href: "/departments/department-details",
  },
  {
    title: "Cardiology Department",
    iconUrl: departmentIcon4Svg,
    href: "/departments/department-details",
  },
  {
    title: "Neurology Department",
    iconUrl: departmentIcon5Svg,
    href: "/departments/department-details",
  },
  {
    title: "Psychiatry Department",
    iconUrl: departmentIcon6Svg,
    href: "/departments/department-details",
  },
];

export default function Home() {
  const navigate = useNavigate();

  const {
    data: heroData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["heroData"],
    queryFn: () =>
      getAllDocuments("HeroSection").then((querySnapshot) => {
        const heroData = querySnapshot.docs.map((doc) => ({
          title: doc.data().heroTitle,
          subTitle: doc.data().heroSubtitle,
          imgUrl: doc.data().heroBackground,
        }));
        return heroData[0];
      }),
  });

  pageTitle("Home");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  if (!heroData) {
    return <div>No data available</div>;
  }

  return (
    <>
      <Hero
        title={heroData.title}
        subTitle={heroData.subTitle}
        bgUrl={heroBgJpeg}
        imgUrl={heroData.imgUrl}
      />

      <div className="container cs_hero cs_style_1">
        <SectionHeading title="Upcoming Training Sessions" center={true} />
        <Spacing md="72" lg="50" />
        <SessionCard limit={true} />

       
      </div>

      {/* Start Feature Section */}
      {/* <FeaturesSection sectionTitle="Our Values" data={featureListData} /> */}
      {/* End Feature Section */}
      {/* Start About Section */}
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
      {/* End About Section */}
      {/* Start Departments Section */}
      <Section topMd={185} topLg={150} topXl={110}>
        <DepartmentSection
          sectionTitle="Departments"
          bgUrl="../../../public/images/home_1/department_bg.svg"
          data={departmentData}
        />
      </Section>

      {/* End Departments Section */}

      {/* Start Testimonial */}
      <Section
        topMd={185}
        topLg={140}
        topXl={100}
        bottomMd={200}
        bottomLg={150}
        bottomXl={110}
      ></Section>
      {/* End Testimonial */}
      {/* Start Banner Section */}
      <Section>
        <Banner
          bgUrl={ctaBgSvg}
          imgUrl={banner_img50}
          title="Emergency Aid Made Easy for Parents"
          subTitle="Equipping parents with essential skills for child emergency response, ensuring confident and effective action in critical situations."
        />
      </Section>
      {/* End Banner Section */}

      <Gallery />

      {/* End Gallery Section */}

      <Section topMd={190} topLg={145} topXl={105}>
        <BlogSection
          sectionTitle="Latest Update"
          sectionTitleUp="BLOG POSTS"
          data={blogData}
        />
      </Section>
      {/* End Blog Section */}
    </>
  );
}
