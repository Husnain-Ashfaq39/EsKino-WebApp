import { Button, Modal, Table, Select, Checkbox } from "antd";
import { MailOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"; // Import deleteDoc
import { db } from "../../config/firebase";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { Background } from "react-parallax";

const { Option } = Select;

const Contactlist = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState({});
  const [filter, setFilter] = useState("all");
  const [selectedContacts, setSelectedContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const contactsRef = collection(db, "contacts");
      const snapshot = await getDocs(contactsRef);
      const contactData = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().firstName + ' ' + doc.data().lastName,
        email: doc.data().email,
        phoneNumber: doc.data().phoneNumber,
        message: doc.data().message,
        read: doc.data().read || false,
      }));
      setContacts(contactData);
      setFilteredContacts(contactData);
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    if (filter === "all") {
      setFilteredContacts(contacts);
    } else {
      const isRead = filter === "read";
      setFilteredContacts(contacts.filter(contact => contact.read === isRead));
    }
  }, [filter, contacts]);

  const showModal = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleReply = () => {
    window.location.href = `mailto:${selectedContact.email}?subject=Response to your message&body=Hi ${selectedContact.name},%0D%0A%0D%0A`;
    handleOk();
  };

  const handleMarkAsRead = async (contact) => {
    const contactRef = doc(db, "contacts", contact.id);
    await updateDoc(contactRef, { read: true });
    setContacts(contacts.map(c => c.id === contact.id ? { ...c, read: true } : c));
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const handleCheckboxChange = (id, checked) => {
    setSelectedContacts(prev =>
      checked ? [...prev, id] : prev.filter(contactId => contactId !== id)
    );
  };

  const handleDeleteSelected = async () => {
    const promises = selectedContacts.map(id => deleteDoc(doc(db, "contacts", id)));
    await Promise.all(promises);
    setContacts(contacts.filter(contact => !selectedContacts.includes(contact.id)));
    setSelectedContacts([]);
  };

  const handleDeleteAllRead = async () => {
    const readContacts = contacts.filter(contact => contact.read).map(contact => contact.id);
    const promises = readContacts.map(id => deleteDoc(doc(db, "contacts", id)));
    await Promise.all(promises);
    setContacts(contacts.filter(contact => !readContacts.includes(contact.id)));
  };

  const columns = [
    {
      title: <Checkbox
        onChange={e => {
          const checked = e.target.checked;
          const allIds = filteredContacts.map(contact => contact.id);
          setSelectedContacts(checked ? allIds : []);
        }}
        checked={selectedContacts.length === filteredContacts.length}
      />,
      dataIndex: "checkbox",
      render: (_, record) => (
        <Checkbox
          onChange={e => handleCheckboxChange(record.id, e.target.checked)}
          checked={selectedContacts.includes(record.id)}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      sorter: (a, b) => a.phoneNumber.localeCompare(b.phoneNumber),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <>
          <Button className="btn btn-primary" onClick={() => showModal(record)}>
            View Message
          </Button>
          {!record.read && (
            <Button
              className="btn btn-primary"
              style={{ marginLeft: '20px' }}
              onClick={() => handleMarkAsRead(record)}
            >
              Mark as Read
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <Header />
      <Sidebar id="menu-item1" activeClassName="contact-list" />
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3>Contact List</h3>
                <Select defaultValue="all" style={{ width: 200 }} onChange={handleFilterChange}>
                  <Option value="all">All</Option>
                  <Option value="read">Read</Option>
                  <Option value="unread">Unread</Option>
                </Select>
                
                {selectedContacts.length > 0 && (
                  <Button
                    type="danger"
                    style={{ marginLeft: '20px',backgroundColor:'#E70226',color:'white' }}
                    onClick={handleDeleteSelected}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <Table
                    columns={columns}
                    dataSource={filteredContacts}
                    rowKey="id"
                  />
                  {isModalOpen && (
                    <Modal
                      title="Contact Message"
                      visible={isModalOpen}
                      onCancel={handleCancel}
                      footer={[
                        <Button key="back" onClick={handleCancel}>
                          Close
                        </Button>,
                        <Button key="submit" type="primary" onClick={handleReply} icon={<MailOutlined />}>
                          Reply
                        </Button>
                      ]}
                    >
                      <p>{selectedContact.message}</p>
                    </Modal>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contactlist;
