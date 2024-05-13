import React, { useState } from "react";
import { Modal, Button, Upload, Select, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Header from "../Header";
import Sidebar from "../Sidebar";

import {
  uploadImageToStorage,
  addImageToGallery,
  uploadFile,
} from "../../services/storageService";
import { addDocument } from "../../services/dbService";

const AddGallery = () => {
  const [fileList, setFileList] = useState([]);
  const [category, setCategory] = useState("All");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (info) => {
    // Update the state with the new file list.
    setFileList(info.fileList);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleUpload = async () => {
    setUploading(true);
    const promises = fileList.map((file) => {
      return new Promise((resolve, reject) => {
        uploadFile(file.originFileObj, `/image/${file.name}`)
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
    <>
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-6">
                      <Upload
                        fileList={fileList}
                        beforeUpload={() => false}
                        onChange={handleFileChange}
                        multiple
                        onRemove={() => false} // Optional, to prevent removing files
                      >
                        <Button icon={<UploadOutlined />}>Select Photos</Button>
                      </Upload>
                    </div>
                    <div className="col-lg-6">
                      <Select
                        defaultValue="Events"
                        style={{ width: 120 }}
                        onChange={handleCategoryChange}
                      >
                        <Select.Option value="Events">Events</Select.Option>
                        <Select.Option value="Our Team">Our Team</Select.Option>
                        <Select.Option value="Function">Function</Select.Option>
                      </Select>
                    </div>
                  </div>
                  <Button
                    type="primary"
                    onClick={handleUpload}
                    disabled={fileList.length === 0 || uploading}
                    loading={uploading}
                    style={{ marginTop: 16 }}
                  >
                    {uploading ? "Uploading..." : "Start Upload"}
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

export default AddGallery;
