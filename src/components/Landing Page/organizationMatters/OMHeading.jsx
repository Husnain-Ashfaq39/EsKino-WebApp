/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Table, Modal, Button } from 'antd';
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { getAllDocuments, deleteDocument } from '../../../services/dbService'; // Import the Firestore service to fetch documents

const OMHeading = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const querySnapshot = await getAllDocuments('OrganizationMattersHeading'); // Fetch documents from Firestore collection
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

    const handleDelete = async () => {
        try {
            await Promise.all(selectedRowKeys.map(id => deleteDocument('OrganizationMattersHeading', id)));
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
            dataIndex: 'OMHeadTitle',
            key: 'title',
            render: (text) => <div >{text}</div>
        },
        {
            title: 'Description',
            dataIndex: 'OMHeadDescription',
            key: 'description',
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
                            <Link to={`/landingpage/organizationmattersheading/editorganizationmattersheading/${record.id}`} className="dropdown-item">
                                <i className="far fa-edit me-2" />
                                Edit
                            </Link>
                            {/* <Button className="dropdown-item" onClick={() => {
                                setDeleteItemId(record.id);
                                setDeleteModalVisible(true);
                            }}>
                                <i className="fa fa-trash-alt m-r-5" /> Delete
                            </Button> */}
                        </div>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <>
            <Header />
            <Sidebar id="menu-item4" id1="menu-items4" activeClassName="appoinment-list" />
            <div className="page-wrapper">
                <div className="content">
                    {/* Page Navbar*/}
                    <div className="settings-menu-links">
                        <ul className="nav nav-tabs menu-tabs">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/landingpage/organizationmattersheading">
                                    Organization Matters Heading
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/landingpage/organizationmattersbody">
                                    Organization Matters Body
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
                                        <Link to="/landingpage/organizationmattersheading">Landing Page</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <i className="feather-chevron-right">
                                            <FeatherIcon icon="chevron-right" />
                                        </i>
                                    </li>
                                    <li className="breadcrumb-item active">Organization Matters Heading</li>
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
                                                    <h3>Organization Matters Heading</h3>
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
                                                // showSizeChanger: true,
                                                // onShowSizeChange: onShowSizeChange,
                                                // itemRender: itemRender,
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
        </>
    );
};

export default OMHeading;
