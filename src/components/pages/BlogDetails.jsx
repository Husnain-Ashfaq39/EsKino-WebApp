import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Section from '../Section';
import Breadcrumb from '../Breadcrumb';
import { Icon } from '@iconify/react';
import Spacing from '../Spacing';
import AuthorWidget from '../Widget/AuthorWidget';
import { pageTitle } from '../../helpers/PageTitle';
import { getDocument,updateDocument } from '../../services/dbService';
import { Timestamp } from 'firebase/firestore';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
console.log("here is the id "+id);
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

    fetchBlogDetails();
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
              <Link to="/">
                <Icon icon="fa-brands:facebook-f" />
              </Link>
              <Link to="/">
                <Icon icon="fa-brands:linkedin-in" />
              </Link>
              <Link to="/">
                <Icon icon="fa-brands:twitter" />
              </Link>
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
              <h2>{blog.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              {/* Other blog details can be rendered here */}
            </div>
            <Spacing md="85" />
            <AuthorWidget
              imgUrl="/images/blog/author.png"
              name={blog.author}
              description=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
