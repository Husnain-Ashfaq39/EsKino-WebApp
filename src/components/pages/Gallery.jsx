import React, { useState, useEffect } from "react";
import Section from "../Section";
import GallerySectionStyle2 from "../GallerySection/GallerySectionStyle2";
import { pageTitle } from "../../helpers/PageTitle";
import { getAllDocuments } from "../../services/dbService"; // Import Firestore service
import { Button, Row, Col } from "antd";
import SectionHeading from "../SectionHeading";
import Spacing from "../Spacing";


export default function Gallery() {
  const [galleryData, setGalleryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("All");

  useEffect(() => {
    pageTitle("Gallery");
    fetchGalleryData();
  }, []);

  const fetchGalleryData = async () => {
    setLoading(true);
    try {
      const data = [];
      const querySnapshot = await getAllDocuments("gallery");
      querySnapshot.forEach((doc) => {
        data.push({ imgUrl: doc.data().url, category: doc.data().category });
      });
      setGalleryData(data);
      setFilteredData(data); // Initially show all data
    } catch (error) {
      console.error("Error fetching gallery data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    if (filter === "All") {
      setFilteredData(galleryData);
    } else {
      setFilteredData(galleryData.filter((item) => item.category === filter));
    }
  };

  return (
    <>
      <Section
        topMd={170}
        topLg={150}
        topXl={110}
        bottomMd={200}
        bottomLg={150}
        bottomXl={110}
      >
              <SectionHeading title={"Our Events"} center />
              <Spacing md="72" lg="50" />

        <Row justify="center" gutter={[16, 16]} style={{ marginBottom: "20px" }}>
          <Col>
            <Button type={selectedFilter === "All" ? "primary" : "default"} onClick={() => handleFilterChange("All")}>
              All
            </Button>
          </Col>
          <Col>
            <Button type={selectedFilter === "Events" ? "primary" : "default"} onClick={() => handleFilterChange("Events")}>
              Events
            </Button>
          </Col>
          <Col>
            <Button type={selectedFilter === "Our Team" ? "primary" : "default"} onClick={() => handleFilterChange("Our Team")}>
              Our Team
            </Button>
          </Col>
          <Col>
            <Button type={selectedFilter === "Function" ? "primary" : "default"} onClick={() => handleFilterChange("Function")}>
              Function
            </Button>
          </Col>
        </Row>
        {loading ? (
          <p>Loading...</p> // You can replace this with a loader component
        ) : (
          <GallerySectionStyle2 data={filteredData} />
        )}
      </Section>
    </>
  );
}
