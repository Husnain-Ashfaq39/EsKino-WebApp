import React, { useState, useEffect } from "react";
import { Table, Modal, Button } from "antd";
import { Link } from "react-router-dom";
import { getAllDocuments, getDocumentByField, addDocument, deleteDocument, updateDocument } from "../../../../services/dbService"; // Ensure all necessary functions are imported
import FeatherIcon from "feather-icons-react";
import Header from "../../../Header";
import Sidebar from "../../../Sidebar";
import { toast, ToastContainer } from "react-toastify";
import { getCurrentUser } from "../../../../services/authService";
import { useNavigate } from "react-router-dom";
import { imagesend, plusicon, refreshicon } from "../../../imagepath";
import "react-toastify/dist/ReactToastify.css";

const Aktuell2 = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
   

    // Add toast
    const addSuccessStatus = sessionStorage.getItem("addAktuell2");
    if (addSuccessStatus) {
      toast.success("Aktuell Data added Successfully!", { autoClose: 2000 });
      sessionStorage.removeItem("addAktuell2");
    }

    // Update toast
    const updateSuccessStatus = sessionStorage.getItem("updateAktuell2");
    if (updateSuccessStatus) {
      toast.success("Aktuell Data Updated Successfully!", { autoClose: 2000 });
      sessionStorage.removeItem("updateAktuell2");
    }

    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true); // Ensure loading state is set
    try {
      const data = [];
      const documentSnapshot = await getDocumentByField('Doctors', 'doctorID', 2);
      if (documentSnapshot) {
        const documentData = documentSnapshot.data();
        data.push(...documentData.aktuell.map((point, index) => ({ id: index, point })));
        setDataSource(data);
      } else {
        // If no document with doctorID 2 exists, add a dummy document
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
      doctorID: 2,
      name: "Dummy Name",
      occupation: "Dummy Occupation",
      image: "Dummy Image",
      introduction: ["Dummy Introduction 1", "Dummy Introduction 2"],
      zusatzqualifikationen: ["Dummy Qualification"],
      aktuell: ["Dummy Aktuell 1", "Dummy Aktuell 2"]
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
        const updatedDocument = await getDocumentByField('Doctors', 'doctorID', 2);
        if (updatedDocument.exists()) {
          const documentData = updatedDocument.data();
          const updatedAktuell = documentData.aktuell.filter((_, index) => index !== deleteItemId);
          await updateDocument('Doctors', updatedDocument.id, { ...documentData, aktuell: updatedAktuell });
          setDataSource(updatedAktuell.map((point, index) => ({ id: index, point })));
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
                to={`/doctors/aktuell2/editaktuell2/${record.id}`}
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
        activeClassName="aktuell2"
      />
      <div className="page-wrapper">
        <div className="content">
          <div className="settings-menu-links">
            <ul className="nav nav-tabs menu-tabs">
              <li className="nav-item ">
                <Link className="nav-link" to="/doctors/headerandpicture2">
                  Name, Occupation & Picture 
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/doctors/introduction2">
                  Introduction
                </Link>
              </li>
              <li className="nav-item ">
                <Link className="nav-link" to="/doctors/zusatzqualifikationen2">
                  Zusatzqualifikationen
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/doctors/aktuell2">
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
                    <Link to="/doctors/headerandpicture2">Doctor 2</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    <i className="feather-chevron-right">
                      <FeatherIcon icon="chevron-right" />
                    </i>
                  </li>
                  <li className="breadcrumb-item">Aktuell</li>
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
                          <h3 className="p-2">Aktuell</h3>
                          <div className="doctor-search-blk">
                            <div className="top-nav-search table-search-blk"></div>
                            <div className="add-group">
                              <Link
                                to="/doctors/aktuell2/addaktuell2"
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
      >
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
      </Modal>
      <ToastContainer />
    </>
  );
};

export default Aktuell2;
