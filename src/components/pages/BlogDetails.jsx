import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Section from '../Section';
import { Icon } from '@iconify/react';
import Spacing from '../Spacing';
import AuthorWidget from '../Widget/AuthorWidget';
import { pageTitle } from '../../helpers/PageTitle';
import { getDocument, updateDocument, getAllDocuments } from '../../services/dbService';
import { Timestamp } from 'firebase/firestore';
import { blogimg2 } from '../imagepath';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    instagram: "",
    youtube: "",
    twitter: "",
    linkedin: ""
  });

  useEffect(() => {
    const fetchBlogDetails = async () => {
      const doc = await getDocument('blogs', id);
      if (doc.exists()) {
        const data = doc.data();
        let publicationDate;
        if (data.publicationDate instanceof Timestamp) {
          publicationDate = data.publicationDate.toDate().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        } else if (data.publicationDate.seconds && data.publicationDate.nanoseconds) {
          const timestamp = new Timestamp(data.publicationDate.seconds, data.publicationDate.nanoseconds);
          publicationDate = timestamp.toDate().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        } else {
          publicationDate = new Date(data.publicationDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        }
        setBlog({
          ...data,
          publicationDate,
        });
        // Increment the views count
        const updatedViews = (data.views || 0) + 1;
        await updateDocument('blogs', id, { views: updatedViews });
      }
    };

    const fetchSocialLinks = async () => {
      const colSnap = await getAllDocuments("socialLinks");
      if (!colSnap.empty) {
        const docSnap = colSnap.docs[0]; // Get the first document
        setSocialLinks({
          linkedin: docSnap.data().linkedin,
          facebook: docSnap.data().facebook,
          youtube: docSnap.data().youtube,
          instagram: docSnap.data().instagram,
          twitter: docSnap.data().twitter
        });
      } else {
        // console.log("No documents found in the socialLinks collection!");
      }
    };

    fetchBlogDetails();
    fetchSocialLinks();
    pageTitle('Blog Details');
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Section topMd={170} bottomMd={54} bottomLg={54}>
       
      </Section>
      <div className="container">
        <div className="cs_blog_details_info">
          <div className="cs_blog_details_info_left">
            <div className="cs_blog_details_date">
              {blog.publicationDate} | {blog.author}
            </div>
          </div>
          <div className="cs_social_links_wrap">
            <h2>Share:</h2>
            <div className="cs_social_links">
              {socialLinks.facebook && (
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                  <Icon icon="fa-brands:facebook-f" />
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
              {socialLinks.youtube && (
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer">
                  <Icon icon="fa-brands:youtube" />
                </a>
              )}
            </div>
          </div>
        </div>
        <Spacing md="55" />
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-100 cs_radius_20"
        />
        <Spacing md="90" lg="50" />
        <div className="row">
          <div className="col-lg-8">
            <div className="cs_blog_details">
              <h2 className='font-light'>{blog.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              {/* Other blog details can be rendered here */}
            </div>
            <Spacing md="85" />
            <AuthorWidget
              imgUrl={blogimg2}
              name={blog.author}
              description=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
