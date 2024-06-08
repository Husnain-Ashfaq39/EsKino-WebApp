import React, { useState, useEffect } from "react";
import Section from "../Section";
import GallerySectionStyle2 from "../GallerySection/GallerySectionStyle2";
import { getAllDocuments } from "../../services/dbService";
import { Button, Row, Col } from "antd";
import SectionHeading from "../SectionHeading";
import Spacing from "../Spacing";

export default function Gallery() {
  const [galleryData, setGalleryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchGalleryData();
    fetchCategories();
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
      setFilteredData(data);
    } catch (error) {
      console.error("Error fetching gallery data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = [];
      const querySnapshot = await getAllDocuments("categories");
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
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

        <Row
          justify="center"
          gutter={[16, 16]}
          style={{ marginBottom: "20px" }}
        >
          <Col>
            <Button
              type={selectedFilter === "All" ? "primary" : "default"}
              onClick={() => handleFilterChange("All")}
            >
              All
            </Button>
          </Col>
          {categories.map((category) => (
            <Col key={category.id}>
              <Button
                type={selectedFilter === category.name ? "primary" : "default"}
                onClick={() => handleFilterChange(category.name)}
              >
                {category.name}
              </Button>
            </Col>
          ))}
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
