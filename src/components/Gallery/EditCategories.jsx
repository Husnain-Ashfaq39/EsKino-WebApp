import React, { useState, useEffect } from "react";
import { Button, Input, List, message } from "antd";
import { getAllDocuments, updateDocument, fetchDocumentsWithQuery } from "../../services/dbService";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Link from "antd/es/typography/Link";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";

const EditCategories = () => {
  const [categories, setCategories] = useState([]);
  const [updatedCategories, setUpdatedCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = [];
      const querySnapshot = await getAllDocuments("categories");
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setCategories(data);
      setUpdatedCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (id, newName) => {
    setUpdatedCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === id ? { ...category, name: newName } : category
      )
    );
  };

  const handleSubmitChanges = async () => {
    setLoading(true);
    try {
      const updatePromises = updatedCategories.map((category) =>
        handleCategoryUpdate(category.id, category.name)
      );
      await Promise.all(updatePromises);
      message.success("Categories updated successfully");
      navigate("/gallerylist", { state: { from: "edit-categories" } });
    } catch (error) {
      console.error("Error updating categories:", error);
      message.error("Failed to update categories");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryUpdate = async (id, newName) => {
    const oldName = categories.find(category => category.id === id).name;
    try {
      await updateDocument("categories", id, { name: newName });
      const itemsSnapshot = await fetchDocumentsWithQuery("gallery", "category", oldName);
      const updatePromises = itemsSnapshot.docs.map((itemDoc) =>
        updateDocument("gallery", itemDoc.id, { category: newName })
      );
      await Promise.all(updatePromises);
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  };

  return (
    <>
      <Header />
      <Sidebar id="menu-item7" id1="menu-items7" activeClassName="editcategories" />
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/gallerylist">Gallery</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    <FeatherIcon icon="chevron-right" />
                  </li>
                  <li className="breadcrumb-item">Edit Categories</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <h2>Edit Categories</h2>
                  <List
                    bordered
                    dataSource={updatedCategories}
                    renderItem={(item) => (
                      <List.Item>
                        <Input
                          defaultValue={item.name}
                          onBlur={(e) => handleCategoryChange(item.id, e.target.value)}
                        />
                      </List.Item>
                    )}
                  />
                  <Button
                    type="primary"
                    onClick={handleSubmitChanges}
                    style={{ marginTop: "20px" }}
                    className="btn btn-primary"
                    loading={loading}
                  >
                    Submit Changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCategories;
