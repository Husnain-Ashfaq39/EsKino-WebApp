import React, { useState, useEffect } from "react";
import { Table, Modal } from "antd";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import { Link, useLocation } from "react-router-dom";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { getAllDocuments, deleteDocument } from "../../../services/dbService"; // Import the Firestore service to fetch documents
import {
  imagesend,
  plusicon,
  refreshicon,
  searchnormal,
} from "../../imagepath";
import { onShowSizeChange, itemRender } from "../../Pagination";
import { toast, ToastContainer } from "react-toastify";

const CCBody = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const updateSuccess = sessionStorage.getItem("updateCCBodySuccess");
    const addSuccess = sessionStorage.getItem("addCCBodySuccess");
    if (updateSuccess) {
      toast.success("Document updated successfully!", { autoClose: 2000 });
      sessionStorage.removeItem("updateCCBodySuccess"); // Clear the flag after showing the toast
    }
    if (addSuccess) {
      toast.success("Document Added successfully!", { autoClose: 2000 });
      sessionStorage.removeItem("addCCBodySuccess"); // Clear the flag after showing the toast
    }
    fetchData();
  }, [location]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getAllDocuments("CourseContentBody"); // Fetch documents from Firestore collection
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDataSource(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const onSelectChange = (selectedRowKeys) => {
    // Not needed for delete operation
  };

  const columns = [
    {
      title: "S/N",
      dataIndex: "serialNumber",
      key: "serialNumber",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Image",
      dataIndex: "CCImage",
      key: "image",
      render: (text) => (
        <img
          src={text}
          alt="Image"
          className="image-column"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "CCTitle",
      key: "title",
      render: (text) => (
        <div className={text && text.length > 20 ? "multiline-text" : ""}>
          {text}
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "CCDescription",
      key: "description",
      render: (text) => (
        <div className={text && text.length > 20 ? "multiline-text" : ""}>
          {text}
        </div>
      ),
    },
    {
      title: "Quote",
      dataIndex: "CCQuote",
      key: "quote",
      render: (text) => (
        <div className={text && text.length > 20 ? "multiline-text" : ""}>
          {text}
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "actions",
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
                className="dropdown-item"
                to={`/landingpage/coursecontentbody/editcoursecontentbody/${record.id}`}
              >
                <i className="far fa-edit me-2" />
                Edit
              </Link>
              <Link
                className="dropdown-item"
                to="#"
                onClick={() => showDeleteModal(record.id)}
              >
                <i className="fa fa-trash-alt m-r-5"></i> Delete
              </Link>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleRefresh = () => {
    fetchData(); // Refresh data from Firebase
  };

  const showDeleteModal = (id) => {
    setSelectedRecordId(id);
    setDeleteModalVisible(true);
  };

  const hideDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  const handleDelete = async () => {
    try {
      await deleteDocument("CourseContentBody", selectedRecordId);

      fetchData(); // Refresh data after deletion
      setSelectedRecordId(null);
      hideDeleteModal();
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <>
      <Header />
      <Sidebar
        id="menu-item4"
        id1="menu-items4"
        activeClassName="appoinment-list"
      />
      <>
        <div className="page-wrapper">
          <div className="content">
            {/* Page Navbar*/}
            <div className="settings-menu-links">
              <ul className="nav nav-tabs menu-tabs">
                <li className="nav-item ">
                  <Link
                    className="nav-link"
                    to="/landingpage/coursecontentheading"
                  >
                    Course Content Heading
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link
                    className="nav-link"
                    to="/landingpage/coursecontentbody"
                  >
                    Course Content Body
                  </Link>
                </li>
              </ul>
            </div>

            {/* Page Header */}
            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="#">Landing Page</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <i className="feather-chevron-right">
                        <FeatherIcon icon="chevron-right" />
                      </i>
                    </li>
                    <li className="breadcrumb-item active">
                      Child Emergency Body
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            <div className="row">
              <div className="col-sm-12">
                <div className="card card-table show-entire">
                  <div className="card-body">
                    {/* Table Header */}
                    <div className="page-table-header mb-2">
                      <div className="row align-items-center">
                        <div className="col">
                          <div className="doctor-table-blk">
                            <h3>Course Content Section</h3>
                            <div className="doctor-search-blk">
                              <div className="add-group">
                                <Link
                                  to="/landingpage/coursecontentbody/addcoursecontentbody"
                                  className="btn btn-primary add-pluss ms-2"
                                >
                                  <img src={plusicon} alt="#" />
                                </Link>
                                <Link
                                  to="#"
                                  className="btn btn-primary doctor-refresh ms-2"
                                  onClick={handleRefresh}
                                >
                                  <img src={refreshicon} alt="#" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Table Header */}
                    <div className="table-responsive doctor-list">
                      <Table
                        loading={loading}
                        pagination={{
                          total: dataSource.length,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          onShowSizeChange: onShowSizeChange,
                          itemRender: itemRender,
                        }}
                        columns={columns}
                        dataSource={dataSource}
                        rowKey={(record) => record.id}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      <Modal
        title="Delete Content"
        visible={deleteModalVisible}
        onOk={handleDelete}
        onCancel={hideDeleteModal}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete the selected content?</p>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default CCBody;
