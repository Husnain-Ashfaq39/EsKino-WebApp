/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Table, Modal } from "antd";
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { getAllDocuments, addDocument, deleteDocument } from '../../../services/dbService'; // Ensure addDocument is imported
import { toast, ToastContainer } from 'react-toastify';

const CEHeader = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    useEffect(() => {
        const updateSuccessStatus = sessionStorage.getItem('updateCEHeaderSuccess');
        if (updateSuccessStatus) {
            toast.success("Child Emergency Header Updated Successfully!", { autoClose: 2000 });
            sessionStorage.removeItem("updateCEHeaderSuccess");
        }

        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const querySnapshot = await getAllDocuments('ChildEmergencyHeader');
            if (querySnapshot.empty) {
                // If no documents exist, add a dummy document
                await addDummyData();
                // Fetch the data again after adding the dummy document
                await fetchData();
                return;
            }
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setDataSource(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const addDummyData = async () => {
        const dummyData = {
            CEHeadTitle: "Dummy Title"
        };
        try {
            await addDocument('ChildEmergencyHeader', dummyData);
            console.log("Dummy data added successfully.");
        } catch (error) {
            console.error("Error adding dummy data:", error);
        }
    };

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleDelete = async () => {
        try {
            await Promise.all(selectedRowKeys.map(id => deleteDocument('ChildEmergencyHeader', id)));
            setDeleteModalVisible(false);
            setSelectedRowKeys([]);
            fetchData(); // Refresh data after deletion
        } catch (error) {
            console.error('Error deleting documents:', error);
        }
    };

    const handleCancel = () => {
        setDeleteModalVisible(false);
    };

    const columns = [
        {
            title: 'S/N',
            dataIndex: 'serialNumber',
            render: (text, record, index) => index + 1
        },
        {
            title: 'Title',
            dataIndex: 'CEHeadTitle',
            key: 'title',
            render: (text) => <div className={text.length > 20 ? 'multiline-text' : ''}>{text}</div>
        },
        {
            title: '',
            dataIndex: 'id',
            render: (text, record) => (
                <div className="text-end">
                    <div className="dropdown dropdown-action">
                        <Link to="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fas fa-ellipsis-v" />
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end">
                            <Link to={`/landingpage/editchildemergencyheader/${record.id}`} className="dropdown-item">
                                <i className="far fa-edit me-2" />
                                Edit
                            </Link>
                            <button
                                className="dropdown-item"
                                onClick={() => {
                                    setDeleteModalVisible(true);
                                    setSelectedRowKeys([record.id]);
                                }}
                            >
                                <i className="fa fa-trash-alt m-r-5" /> Delete
                            </button>
                        </div>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <>
            <Header />
            <Sidebar id="menu-item4" id1="menu-items4" activeClassName="childEmergency" />
            <div className="page-wrapper">
                <div className="content">
                    {/* Page Navbar*/}
                    <div className="settings-menu-links">
                        <ul className="nav nav-tabs menu-tabs">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/landingpage/childemergencyheader">
                                    Child Emergency Heading
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/landingpage/childemergencybody">
                                    Child Emergency Body
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
                                        <Link to="/landingpage/childemergencyheader">Landing Page</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <i className="feather-chevron-right">
                                            <FeatherIcon icon="chevron-right" />
                                        </i>
                                    </li>
                                    <li className="breadcrumb-item active">Child Emergency Heading</li>
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
                                                    <h3>Child Emergency Heading</h3>
                                                    <div className="doctor-search-blk"></div>
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
                visible={deleteModalVisible}
                onOk={handleDelete}
                onCancel={handleCancel}
                okText="Delete"
                cancelText="Cancel"
            >
                <p>Are you sure you want to delete the selected item(s)?</p>
            </Modal>
            <ToastContainer />
        </>
    );
};

export default CEHeader;
