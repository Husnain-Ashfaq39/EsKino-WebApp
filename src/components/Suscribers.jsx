import React, { useEffect, useState } from "react";
import { Table, Button, Checkbox, Modal } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

const SubscriberList = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubscriber, setSelectedSubscriber] = useState({});
  const [selectedSubscribers, setSelectedSubscribers] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!getCurrentUser()) {
      navigate('/login');
    }
    const fetchSubscribers = async () => {
      const subscribersRef = collection(db, "subscribers");
      const snapshot = await getDocs(subscribersRef);
      const subscriberData = snapshot.docs.map((doc) => ({
        id: doc.id,
        email: doc.data().email,
      }));
      setSubscribers(subscriberData);
    };

    fetchSubscribers();
  }, []);

  const showModal = (subscriber) => {
    setSelectedSubscriber(subscriber);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleReply = () => {
    const mailtoLink = `mailto:${selectedSubscriber.email}?subject=Eskino&body=Dear Eskino subscriber,%0D%0A%0D%0A`;
    window.location.href = mailtoLink;
    handleOk();
  };

  const handleReplyAll = () => {
    const emailList = selectedSubscribers
      .map((id) => subscribers.find((subscriber) => subscriber.id === id).email)
      .join(",");
    const mailtoLink = `mailto:${emailList}?subject=Eskino&body=Dear Eskino subscriber,%0D%0A%0D%0A`;
    window.location.href = mailtoLink;
  };

  const handleCheckboxChange = (id, checked) => {
    setSelectedSubscribers((prev) =>
      checked
        ? [...prev, id]
        : prev.filter((subscriberId) => subscriberId !== id)
    );
  };

  const handleDeleteSelected = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    const promises = selectedSubscribers.map((id) =>
      deleteDoc(doc(db, "subscribers", id))
    );
    await Promise.all(promises);
    setSubscribers(
      subscribers.filter(
        (subscriber) => !selectedSubscribers.includes(subscriber.id)
      )
    );
    setSelectedSubscribers([]);
    setIsDeleteModalOpen(false);
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const columns = [
    {
      title: (
        <Checkbox
          onChange={(e) => {
            const checked = e.target.checked;
            const allIds = subscribers.map((subscriber) => subscriber.id);
            setSelectedSubscribers(checked ? allIds : []);
          }}
          checked={selectedSubscribers.length === subscribers.length}
        />
      ),
      dataIndex: "checkbox",
      render: (_, record) => (
        <Checkbox
          onChange={(e) => handleCheckboxChange(record.id, e.target.checked)}
          checked={selectedSubscribers.includes(record.id)}
        />
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <Button
          className="btn btn-primary"
          onClick={() => showModal(record)}
          icon={<MailOutlined />}
        >
          Reply
        </Button>
      ),
    },
  ];

  return (
    <>
      <Header />
      <Sidebar id="menu-item1" activeClassName="subscriber-list" />
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h2 className="cs_section_title cs_fs_32 m-0 text-2xl font-semibold mb-2">
                  Subscriber List
                </h2>
                {selectedSubscribers.length > 0 && (
                  <>
                    <Button
                      type="danger"
                      style={{
                        marginLeft: "20px",
                        backgroundColor: "#E70226",
                        color: "white",
                      }}
                      onClick={handleDeleteSelected}
                    >
                      Delete
                    </Button>
                    <Button
                      type="primary"
                      style={{ marginLeft: "20px" }}
                      onClick={handleReplyAll}
                      icon={<MailOutlined />}
                    >
                      Reply All
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                <div className="table-responsive">
                  <Table
                    columns={columns}
                    dataSource={subscribers}
                    rowKey="id"
                  /></div>
                  {isModalOpen && (
                    <Modal
                      title="Reply to Subscriber"
                      visible={isModalOpen}
                      onCancel={handleCancel}
                      footer={[
                        <Button key="back" onClick={handleCancel}>
                          Close
                        </Button>,
                        <Button
                          key="submit"
                          type="primary"
                          onClick={handleReply}
                          icon={<MailOutlined />}
                        >
                          Reply
                        </Button>,
                      ]}
                    >
                      <p>Email: {selectedSubscriber.email}</p>
                      <p>Body: Dear subscriber</p>
                    </Modal>
                  )}
                  <div
                    className={
                      isDeleteModalOpen
                        ? "modal fade show delete-modal"
                        : "modal fade delete-modal"
                    }
                    style={{
                      display: isDeleteModalOpen ? "block" : "none",
                      backgroundColor: "rgba(0,0,0,0.5)",
                    }}
                    role="dialog"
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-body text-center">
                          <h3>
                            Are you sure you want to delete the selected
                            subscribers?
                          </h3>
                          <div className="m-t-20">
                            <Button
                              onClick={cancelDelete}
                              className="btn btn-white me-2"
                            >
                              Close
                            </Button>
                            <Button
                              type="button"
                              className="btn btn-danger"
                              onClick={confirmDelete}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriberList;
