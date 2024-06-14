import React from 'react';
import NewsletterForm from '../NewsletterForm';
import { arrowWhiteSvg } from '../imagepath';

export default function Newsletter({ title, subTitle }) {
  return (
    <div className="cs_newsletter cs_style_1">
      <h2 className="cs_newsletter_title" style={{fontWeight:"300"}}>{title}</h2>
      <div className="cs_newsletter_subTitle" style={{fontWeight:"300"}}>{subTitle}</div>
      <NewsletterForm
        btnText="Submit"
        btnArrowUrl={arrowWhiteSvg}
      />
    </div>
  );
}
