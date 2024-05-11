import React from 'react';
import Hero from '../Hero';
import AboutSection from '../Section/AboutSection';
import SectionHeading from '../SectionHeading';
import Banner from '../Section/BannerSection';
import Section from '../Section';
// import FeaturesSection from '../Section/FeaturesSection';
import Spacing from '../Spacing';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import BlogSection from '../Section/BlogSection';
import DepartmentSection from '../Section/DepartmentSection';
import { pageTitle } from '../../helpers/PageTitle';
import SessionCard from '../SessionCard';

import { aboutMiniSvg, aboutPng, arrowWhiteSvg, bannerBgSvg, bannerImgPng, compassionSvg, ctaBgSvg, dep_icon1, dep_icon2, dep_icon3, dep_icon4, departmentIcon1Svg, departmentIcon2Svg, departmentIcon3Svg, departmentIcon4Svg, departmentIcon5Svg, departmentIcon6Svg, excellenceSvg, heroBgJpeg, heroImgPng, integritySvg, pinSvg, post1Jpeg, post2Jpeg, post3Jpeg, respectSvg, teamworkSvg, titleIconPng, titleIconsSvg } from '../imagepath';


const blogData = [
  {
    title: 'The Benefits of Mindfulness Meditation for Stress and Anxiety',
    thumbUrl: post1Jpeg,
    date: 'May 1, 2023',
    btnText: 'Learn More',
    href: '/blog/blog-details',
    socialShare: true,
  },
  {
    title: 'Healthy Eating on a Budget: Tips and Strategies',
    thumbUrl: post2Jpeg,
    date: 'May 4, 2023',
    btnText: 'Learn More',
    href: '/blog/blog-details',
    socialShare: true,
  },
  {
    title: 'The Importance of Regular Cancer Screenings and Early Detection',
    thumbUrl: post3Jpeg,
    date: 'May 1, 2023',
    btnText: 'Learn More',
    href: '/blog/blog-details',
    socialShare: true,
  },
];



const departmentData = [
  {
    title: 'Emergency Department',
    iconUrl: {departmentIcon1Svg},
    href: '/departments/department-details',
  },
  {
    title: 'Pediatric Departement',
    iconUrl: {departmentIcon2Svg},
    href: '/departments/department-details',
  },
  {
    title: 'Gynecology Department',
    iconUrl: {departmentIcon3Svg},
    href: '/departments/department-details',
  },
  {
    title: 'Cardiology Department',
    iconUrl: {departmentIcon4Svg},
    href: '/departments/department-details',
  },
  {
    title: 'Neurology Department',
    iconUrl: {departmentIcon5Svg},
    href: '/departments/department-details',
  },
  {
    title: 'Psychiatry Department',
    iconUrl: {departmentIcon6Svg},
    href: '/departments/department-details',
  },
];
const title = "Empowering Parents, Protecting Children."
const subTitle = "We offers essential child emergency aid sessions, equipping parents with the knowledge and skills to handle critical situations. From CPR to first aid, we provide the tools to ensure your child's safety."
const bgUrl = {heroBgJpeg}
const imgUrl = {heroImgPng}





export default function Home() {
  const navigate = useNavigate(); 
  pageTitle('Home');
  return (
    <>

      <Hero
        title={title}
        subTitle={subTitle}
        bgUrl={bgUrl}
        imgUrl={imgUrl}



      />

<div className='container cs_hero cs_style_1'>
    <SectionHeading title="Upcoming Training Sessions" center={true} />
    <Spacing md="72" lg="50" />
    <SessionCard  />
   

    {/* Button */}
    <div className="cs_hero_info_col flex flex-col items-center justify-center">
        <div className="cs_btn cs_style_1" style={{ cursor: 'pointer' }} onClick={() => navigate('/appointments')}>
            <span>View All Sessions</span>
            <i>
                <img src={arrowWhiteSvg} alt="Icon" />
                <img src={arrowWhiteSvg} alt="Icon" />
            </i>
        </div>
    </div>
</div>


      {/* Start Feature Section */}
      {/* <FeaturesSection sectionTitle="Our Values" data={featureListData} /> */}
      {/* End Feature Section */}
      {/* Start About Section */}
      <Section>
        <AboutSection
          imgUrl={aboutPng}
          spiningImgUrl={aboutMiniSvg}
          title="About Us"
          subTitle="PRO HEALTH"
          featureList={[
            {
              featureListTitle:
                'ProHealth is a team of experienced medical professionals',
              featureListSubTitle:
                'Dedicated to providing top-quality healthcare services. We believe in a holistic approach to healthcare that focuses on treating the whole person, not just the illness or symptoms.',
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
      >

      </Section>
      {/* End Testimonial */}
      {/* Start Banner Section */}
      <Section>
        <Banner
          bgUrl={ctaBgSvg}
          imgUrl={bannerImgPng}
          title="Emergency Aid Made Easy for Parents"
          subTitle="Equipping parents with essential skills for child emergency response, ensuring confident and effective action in critical situations."
        />
      </Section>
      {/* End Banner Section */}
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
