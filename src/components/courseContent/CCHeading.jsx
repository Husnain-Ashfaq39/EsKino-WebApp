/* eslint-disable no-unused-vars */
import React,{ useState } from 'react'
import { Table } from "antd";
import Header from '../Header';
import Sidebar from '../Sidebar';
import { blogimg10, imagesend, pdficon, pdficon3, pdficon4, plusicon, refreshicon, searchnormal, blogimg12,
     blogimg2, blogimg4, blogimg6, blogimg8,
     backgroundImg} from '../imagepath';
import {onShowSizeChange,itemRender}from  '../Pagination'
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import CCNavBar from './CCNavbar';


const CCHeading = () => {

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = (newSelectedRowKeys) => {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
      };

    const datasource = [
        {
            id:"1",
            image: backgroundImg,
            title: "This is a title",
            subtitle: "This is a Subtitle",
            description: "THis is a Description"
        },
    ]


    const columns = [
        {
            title: "S/N",
            dataIndex: "serialNumber",
            key: "serialNumber",
            render: (text, record, index) => index + 1
        },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (text, record) => (
                <div style={{ width: "100px", height: "50px", overflow: "hidden", borderRadius: "8px" }}>
                    <img
                        src={record.image}
                        alt="Image"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                </div>
            )
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            render: (text) => <div className={text.length > 20 ? "multiline-text" : ""}>{text}</div>
        },
        {
            title: "Subtitle",
            dataIndex: "subtitle",
            key: "subtitle",
            render: (text) => <div className={text.length > 20 ? "multiline-text" : ""}>{text}</div>
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            render: (text) => <div className={text.length > 20 ? "multiline-text" : ""}>{text}</div>
        },
        {
            title: "",
            dataIndex: "FIELD8",
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
                                <Link className="dropdown-item" to="/landingpage/coursecontentheading/editcoursecontentheading">
                                    <i className="far fa-edit me-2" />
                                    Edit
                                </Link>
                                <Link className="dropdown-item" to="#" data-bs-toggle="modal" data-bs-target="#delete_patient">
                                    <i className="fa fa-trash-alt m-r-5"></i> Delete
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            ),
        },
    ];
    

  return (
    <>
    <Header />
    <Sidebar id='menu-item4' id1='menu-items4' activeClassName='appoinment-list'/>
    <>
  <div className="page-wrapper">
    <div className="content">

  {/* /Page Navbar*/}
  <div className="settings-menu-links">
    <ul className="nav nav-tabs menu-tabs">
      
      <li className="nav-item active">
        <Link className="nav-link" to="/landingpage/coursecontentheading">
          Course Content Heading 
        </Link>
      </li>
      <li className="nav-item ">
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
              <li className="breadcrumb-item">
               <Link to="/landingpage/coursecontentheading">Landing Page</Link>
              </li>
              <li className="breadcrumb-item">
                <i className="feather-chevron-right">
                  <FeatherIcon icon="chevron-right"/>
                </i>
              </li>
              <li className="breadcrumb-item active">Course Content Heading</li>
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
                      <div className="doctor-search-blk">
                       
                       
                      </div>
                    </div>
                  </div>
               
                </div>
              </div>
              {/* /Table Header */}
              <div className="table-responsive doctor-list">
              <Table
                        pagination={{
                          total: datasource.length,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          //showSizeChanger: true,
                          onShowSizeChange: onShowSizeChange,
                          itemRender: itemRender,
                        }}
                        columns={columns}
                        dataSource={datasource}

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
  <div id="delete_patient" className="modal fade delete-modal" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-body text-center">
          <img src={imagesend}alt="#" width={50} height={46} />
          <h3>Are you sure want to delete this ?</h3>
          <div className="m-t-20">
            {" "}
           <Link to="#" className="btn btn-white me-2" data-bs-dismiss="modal">
              Close
            </Link>
            <button type="submit" className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <div id="delete_patient" className="modal fade delete-modal" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-body text-center">
          <img src={imagesend}alt="#" width={50} height={46} />
          <h3>Are you sure want to delete this ?</h3>
          <div className="m-t-20">
            {" "}
           <Link to="#" className="btn btn-white me-2" data-bs-dismiss="modal">
              Close
            </Link>
            <button type="submit" className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>

</>


    <>

</>

</>

  )
}

export default CCHeading;

