/* eslint-disable no-unused-vars */
import React,{ useState } from 'react'
import { Table } from "antd";
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import { blogimg10, imagesend, pdficon, pdficon3, pdficon4, plusicon, refreshicon, searchnormal, blogimg12,
     blogimg2, blogimg4, blogimg6, blogimg8,
     backgroundImg} from '../../imagepath';
import {onShowSizeChange,itemRender}from  '../../Pagination'
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';


const HeroSection = () => {

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
            background: backgroundImg,
            logo: blogimg2,
            title: "This is a title",
            subtitle: "This is a subtitle sdfsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
            
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
      title: "Background",
      dataIndex: "background",
      key: "background",
      render: (text, record) => (
          <div style={{ width: "100px", height: "50px", overflow: "hidden", borderRadius: "8px" }}>
              <img
                  src={record.background}
                  alt="Background"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
          </div>
      )
  },
    {
        title: "Logo",
        dataIndex: "logo",
        key: "logo",
        render: (text, record) => (
            <img
                src={record.logo}
                alt="Logo"
                style={{ width: 50, height: 50 }}
            />
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
                    <Link className="dropdown-item" to="/editherosection">
                      <i className="far fa-edit me-2" />
                      Edit
                    </Link>
                    <Link className="dropdown-item" to="#" data-bs-toggle="modal" data-bs-target="#delete_patient">
                    <i className="fa fa-trash-alt m-r-5"></i> Delete</Link>
                  </div>
                </div>
              </div>
            </>
          ),
        },

    ]


  return (
    <>
    <Header />
    <Sidebar id='menu-item4' id1='menu-items4' activeClassName='heroSection'/>
    <>
  <div className="page-wrapper">
    <div className="content">
      {/* Page Header */}
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
               <Link to="#">Appoinment</Link>
              </li>
              <li className="breadcrumb-item">
                <i className="feather-chevron-right">
                  <FeatherIcon icon="chevron-right"/>
                </i>
              </li>
              <li className="breadcrumb-item active">Appoinment  List</li>
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
                      <h3>Hero Section</h3>
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
                          <Link to="/addappoinments"
                            className="btn btn-primary add-pluss ms-2"
                          >
                            <img src={plusicon}alt="#" />
                          </Link>
                         <Link
                            to="#"
                            className="btn btn-primary doctor-refresh ms-2"
                          >
                            <img src={refreshicon}alt="#" />
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

export default HeroSection;

