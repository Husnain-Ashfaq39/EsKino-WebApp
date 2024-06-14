import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getAllDocuments } from '../../services/dbService'; // Adjust the import path as needed

const Post = ({ title, thumbUrl, date, btnText, href, socialShare, variant }) => {
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    instagram: '',
    linkedin: '',
    twitter: '',
    youtube: ''
  });

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const colSnap = await getAllDocuments('socialLinks');
        if (!colSnap.empty) {
          const docSnap = colSnap.docs[0]; // Get the first document
          setSocialLinks(docSnap.data());
        } else {
          console.log('No documents found in the socialLinks collection!');
        }
      } catch (error) {
        console.error('Error fetching social links:', error);
      }
    };

    fetchSocialLinks();
  }, []);

  return (
    <PostContainer className={`cs_post cs_style_1 ${variant}`}>
      <PostThumbnail to={href} className="cs_post_thumb cs_view_mouse">
        <img src={thumbUrl} alt={title} />
      </PostThumbnail>
      <PostInfo className="cs_post_info">
        <div>
          <PostMeta className="cs_post_meta">
            <div className="cs_posted_by">{date}</div>
            {socialShare && (
              <PostSocial className="cs_post_social">
                {socialLinks.linkedin && (
                  <SocialLink href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="cs_center rounded-circle">
                    <Icon icon="fa-brands:linkedin-in" />
                  </SocialLink>
                )}
                {socialLinks.facebook && (
                  <SocialLink href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="cs_center rounded-circle">
                    <Icon icon="fa-brands:facebook-f" />
                  </SocialLink>
                )}
                {socialLinks.twitter && (
                  <SocialLink href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="cs_center rounded-circle">
                    <Icon icon="fa-brands:twitter" />
                  </SocialLink>
                )}
                {socialLinks.instagram && (
                  <SocialLink href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="cs_center rounded-circle">
                    <Icon icon="fa-brands:instagram" />
                  </SocialLink>
                )}
                {socialLinks.youtube && (
                  <SocialLink href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="cs_center rounded-circle">
                    <Icon icon="fa-brands:youtube" />
                  </SocialLink>
                )}
              </PostSocial>
            )}
          </PostMeta>
          <PostTitle className="cs_post_title cs_semibold cs_fs_32" style={{fontWeight:"300"}}>
            <Link to={href}>{title}</Link>
          </PostTitle>
        </div>
        {btnText && (
          <PostButtonContainer className="cs_heading_color cs_medium">
            <Link to={href} className="cs_post_btn">
              {btnText}
            </Link>
          </PostButtonContainer>
        )}
      </PostInfo>
    </PostContainer>
  );
};

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%; /* Ensure the card takes the full height */
`;

const PostThumbnail = styled(Link)`
  width: 100%;
  height: 300px; /* Adjust height as needed */
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center; /* Center the image within the container */
  }
`;

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostSocial = styled.div`
  display: flex;
  gap: 8px;
`;

const SocialLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #f0f0f0;
`;

const PostTitle = styled.h2`
  margin: 16px 0;
`;

const PostButtonContainer = styled.div`
  margin-top: 16px;
`;

export default Post;
