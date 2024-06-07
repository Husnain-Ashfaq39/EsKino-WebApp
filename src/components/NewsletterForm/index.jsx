import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addDocument, fetchDocumentsWithQuery } from "../../services/dbService";

export default function NewsletterForm({ label, btnText, btnArrowUrl }) {
  const [email, setEmail] = useState("");
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email) {
      if (!validateEmail(email)) {
        toast.warn("Please enter a valid email address.");
        return;
      }
  
      try {
        const querySnapshot = await fetchDocumentsWithQuery(
          "subscribers",
          "email",
          email
        );
        if (!querySnapshot.empty) {
          toast.warn("This email is already subscribed.");
          return;
        }
  
        await addDocument("subscribers", { email });
        toast.success("Subscription successful!");
        setEmail("");
      } catch (error) {
        console.error("Error adding document: ", error);
        toast.error("Subscription failed. Please try again.");
      }
    } else {
      toast.warn("Please enter a valid email address.");
    }
  };
  

  return (
    <>
      {label && <p>Your Email</p>}
      <form action="#" className="cs_newsletter_form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="cs_form_field"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="cs_btn cs_style_1">
          <span>{btnText}</span>
          <i>
            <img src={btnArrowUrl} alt="Icon" />
            <img src={btnArrowUrl} alt="Icon" />
          </i>
        </button>
      </form>
    </>
  );
}
