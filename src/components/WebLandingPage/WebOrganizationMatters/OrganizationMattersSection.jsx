import React from "react";
import SectionHeading from "../../SectionHeading";
import Spacing from "../../Spacing";
import OrganizationMatter from "./OrganizationMatter";
import { useQuery } from "@tanstack/react-query";
import { getAllDocuments } from "../../../services/dbService";
import { useState } from "react";

export default function OrganizationMattersSection({
  sectionTitle,
  sectionSubtile,
  data,
}) {
  const [OMBodyDataKey, setOMBodyDataKey] = useState([]);

  const {
    data: OMBodyData,
    isLoading: OMBodyLoading,
    error: OMBodyError,
  } = useQuery({
    queryKey: ["OrganizationMattersBody: ", OMBodyDataKey],
    queryFn: () =>
      getAllDocuments("OrganizationMattersBody").then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          OMBodyTitle: doc.data().OMBodyTitle,
          OMBodyDescription: doc.data().OMBodyDescription,
          numOrder: doc.data().numOrder, // Make sure to extract numOrder
        }));

        // Sort data by numOrder in ascending order
        data.sort((a, b) => a.numOrder - b.numOrder); // Added sorting logic based on numOrder

        setOMBodyDataKey(data);
        return data;
      }),
  });

  return (
    <div className="cs_shape_wrap">
      <div className="cs_shape_1" />
      <div className="container">
        <SectionHeading title={sectionTitle} subTitle={sectionSubtile} center />
        <Spacing md="72" lg="50" />
        <div className="cs_random_features">
          {OMBodyData?.map((item, index) => (
            <div className="cs_random_features_col" key={index}>
              <OrganizationMatter
                title={item.OMBodyTitle}
                subTitle={item.OMBodyDescription}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
