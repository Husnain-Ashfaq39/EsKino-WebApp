import React from 'react';
import BannerSectionStyle5 from '../Section/BannerSection/BannerSectionStyle5';
import ContactForm from '../ContactForm';
import Section from '../Section';
import ContactInfoSection from '../Section/ContactInfoSection';
import { pageTitle } from '../../helpers/PageTitle';
import { bannerBgSvg, bannerImgPng, contactUs } from '../imagepath';

export default function Contact() {
  pageTitle('Contact');
  return (
    <>
      <BannerSectionStyle5
        bgUrl={bannerBgSvg}
        imgUrl={contactUs}
        title="Contact Us"
        subTitle="Kindly reach us to get the fastest response and help"
      />
      <div className="container cs_mt_minus_110">
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <ContactForm />
          </div>
        </div>
      </div>
      <Section
        topMd={200}
        topLg={150}
        topXl={100}
        bottomMd={200}
        bottomLg={150}
        bottomXl={110}
      >
        <ContactInfoSection sectionTitle="Find Us Here" />
      </Section>
    </>
  );
}
