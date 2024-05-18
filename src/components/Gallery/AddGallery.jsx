/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { Button, Select, message } from "antd";
import FeatherIcon from "feather-icons-react";
import { uploadFile } from "../../services/storageService";
import { addDocument } from "../../services/dbService";
import { useEffect } from "react";
import { getCurrentUser } from "../../services/authService";
const AddGallery = () => {
  const [fileList, setFileList] = useState([]);
  const [category, setCategory] = useState("Events");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!getCurrentUser()) {
      navigate('/login');
    }


  }, [])


  const handleFileChange = (event) => {
    const files = event.target.files;
    setFileList([...fileList, ...files]);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    setUploading(true);

    const promises = Array.from(fileList).map((file) => {
      return new Promise((resolve, reject) => {
        uploadFile(file, `images/${file.name}`)
          .then((url) => {
            addDocument("gallery", {
              url,
              category,
              timestamp: new Date(),
            })
              .then(() => resolve())
              .catch((err) => reject(err));
          })
          .catch((err) => reject(err));
      });
    });

    Promise.all(promises)
      .then(() => {
        message.success("All images have been uploaded successfully");
        setFileList([]);
        setUploading(false);
      })
      .catch((error) => {
        message.error("Upload failed: " + error.message);
        setUploading(false);
      });
  };

  return (
    <div>
      <Header />
      <Sidebar id="menu-item7" id1="menu-items7" activeClassName="addgallery" />
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/gallerylist">Gallery</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <i className="feather-chevron-right">
                      <FeatherIcon icon="chevron-right" />
                    </i>
                  </li>
                  <li className="breadcrumb-item active">Add Image</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleUpload}>
                    <div className="row">
                      <div className="col-12">
                        <div className="form-heading">
                          <h4>Add Gallery</h4>
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <div
                            className={
                              fileList.length > 0
                                ? "upload-files-avator"
                                : "upload-files-avator settings-btn"
                            }
                            style={{ position: "relative" }}
                          >
                            {fileList.length > 0 && (
                              <div className="uploaded-image">
                                <img
                                  src={URL.createObjectURL(fileList[0])}
                                  alt="Uploaded"
                                  style={{
                                    width: "180px",
                                    height: "180px",
                                    objectFit: "cover",
                                  }}
                                />
                                <div
                                  className="edit-icon"
                                  style={{
                                    position: "absolute",
                                    backgroundColor: "white",
                                    left: 170,
                                    top: 160,
                                  }}
                                >
                                  <input
                                    type="file"
                                    accept="image/*"
                                    id="file"
                                    onChange={handleFileChange}
                                    className="hide-input"
                                    style={{ display: "none" }}
                                  />
                                  <label
                                    htmlFor="file"
                                    className="upload"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <FeatherIcon icon="edit" />
                                  </label>
                                </div>
                              </div>
                            )}
                            {fileList.length === 0 && (
                              <div>
                                <input
                                  type="file"
                                  accept="image/*"
                                  id="file"
                                  onChange={handleFileChange}
                                  className="hide-input"
                                  multiple
                                />
                                <label
                                  htmlFor="file"
                                  className="upload"
                                  style={{
                                    cursor: "pointer",
                                    marginLeft: "-15px",
                                  }}
                                >
                                  Choose Files
                                </label>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label style={{ marginTop: "-10px" }}>
                            Category <span className="login-danger">*</span>
                          </label>
                          <Select
                            defaultValue="Events"
                            style={{ width: "100%" }}
                            onChange={handleCategoryChange}
                          >
                            <Select.Option value="Events">Events</Select.Option>
                            <Select.Option value="Our Team">
                              Our Team
                            </Select.Option>
                            <Select.Option value="Function">
                              Function
                            </Select.Option>
                          </Select>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="doctor-submit text-end">
                          <Button
                            style={{ marginRight: "10px", padding: "3px" }}
                            className="btn btn-primary"
                            type="primary"
                            htmlType="submit"
                            disabled={fileList.length === 0 || uploading}
                            loading={uploading}
                          >
                            {uploading ? "Uploading..." : "Start Upload"}
                          </Button>
                          <Button
                            type="button"
                            className="btn cancel-form"
                            onClick={() => {
                              navigate("/gallerylist");
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGallery;
