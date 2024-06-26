import { Button, Modal, Table } from "antd";
import FeatherIcon from "feather-icons-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addDocument, getDocumentByField, updateDocument } from "../../../../services/dbService"; // Ensure all necessary functions are imported
import Header from "../../../Header";
import { imagesend, plusicon, refreshicon } from "../../../imagepath";
import Sidebar from "../../../Sidebar";

const Introduction1 = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    

    // add toast
    const addSuccessStatus = sessionStorage.getItem("addIntroduction1");
    if (addSuccessStatus) {
      toast.success("Introduction Data add Successfully!", { autoClose: 2000 });
      sessionStorage.removeItem("addIntroduction1");
    }

    // Update toast
    const updateSuccessStatus = sessionStorage.getItem("updateIntroduction1");
    if (updateSuccessStatus) {
      toast.success("Introduction Data Updated Successfully!", { autoClose: 2000 });
      sessionStorage.removeItem("updateIntroduction1");
    }

    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true); // Ensure loading state is set
    try {
      const data = [];
      const documentSnapshot = await getDocumentByField('Doctors', 'doctorID', 1);
      if (documentSnapshot) {
        const documentData = documentSnapshot.data();
        data.push(...documentData.introduction.map((point, index) => ({ id: index, point })));
        setDataSource(data);
      } else {
        // If no document with doctorID 1 exists, add a dummy document
        await addDummyData();
        // Fetch the data again after adding the dummy document
        await fetchData();
        return;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  const addDummyData = async () => {
    const dummyData = {
      doctorID: 1,
      name: "Dummy Name",
      occupation: "Dummy Occupation",
      image: "Dummy Image",
      introduction: ["Dummy Introduction 1", "Dummy Introduction 2"],
      zusatzqualifikationen: ["Dummy Qualification"],
      aktuell: ["Dummy Aktuell"]
    };
    try {
      await addDocument("Doctors", dummyData);
      console.log("Dummy data added successfully.");
    } catch (error) {
      console.error("Error adding dummy data:", error);
    }
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleDelete = async () => {
    if (deleteItemId !== null) {
      try {
        const updatedDocument = await getDocumentByField('Doctors', 'doctorID', 1);
        if (updatedDocument.exists()) {
          const documentData = updatedDocument.data();
          const updatedIntroduction = documentData.introduction.filter((_, index) => index !== deleteItemId);
          await updateDocument('Doctors', updatedDocument.id, { ...documentData, introduction: updatedIntroduction });
          setDataSource(updatedIntroduction.map((point, index) => ({ id: index, point })));
          toast.success("Point deleted successfully!", { autoClose: 2000 });
        }
        setDeleteModalVisible(false);
        setDeleteItemId(null);
      } catch (error) {
        console.error("Error deleting item:", error);
        toast.error("Error deleting item: " + error.message, { autoClose: 2000 });
      }
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
    setDeleteItemId(null);
  };

  const columns = [
    {
      title: "Points",
      dataIndex: "point",
      key: "point",
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
                to={`/doctors/introduction1/editintroduction1/${record.id}`}
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
       id="doctorCard"
       id1="doctorCards"
       activeClassName="doctor1"

      />
      <div className="page-wrapper">
        <div className="content">
          <div className="settings-menu-links">
            <ul className="nav nav-tabs menu-tabs">
              <li className="nav-item ">
                <Link className="nav-link" to="/doctors/headerandpicture1">
                  Name, Occupation & Picture 
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/doctors/introduction1">
                  Introduction
                </Link>
              </li>
              <li className="nav-item ">
                <Link className="nav-link" to="/doctors/zusatzqualifikationen1">
                  Zusatzqualifikationen
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/doctors/aktuell1">
                  Aktuell
                </Link>
              </li>
            </ul>
          </div>
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/doctors/headerandpicture1">Doctor 1</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    <i className="feather-chevron-right">
                      <FeatherIcon icon="chevron-right" />
                    </i>
                  </li>
                  <li className="breadcrumb-item">Introduction</li>
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
                          <h3 className="p-2">Introduction</h3>
                          <div className="doctor-search-blk">
                            <div className="top-nav-search table-search-blk"></div>
                            <div className="add-group">
                              <Link
                                to="/doctors/introduction1/addintroduction1"
                                className="btn btn-primary add-pluss ms-2"
                              >
                                <img src={plusicon} alt="#" />
                              </Link>
                              <button
                                className="btn btn-primary doctor-refresh ms-2"
                                onClick={fetchData}
                              >
                                <img src={refreshicon} alt="#" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive doctor-list">
                    <Table
                      pagination={false}
                      columns={columns}
                      dataSource={dataSource}
                      rowSelection={{
                        selectedRowKeys,
                        onChange: onSelectChange,
                      }}
                      loading={loading}
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
        closable={false}

      >
        <div className="modal-body text-center">
          {/* <img src={imagesend} alt="#" width={50} height={46} /> */}
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
      </Modal>
      <ToastContainer />
    </>
  );
};

export default Introduction1;
