/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Table, Modal } from 'antd';
import { plusicon, refreshicon, searchnormal } from '../../imagepath';
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { getAllDocuments, deleteDocument } from "../../../services/dbService"; // Assuming dbService provides methods to interact with Firebase
import { toast, ToastContainer } from 'react-toastify';

const HeroSection = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);

    useEffect(() => {
        const updateSuccessStatus = sessionStorage.getItem('updateHeroSuccess');
        if (updateSuccessStatus) {
            toast.success("Hero Section Updated Successfully!", { autoClose: 2000 });
            sessionStorage.removeItem("updateHeroSuccess");
        }

        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = [];
            const querySnapshot = await getAllDocuments('HeroSection');
            querySnapshot.forEach((doc) => {
                data.push({ id: doc.id, ...doc.data() });
            });
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

    const handleDelete = async () => {
        if (deleteItemId) {
            try {
                await deleteDocument('HeroSection', deleteItemId);
                setModalVisible(false);
                setDeleteItemId(null);
                setSelectedRowKeys([]);
                fetchData();
            } catch (error) {
                console.error('Error deleting document:', error);
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
            title: 'S/N',
            dataIndex: 'serialNumber',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Background',
            dataIndex: 'heroBackground',
            render: (text, record) => (
                <img
                    src={text}
                    alt="Image"
                    className="image-column"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
            ),
        },
        {
            title: 'Logo',
            dataIndex: 'heroLogo',
            render: (text, record) => (
                <img
                    src={text}
                    alt="Image"
                    className="image-column"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
            ),
        },
        {
            title: 'Title',
            dataIndex: 'heroTitle',
            key: 'title',
            render: (text) => <div className={text.length > 20 ? 'multiline-text' : ''}>{text}</div>,
        },
        {
            title: 'Subtitle',
            dataIndex: 'heroSubtitle',
            key: 'subtitle',
            render: (text) => <div className={text.length > 20 ? 'multiline-text' : ''}>{text}</div>,
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
                            <Link to={`/landingpage/editHeroSection/${record.id}`} className="dropdown-item">
                                <i className="far fa-edit me-2" />
                                Edit
                            </Link>
                            {/* <Button className="dropdown-item" onClick={() => {
                                setDeleteItemId(record.id);
                                setModalVisible(true);
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
            <Sidebar id="menu-item4" id1="menu-items4" activeClassName="heroSection" />
            <div className="page-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/landingpage/herosection">Landing Page</Link>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        <i className="feather-chevron-right">
                                            <FeatherIcon icon="chevron-right" />
                                        </i>
                                    </li>
                                    <li className="breadcrumb-item">Hero Section</li>
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
                                                    <h3>Hero Section</h3>
                                                    <div className="doctor-search-blk">
                                                        <div className="top-nav-search table-search-blk">
                                                            <form>
                                                                <input type="text" className="form-control" placeholder="Search here" />
                                                                <Link className="btn">
                                                                    <img src={searchnormal} alt="#" />
                                                                </Link>
                                                            </form>
                                                        </div>
                                                        <div className="add-group">
                                                            <Link to="/addAppointment" className="btn btn-primary add-pluss ms-2">
                                                                <img src={plusicon} alt="#" />
                                                            </Link>
                                                            <Link to="#" className="btn btn-primary doctor-refresh ms-2">
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
                                            pagination={{
                                                total: dataSource.length,
                                                showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
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

export default HeroSection;
