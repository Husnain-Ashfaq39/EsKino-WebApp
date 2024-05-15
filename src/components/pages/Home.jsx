import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Timestamp } from 'firebase/firestore';

import Hero from "../Hero";
import Section from "../Section";
import AboutSection from "../Section/AboutSection";
import Banner from "../Section/BannerSection";
import SectionHeading from "../SectionHeading";
import BlogSection from "../Section/BlogSection";
import DepartmentSection from "../Section/DepartmentSection";
import SessionCard from "../SessionCard";
import Spacing from "../Spacing";
import DepartmentSectionStyle1 from "../WebChildEmergency/DepartmentSectionStyle2";
import Gallery from "./Gallery";
import { getAllDocuments } from "../../services/dbService";
import { pageTitle } from "../../helpers/PageTitle";
import { aboutMiniSvg, about_img, ctaBgSvg, banner_img50, departmentIcon1Svg, departmentIcon2Svg, departmentIcon3Svg, departmentIcon4Svg, departmentIcon5Svg, departmentIcon6Svg, heroBgJpeg } from "../imagepath";
import BlogSectionStyle2 from "../Section/BlogSection/BlogSectionStyle2";

const departmentData = [
  { title: "Emergency Department", iconUrl: departmentIcon1Svg, href: "/departments/department-details" },
  { title: "Pediatric Department", iconUrl: departmentIcon2Svg, href: "/departments/department-details" },
  { title: "Gynecology Department", iconUrl: departmentIcon3Svg, href: "/departments/department-details" },
  { title: "Cardiology Department", iconUrl: departmentIcon4Svg, href: "/departments/department-details" },
  { title: "Neurology Department", iconUrl: departmentIcon5Svg, href: "/departments/department-details" },
  { title: "Psychiatry Department", iconUrl: departmentIcon6Svg, href: "/departments/department-details" },
];

export default function Home() {
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState([]);
  const [heroKey, setHeroKey] = useState({ title: "", subTitle: "", imgUrl: "" });
  const [CEHeaderKey, setCEHeaderKey] = useState({ title: "" });
  const [CEBodyKey, setCEBodyKey] = useState([]);


  const { data: heroData, isLoading, error } = useQuery({
    queryKey: ['HeroSection'],
    queryFn: () =>
      getAllDocuments("HeroSection").then((querySnapshot) => {
        const heroDataArray = querySnapshot.docs.map((doc) => ({
          title: doc.data().heroTitle,
          subTitle: doc.data().heroSubtitle,
          imgUrl: doc.data().heroBackground,
        }));
        setHeroKey(heroDataArray[0]);
        return heroDataArray[0];
      }),
  });

  const { data: CEHeader } = useQuery({
    queryKey: ['ChildEmergencyHeader'],
    queryFn: () =>
      getAllDocuments("ChildEmergencyHeader").then((querySnapshot) => {
        const CEHeaderArray = querySnapshot.docs.map((doc) => ({
          title: doc.data().CEHeadTitle,
        }));
        setCEHeaderKey(CEHeaderArray[0]);
        return CEHeaderArray[0];
      }),
  });

  const { data: CEBody } = useQuery({
    queryKey: ['ChildEmergencyBody'],
    queryFn: () =>
      getAllDocuments("ChildEmergencyBody").then((querySnapshot) => {
        const CEBodyArray = querySnapshot.docs.map((doc) => ({
          title: doc.data().CEBodyTitle,
          subTitle: doc.data().CEBodySubtitle,
          description: doc.data().CEBodyDescription,
          href: "#",
        }));
        setCEBodyKey(CEBodyArray);
        return CEBodyArray;
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
            publicationDate = data.publicationDate.toDate().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
          } else if (data.publicationDate.seconds && data.publicationDate.nanoseconds) {
            const timestamp = new Timestamp(data.publicationDate.seconds, data.publicationDate.nanoseconds);
            publicationDate = timestamp.toDate().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
          } else {
            publicationDate = new Date(data.publicationDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (!heroData) return <div>No data available</div>;

  return (
    <>
      <Hero title={heroData.title} subTitle={heroData.subTitle} bgUrl={heroBgJpeg} imgUrl={heroData.imgUrl} />
      <Section topMd={200} topLg={150} topXl={110}>
        {CEHeader && <DepartmentSectionStyle1 sectionTitle={CEHeader.title} data={CEBody} />}
      </Section>
      <Spacing md="182" lg="150" />
      <div className="container cs_hero cs_style_1">
        <SectionHeading title="Upcoming Training Sessions" center={true} />
        <Spacing md="72" lg="50" />
        <SessionCard limit={true} />
      </div>
      <Section>
        <AboutSection
          imgUrl={about_img}
          spiningImgUrl={aboutMiniSvg}
          title="About Us"
          subTitle="EsKino"
          featureList={[
            {
              featureListTitle: "Eskino is a team of experienced medical professionals",
              featureListSubTitle: "We offer essential child emergency aid sessions, equipping parents with the knowledge and skills to handle critical situations. From CPR to first aid, we provide the tools to ensure your child's safety.",
            },
          ]}
        />
      </Section>
      <Section topMd={185} topLg={150} topXl={110}>
        <DepartmentSection sectionTitle="Departments" bgUrl="../../../public/images/home_1/department_bg.svg" data={departmentData} />
      </Section>
      <Section topMd={185} topLg={140} topXl={100} bottomMd={200} bottomLg={150} bottomXl={110}></Section>
      <Section>
        <Banner bgUrl={ctaBgSvg} imgUrl={banner_img50} title="Emergency Aid Made Easy for Parents" subTitle="Equipping parents with essential skills for child emergency response, ensuring confident and effective action in critical situations." />
      </Section>
      <Gallery />

      <BlogSection
          sectionTitle="Latest Update"
          sectionTitleUp="BLOG POSTS"
          data={blogData}
        />
      
      {/* End Blog Section */}
    </>
  );
}


 
