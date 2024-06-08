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
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryUpdate = async (id, newName) => {
    const oldName = categories.find(category => category.id === id).name;
    try {
      setLoading(true);
      await updateDocument("categories", id, { name: newName });
      const itemsSnapshot = await fetchDocumentsWithQuery("gallery", "category", oldName);
      const updatePromises = itemsSnapshot.docs.map((itemDoc) =>
        updateDocument("gallery", itemDoc.id, { category: newName })
      );
      await Promise.all(updatePromises);
      message.success("Category updated successfully");
      fetchCategories();
    } catch (error) {
      console.error("Error updating category:", error);
      message.error("Failed to update category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Sidebar
        id="menu-item7"
        id1="menu-items7"
        activeClassName="editcategories"
      />
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/gallerylist">Gallery</Link>
                  </li>
                  <li className="breadcrumb-item  active">
                    <i className="feather-chevron-right">
                      <FeatherIcon icon="chevron-right" />
                    </i>
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
                    dataSource={categories}
                    renderItem={(item) => (
                      <List.Item>
                        <Input
                          defaultValue={item.name}
                          onBlur={(e) => handleCategoryUpdate(item.id, e.target.value)}
                        />
                      </List.Item>
                    )}
                  />
                  <Button
                    type="primary"
                    onClick={() => navigate("/gallerylist", { state: { from: "edit-categories" } })}
                    style={{ marginTop: "20px" }}
                    className="btn btn-primary"
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
