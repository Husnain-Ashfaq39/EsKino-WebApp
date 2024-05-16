import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAllDocuments } from '../../services/dbService';

const fetchContactInfo = async () => {
   
    const colSnap = await getAllDocuments("contactInfo");

    if (!colSnap.empty) {
        const docSnap = colSnap.docs[0]; // Get the first document
        return {
            address: docSnap.data().address,
            phone: docSnap.data().phone,
            email: docSnap.data().email
        };
    } else {
        console.log("No documents found in the contactInfo collection!");
        return {
            address: "",
            phone: "",
            email: ""
        };
    }
};

export default function ContactInfoWidget() {
  const [contactInfo, setContactInfo] = useState({
    address: "",
    phone: "",
    email: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchContactInfo();
      setContactInfo(data);
    };

    fetchData();
  }, []);

  return (
    <ul className="cs_contact_widget">
      <li>
        <i className="cs_accent_bg">
          <Icon icon="ep:location" />
        </i>
        {contactInfo.address}
      </li>
      <li>
        <i className="cs_accent_bg">
          <Icon icon="fluent:call-24-regular" />
        </i>
        {contactInfo.phone}
      </li>
      <li>
        <i className="cs_accent_bg">
          <Icon icon="bi:envelope" />
        </i>
        {contactInfo.email}
      </li>
    </ul>
  );
}
