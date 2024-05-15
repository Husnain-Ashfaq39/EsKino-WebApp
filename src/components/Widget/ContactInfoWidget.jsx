import { Icon } from '@iconify/react';
import React from 'react';
import { contactInfo } from '../../services/general_functions';
export default function ContactInfoWidget() {
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
