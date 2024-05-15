/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Table, Modal } from "antd";
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { imagesend, plusicon, refreshicon, searchnormal } from '../../imagepath';
import { onShowSizeChange, itemRender } from '../../Pagination';
import { getAllDocuments, deleteDocument } from '../../../services/dbService'; // Import the Firestore service to fetch documents
import { toast, ToastContainer } from 'react-toastify';

const CCHeading = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    useEffect(() => {
        const updateSuccessStatus = sessionStorage.getItem('updateCCHeadingSuccess');
        if (updateSuccessStatus) {
            toast.success("Course Content Heading Updated Successfully!", { autoClose: 2000 });
            sessionStorage.removeItem("updateCCHeadingSuccess");
        }

        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const querySnapshot = await getAllDocuments('CourseContentHeading'); // Fetch documents from Firestore collection
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setDataSource(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const columns = [
        {
            title: "S/N",
            dataIndex: "serialNumber",
            key: "serialNumber",
            render: (text, record, index) => index + 1
        },
        {
            title: "Image",
            dataIndex: "CCHeadImage",
            key: "image",
            render: (text, record) => (
                <div style={{ width: "100px", height: "50px", overflow: "hidden", borderRadius: "8px" }}>
                    <img
                        src={record.CCHeadImage}
                        alt="Image"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                </div>
            )
        },
        {
            title: "Title",
            dataIndex: "CCHeadTitle",
            key: "title",
            render: (text) => <div className={text.length > 20 ? "multiline-text" : ""}>{text}</div>
        },
        {
            title: "Subtitle",
            dataIndex: "CCHeadSubtitle",
            key: "subtitle",
            render: (text) => <div className={text.length > 20 ? "multiline-text" : ""}>{text}</div>
        },
        {
            title: "Description",
            dataIndex: "CCHeadDescription",
            key: "description",
            render: (text) => <div className={text.length > 20 ? "multiline-text" : ""}>{text}</div>
        },
        {
            title: "",
            dataIndex: "actions",
            render: (text, record) => (
                <>
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
                                <Link className="dropdown-item" to={`/landingpage/coursecontentheading/editcoursecontentheading/${record.id}`}>
                                    <i className="far fa-edit me-2" />
                                    Edit
                                </Link>
                                {/* <Link className="dropdown-item" to="#" onClick={() => showDeleteModal(record.id)}>
                                    <i className="fa fa-trash-alt m-r-5"></i> Delete
                                </Link> */}
                            </div>
                        </div>
                    </div>
                </>
            ),
        },
    ];

    const handleRefresh = () => {
        fetchData(); // Refresh data from Firebase
    };

    const showDeleteModal = () => {
        setDeleteModalVisible(true);
    };

    const hideDeleteModal = () => {
        setDeleteModalVisible(false);
    };

    const handleDelete = async () => {
        try {
            await Promise.all(selectedRowKeys.map(id => deleteDocument('CourseContentHeading', id)));
            fetchData(); // Refresh data after deletion
            setSelectedRowKeys([]);
            hideDeleteModal();
        } catch (error) {
            console.error('Error deleting documents:', error);
        }
    };

    return (
        <>
            <Header />
            <Sidebar id='menu-item4' id1='menu-items4' activeClassName='appoinment-list' />
            <>
                <div className="page-wrapper">
                    <div className="content">
                        {/* Page Navbar*/}
                        <div className="settings-menu-links">
                            <ul className="nav nav-tabs menu-tabs">
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/landingpage/coursecontentheading">
                                        Course Content Heading
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/landingpage/coursecontentbody">
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
                                        <li className="breadcrumb-item active">
                                            <Link to="/landingpage/coursecontentheading">Landing Page</Link>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <i className="feather-chevron-right">
                                                <FeatherIcon icon="chevron-right" />
                                            </i>
                                        </li>
                                        <li className="breadcrumb-item">Course Content Heading</li>
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
                                                        <h3>Course Content Heading</h3>
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
                                                    onShowSizeChange: onShowSizeChange,
                                                    itemRender: itemRender,
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
    )
}

export default CCHeading;
