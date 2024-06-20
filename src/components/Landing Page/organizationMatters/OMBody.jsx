import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Spin } from "antd";
import { Link } from "react-router-dom";
import { deleteDocument, getAllDocuments } from "../../../services/dbService";
import FeatherIcon from "feather-icons-react";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import {
  plusicon,
  refreshicon,
  searchnormal,
  imagesend,
} from "../../imagepath";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OMBody = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const updateSuccessStatus = sessionStorage.getItem("updateOMBodySuccess");
    if (updateSuccessStatus) {
      toast.success("Organization Matters Body Updated Successfully!", {
        autoClose: 2000,
      });
      sessionStorage.removeItem("updateOMBodySuccess");
    }

    const addSuccessStatus = sessionStorage.getItem("addOMBodySuccess");
    if (addSuccessStatus) {
      toast.success("Organization Matters Body Added Successfully!", {
        autoClose: 2000,
      });
      sessionStorage.removeItem("addOMBodySuccess");
    }

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getAllDocuments("OrganizationMattersBody"); // Fetch documents from Firestore collection
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

// Sort data by numOrder in ascending order
data.sort((a, b) => a.numOrder - b.numOrder); // Added code to sort data by numOrder


      setDataSource(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteDocument("OrganizationMattersBody", deleteItemId);
      setDataSource(dataSource.filter((item) => item.id !== deleteItemId));
      setDeleteModalVisible(false);
      setDeleteItemId(null);
      toast.success("Item deleted successfully!", { autoClose: 2000 });
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Error deleting item: " + error.message, { autoClose: 2000 });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
    setDeleteItemId(null);
  };

  const columns = [
    {
      title: "S/N",
      dataIndex: "serialNumber",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Title",
      dataIndex: "OMBodyTitle",
      key: "title",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Description",
      dataIndex: "OMBodyDescription",
      key: "description",
      render: (text) => (
        <div className={text.length > 20 ? "multiline-text" : ""}>{text}</div>
      ),
    },
    {
      title: "",
      dataIndex: "id",
      render: (text, record) => (
        <div className="text-end">
          <div className="dropdown dropdown-action">
            <Link
              to="#"
              className="action-icon dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-ellipsis-v" />
            </Link>
            <div className="dropdown-menu dropdown-menu-end">
              <Link
                to={`/landingpage/organizationmattersbody/editorganizationmattersbody/${record.id}`}
                className="dropdown-item"
              >
                <i className="far fa-edit me-2" />
                Edit
              </Link>
              <Button
                className="dropdown-item"
                onClick={() => {
                  setDeleteItemId(record.id);
                  setDeleteModalVisible(true);
                }}
              >
                <i className="fa fa-trash-alt m-r-5" /> Delete
              </Button>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <Header />
      <Sidebar
        id="menu-item4"
        id1="menu-items4"
        activeClassName="appoinment-list"
      />
      <div className="page-wrapper">
        <div className="content">
          <div className="settings-menu-links">
            <ul className="nav nav-tabs menu-tabs">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/landingpage/organizationmattersheading"
                >
                  Organization Matters Heading
                </Link>
              </li>
              <li className="nav-item active">
                <Link
                  className="nav-link"
                  to="/landingpage/organizationmattersbody"
                >
                  Organization Matters Body
                </Link>
              </li>
            </ul>
          </div>
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/landingpage/organizationmattersbody">
                      Landing Page
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <i className="feather-chevron-right">
                      <FeatherIcon icon="chevron-right" />
                    </i>
                  </li>
                  <li className="breadcrumb-item active">
                    Organization Matters Body
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="card card-table show-entire">
                <div className="card-body">
                  <div className="page-table-header mb-2">
                    <div className="row align-items-center">
                      <div className="col">
                        <div className="doctor-table-blk">
                          <h3>Organization Matters Body</h3>
                          <div className="doctor-search-blk">
                            <div className="add-group">
                              <Link
                                to="/landingpage/organizationmattersbody/addorganizationmattersbody"
                                className="btn btn-primary add-pluss ms-2"
                              >
                                <img src={plusicon} alt="#" />
                              </Link>
                              <Link
                                to="#"
                                className="btn btn-primary doctor-refresh ms-2"
                                onClick={fetchData}
                              >
                                <img src={refreshicon} alt="#" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive doctor-list">
                    <Table
                      loading={loading}
                      pagination={{
                        total: dataSource.length,
                        showTotal: (total, range) =>
                          `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                      }}
                      columns={columns}
                      dataSource={dataSource}
                      rowSelection={{
                        selectedRowKeys,
                        onChange: onSelectChange,
                      }}
                      rowKey={(record) => record.id}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        visible={deleteModalVisible}
        onCancel={handleCancelDelete}
        footer={null}
        centered
        maskClosable={false}
      >
        <Spin spinning={isDeleting}>
          <div className="modal-body text-center">
            <img src={imagesend} alt="#" width={50} height={46} />
            <h3>Are you sure you want to delete this item?</h3>
            <div className="m-t-20">
              <button className="btn btn-white me-2" onClick={handleCancelDelete}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </Spin>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default OMBody;
