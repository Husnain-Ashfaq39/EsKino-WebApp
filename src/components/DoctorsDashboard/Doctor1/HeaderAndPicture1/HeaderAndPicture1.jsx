import React, { useState, useEffect } from "react";
import { Table, Modal } from "antd";
import Header from "../../../Header";
import Sidebar from "../../../Sidebar";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { getAllDocuments, addDocument, deleteDocument } from "../../../../services/dbService"; // Ensure addDocument is imported
import { toast, ToastContainer } from "react-toastify";
import { getCurrentUser } from "../../../../services/authService";
import { useNavigate } from "react-router-dom";


const HeaderandPicture1 = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    
    const updateSuccessStatus = sessionStorage.getItem("updateHeaderAndPicture1 ");
    if (updateSuccessStatus) {
      toast.success("Doctor Data Updated Successfully!", { autoClose: 2000 });
      sessionStorage.removeItem("updateHeaderAndPicture1 ");
    }

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = [];
      const querySnapshot = await getAllDocuments("Doctors");
      let doctorExists = false;
      querySnapshot.forEach((doc) => {
        if (doc.data().doctorID === 1) {
          data.push({ id: doc.id, ...doc.data() });
          doctorExists = true;
        }
      });
      if (!doctorExists) {
        // If no document with doctorID 1 exists, add a dummy document
        await addDummyData();
        // Fetch the data again after adding the dummy document
        await fetchData();
        return;
      }
      setDataSource(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const addDummyData = async () => {
    const dummyData = {
      doctorID: 1,
      name: "Dummy Name",
      occupation: "Dummy Occupation",
      image: "Dummy Image",
      introduction: ["Dummy Introduction"],
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
    if (deleteItemId) {
      try {
        await deleteDocument("Doctors", deleteItemId);
        setModalVisible(false);
        setDeleteItemId(null);
        setSelectedRowKeys([]);
        fetchData();
      } catch (error) {
        console.error("Error deleting document:", error);
      }
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setDeleteItemId(null);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <div className={text.length > 20 ? "multiline-text" : ""}>{text}</div>
      ),
    },
    {
      title: "Occupation",
      dataIndex: "occupation",
      key: "occupation",
      render: (text) => (
        <div className={text.length > 20 ? "multiline-text" : ""}>{text}</div>
      ),
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (text, record) => (
        <img
          src={text}
          alt="Image"
          className="image-column"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
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
                to={`/doctors/headerandpicture1/editheaderandpicture1/${record.id}`}
                className="dropdown-item"
              >
                <i className="far fa-edit me-2" />
                Edit
              </Link>
              {/* <button
                className="dropdown-item"
                onClick={() => {
                  setDeleteItemId(record.id);
                  setModalVisible(true);
                }}
              >
                <i className="fa fa-trash-alt m-r-5" /> Delete
              </button> */}
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
        activeClassName="headerandpicture1"
      />
      <div className="page-wrapper">
        <div className="content">
              {/* Page Navbar*/}
              <div className="settings-menu-links">
                        <ul className="nav nav-tabs menu-tabs">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/doctors/headerandpicture1">
                                    Name, Occupation & Picture 
                                </Link>
                            </li>
                            <li className="nav-item">
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
                                <Link className="nav-link" to="/doctors/Aktuell1">
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
                  <li className="breadcrumb-item">Header and Picture</li>
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
                          <h3 className="p-2">Header and Picture</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive doctor-list">
                    <Table
                      pagination={{
                        total: dataSource.length,
                        showTotal: (total, range) =>
                          `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                      }}
                      columns={columns}
                      dataSource={dataSource}
                      rowSelection={rowSelection}
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
        title="Confirm Delete"
        visible={modalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure want to delete this?</p>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default HeaderandPicture1;
