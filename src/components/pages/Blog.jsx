import React, { useEffect, useState } from 'react';
import BannerSectionStyle9 from '../Section/BannerSection/BannerSectionStyle9';
import Section from '../Section';
import BlogSectionStyle2 from '../Section/BlogSection/BlogSectionStyle2';
import Breadcrumb from '../Breadcrumb';
import { pageTitle } from '../../helpers/PageTitle';
import { getAllDocuments } from '../../services/dbService';
import { Timestamp } from 'firebase/firestore';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Blog_client_side() {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    pageTitle('Blog');
    const fetchData = async () => {
      try {
        const snapshot = await getAllDocuments('blogs');
        const blogDataArray = snapshot.docs.map((doc) => {
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

          return {
            id: doc.id,
            title: data.title,
            thumbUrl: data.imageUrl,
            date: publicationDate,
            btnText: 'Learn More',
            href: `/blog/blog-details/${doc.id}`, // Make sure the URL includes the blog ID
            socialShare: true,
          };
        });

        setBlogData(blogDataArray);
      } catch (error) {
        console.error('Error fetching blog data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Section topMd={170} bottomMd={96} bottomLg={70}>
        <Breadcrumb title="" />
      </Section>
      <Section bottomMd={200} bottomLg={150} bottomXl={110}>
        {loading ? (
          <div>
            <Skeleton height={30} width={300} />
            <Skeleton count={5} />
          </div>
        ) : (
          <BlogSectionStyle2 data={blogData} />
        )}
      </Section>
      <Section className="cs_footer_margin_0">
        <BannerSectionStyle9
          title="Don’t Let Your Child's Health <br />Take a Backseat!"
          subTitle="Attend our training session with one of our experienced <br />medical professionals today!"
          imgUrl="/images/doctors/banner_img_3.png"
        />
      </Section>
    </>
  );
}
