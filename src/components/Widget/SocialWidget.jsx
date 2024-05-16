import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import { getAllDocuments } from '../../services/dbService';

export default function SocialWidget() {
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    instagram: "",
    youtube: "",
    twitter: "",
    linkedin: ""
  });

  const fetchSocialLinks = async () => {
    const colSnap = await getAllDocuments("socialLinks");

    if (!colSnap.empty) {
      const docSnap = colSnap.docs[0]; // Get the first document
      return {
        linkedin: docSnap.data().linkedin,
        facebook: docSnap.data().facebook,
        youtube: docSnap.data().youtube,
        instagram: docSnap.data().instagram,
        twitter: docSnap.data().twitter
      };
    } else {
      console.log("No documents found in the socialLinks collection!");
      return {
        facebook: "",
        instagram: "",
        youtube: "",
        twitter: "",
        linkedin: ""
      };
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSocialLinks();
      setSocialLinks(data);
    };

    fetchData();
  }, []);

  return (
    <div className="cs_social_links_wrap">
      <h2>Follow Us</h2>
      <div className="cs_social_links">
        {socialLinks.facebook && (
          <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
            <Icon icon="fa-brands:facebook-f" />
          </a>
        )}
        {socialLinks.youtube && (
          <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer">
            <Icon icon="fa-brands:youtube" />
          </a>
        )}
        {socialLinks.linkedin && (
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
            <Icon icon="fa-brands:linkedin-in" />
          </a>
        )}
        {socialLinks.twitter && (
          <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
            <Icon icon="fa-brands:twitter" />
          </a>
        )}
        {socialLinks.instagram && (
          <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
            <Icon icon="fa-brands:instagram" />
          </a>
        )}
      </div>
    </div>
  );
}
