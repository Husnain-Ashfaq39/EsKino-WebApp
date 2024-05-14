import React, { useState } from 'react';
import SectionHeading from '../../SectionHeading';
import Spacing from '../../Spacing';
import IconBoxStyle3 from '../../IconBox/IconBoxStyle3';
import { useQuery } from '@tanstack/react-query';
import { getAllDocuments } from '../../../services/dbService';

export default function WebCourseContent({
  sectionTitle,
  sectionTitleUp,
  sectionTitleDown,
  sectionSubTitle,
  data,
}) {

    // Course Content Body useQuery
    const [CCBodyDataKey, setCCBodyDataKey] = useState([]);

    const { data: CCBodyData, isLoading: CCBodyLoading, error: CCBodyError } = useQuery({
      queryKey: ["CourseContentBodyKey:", ...CCBodyDataKey], // Concatenating with a string
      queryFn: () => getAllDocuments("CourseContentBody").then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          CCTitle: doc.data().CCTitle,
          CCDescription: doc.data().CCDescription,
          CCQuote: doc.data().CCQuote,
          CCImage: doc.data().CCImage
        }));
  
        console.log(data);
        setCCBodyDataKey(data);
        return data;
      }),
    });
  

  return (
    <div className="cs_shape_wrap">
      <div className="cs_shape_1 cs_position_2" />
      <div className="container">
        <SectionHeading
          title={sectionTitle}
          titleUp={sectionTitleUp}
          titleDown={sectionTitleDown}
          subTitle={sectionSubTitle}
          center
        />
        <Spacing md="105" lg="50" />
        <div className="cs_iconbox_3_wrap">
  {CCBodyData?.map((item, index) => (
    <IconBoxStyle3 key={index} item={item} index={index+1} />
  ))}
</div>

      </div>
    </div>
  );
}
