import React, { useState, useEffect } from 'react';
import { Table, Modal,Button } from 'antd';
import { Link } from 'react-router-dom';
import { addDocument, getAllDocuments, deleteDocument } from '../../../services/dbService';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import { blogimg10, imagesend, plusicon, refreshicon, searchnormal } from '../../imagepath';
import { onShowSizeChange, itemRender } from '../../Pagination';

const CEBody = () => {
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
            const snapshot = await getAllDocuments('ChildEmergencyBody');
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setDataSource(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteDocument('ChildEmergencyBody', deleteItemId);
            setDataSource(dataSource.filter(item => item.id !== deleteItemId));
            setDeleteModalVisible(false);
            setDeleteItemId(null);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleCancelDelete = () => {
        setDeleteModalVisible(false);
        setDeleteItemId(null);
    };

    const onSelectChange = (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys);
    };

    const columns = [
        {
            title: 'S/N',
            dataIndex: 'serialNumber',
            key: 'serialNumber',
            render: (text, record, index) => index + 1
        },
        {
            title: 'Title',
            dataIndex: 'CEBodyTitle',
            key: 'CEBodyTitle'
        },
        {
            title: 'Subtitle',
            dataIndex: 'CEBodySubtitle',
            key: 'CEBodySubtitle'
        },
        {
            title: 'Description',
            dataIndex: 'CEBodyDescription',
            key: 'CEBodyDescription'
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
                          <Link to={`/landingpage/childemergencybody/editchildemergencybody/${record.id}`} className="dropdown-item">
                              <i className="far fa-edit me-2" />
                              Edit
                          </Link>
                          <Button className="dropdown-item" onClick={() => {
                              setDeleteItemId(record.id);
                              setDeleteModalVisible(true);
                          }}>
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
            <Sidebar id='menu-item4' id1='menu-items4' activeClassName='appoinment-list' />
            <div className="page-wrapper">
                <div className="content">
                    <div className="settings-menu-links">
                        <ul className="nav nav-tabs menu-tabs">
                            <li className="nav-item ">
                                <Link className="nav-link" to="/landingpage/childemergencyheader">
                                    Child Emergency Heading
                                </Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" to="/landingpage/childemergencybody">
                                    Child Emergency Body
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="#">Landing Page</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <FeatherIcon icon="chevron-right" />
                                    </li>
                                    <li className="breadcrumb-item active">Child Emergency Body</li>
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
                                                    <h3>Child Emergency Body</h3>
                                                    <div className="doctor-search-blk">
                                                        <div className="top-nav-search table-search-blk">
                                                            <form>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Search here"
                                                                />
                                                                <Link className="btn">
                                                                    <img
                                                                        src={searchnormal}
                                                                        alt="#"
                                                                    />
                                                                </Link>
                                                            </form>
                                                        </div>
                                                        <div className="add-group">
                                                            <Link to="/landingpage/childemergencybody/addchildemergencybody" className="btn btn-primary add-pluss ms-2">
                                                                <img src={plusicon} alt="#" />
                                                            </Link>
                                                            <button className="btn btn-primary doctor-refresh ms-2" onClick={fetchData}>
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
                                            pagination={{
                                                total: dataSource.length,
                                                showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                                onShowSizeChange: onShowSizeChange,
                                                itemRender: itemRender,
                                            }}
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
                        <button className="btn btn-white me-2" onClick={handleCancelDelete}>Cancel</button>
                        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default CEBody;
