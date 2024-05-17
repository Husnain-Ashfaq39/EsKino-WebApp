import React from "react";
import Post from "../../Post";
import Spacing from "../../Spacing";
import { Link } from "react-router-dom";

export default function BlogSectionStyle2({ data }) {
  return (
    <div className="container">
      <div className="row cs_row_gap_50">
        {data?.map((item, index) => (
          <div className="col-xl-4 col-md-6" key={index}>
            <Link to={`/blog/blog-details/${item.id}`}>
              <Post {...item} />
            </Link>
          </div>
        ))}
      </div>
      <Spacing md="110" lg="70" />
    </div>
  );
}
