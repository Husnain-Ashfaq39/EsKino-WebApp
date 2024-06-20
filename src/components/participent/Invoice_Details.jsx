import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDocument, getAllDocuments, fetchDocumentsWithQuery } from "../../services/dbService";
import Header from "../Header";
import { logo2Png } from "../imagepath";
import Sidebar from "../Sidebar";
import { Skeleton } from "antd"; // Import Ant Design's Skeleton component
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

const InvoiceSkeleton = () => (
  <>
    <Header />
    <Sidebar />
    <div className="page-wrapper">
      <div className="content container-fluid">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="card invoice-info-card">
              <div className="card-body">
                <div className="invoice-item invoice-item-one">
                  <div className="row">
                    <div className="col-md-6">
                      <Skeleton.Image style={{ width: 35, height: 35 }} />
                      <Skeleton active paragraph={{ rows: 1 }} />
                    </div>
                    <div className="col-md-6">
                      <Skeleton active paragraph={{ rows: 2 }} />
                    </div>
                  </div>
                </div>
                <div className="invoice-item invoice-item-two">
                  <div className="row">
                    <div className="col-md-6">
                      <Skeleton active paragraph={{ rows: 3 }} />
                    </div>
                    <div className="col-md-6">
                      <Skeleton active paragraph={{ rows: 2 }} />
                    </div>
                  </div>
                </div>
                <div className="invoice-item invoice-table-wrap">
                  <Skeleton active paragraph={{ rows: 5 }} />
                </div>
                <div className="row align-items-center justify-content-center">
                  <div className="col-lg-6 col-md-6">
                    <Skeleton active paragraph={{ rows: 2 }} />
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <Skeleton active paragraph={{ rows: 2 }} />
                  </div>
                </div>
                <div className="row justify-content-end mt-4 no-print">
                  <Skeleton.Button active style={{ width: 100, height: 40 }} />
                  <Skeleton.Button active style={{ width: 150, height: 40 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

const Invoice_Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [participant, setParticipant] = useState(null);
  const [companyDetails, setCompanyDetails] = useState(null);
  const [index, setIndex] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const invoiceRef = useRef();

  useEffect(() => {
    const fetchParticipantDetails = async () => {
      const doc = await getDocument("participants", id);
      if (doc.exists()) {
        setParticipant(doc.data());

        // Fetch all participants to determine the index
        const querySnapshot = await fetchDocumentsWithQuery("participants", "sectionId", doc.data().sectionId);
        const participants = querySnapshot.docs.map((doc, index) => ({
          id: doc.id,
          index: index + 1,
          ...doc.data(),
        }));
        const participantIndex = participants.findIndex(p => p.id === id);
        if (participantIndex !== -1) {
          setIndex(participants[participantIndex].index);
        }
      } else {
        console.error("No such participant document!");
        navigate("/meetinglist/participantlist");
      }
      setLoading(false); // Set loading to false after fetching data
    };

    const fetchCompanyDetails = async () => {
      const querySnapshot = await getAllDocuments("contactInfo");
      if (!querySnapshot.empty) {
        const firstDoc = querySnapshot.docs[0];
        setCompanyDetails(firstDoc.data());
      } else {
        console.error("No company details document found!");
        toast.error("Please add company contact details first!"); 
        navigate("/meetinglist"); 
      }
    };

    fetchParticipantDetails();
    fetchCompanyDetails();
  }, [id, navigate]);

  if (loading) {
    return <InvoiceSkeleton />;
  }

  if (!participant || !companyDetails || index === null) {
    return <></>;
  }

  const discount = participant.originalPrice - participant.totalFee;
  const discountPercentage = ((discount / participant.originalPrice) * 100).toFixed(2);

  const formatDate = (date) => {
    if (!date) return ""; // Return an empty string if the date is undefined
    return date.split("/").join(".");
  };

  const handlePrint = async () => {
    const input = document.getElementById("invoice-content");
    const buttons = document.getElementsByClassName("no-print");

    Array.from(buttons).forEach((button) => (button.style.display = "none"));

    await html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const printWindow = window.open("", "_blank");
      printWindow.document.write(
        '<html><head><title>Invoice</title></head><body style="margin: 0;">'
      );
      printWindow.document.write('<img src="' + imgData + '" style="width: 100%;">');
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.onafterprint = function () {
        printWindow.close();
      };
    });

    Array.from(buttons).forEach((button) => (button.style.display = "block"));
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById("invoice-content");
    const buttons = document.getElementsByClassName("no-print");

    Array.from(buttons).forEach((button) => (button.style.display = "none"));

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice.pdf");

      Array.from(buttons).forEach((button) => (button.style.display = "block"));
    });
  };

  return (
    <>
      <Header />
      <Sidebar id="menu-item2" activeClassName="participant-list" />
      <ToastContainer /> {/* Add ToastContainer */}
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div
                id="invoice-content"
                className="card invoice-info-card"
                ref={invoiceRef}
              >
                <div className="card-body">
                  <div className="invoice-item invoice-item-one">
                    <div className="row">
                      <div className="col-md-6">
                        <div
                          className="invoice-logo"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <img
                            src={logo2Png}
                            alt="logo"
                            style={{ width: "35px" }}
                          />
                          <span style={{ fontSize: "30px", marginLeft: "3px" }}>
                            Eskino
                          </span>
                        </div>
                        <div className="invoice-head">
                          <h2>Invoice</h2>
                          <p>Participant No: {index}</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="invoice-info">
                          <strong className="customer-text-one">
                            Invoice From
                          </strong>
                          <h6 className="invoice-name">Eskino</h6>
                          <p className="invoice-details">
                            {companyDetails.phone} <br />
                            {companyDetails.address}
                            <br />
                            {companyDetails.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="invoice-item invoice-item-two">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="invoice-info">
                          <strong className="customer-text-one">
                            Billed to
                          </strong>
                          <h6 className="invoice-name">
                            {participant.firstName} {participant.lastName}
                          </h6>
                          <p className="invoice-details invoice-details-two">
                            {participant.email} <br />
                            {participant.address} <br />
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="invoice-info invoice-info2">
                          <p className="invoice-details">
                            <strong>Invoice Date : </strong>
                            {formatDate(participant.issueDate)}
                          </p>
                          <p className="invoice-details">
                            <strong>Due Date : </strong>
                            {formatDate(participant.dueDate)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="invoice-item invoice-table-wrap">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="table-responsive">
                          <table className="invoice-table table table-center mb-0">
                            <thead>
                              <tr>
                                <th>Plan</th>
                                <th>Rate</th>
                                <th>Person</th>
                                <th>Discount (%)</th>
                                <th className="text-end">Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{participant.plan}</td>
                                <td>€{participant.originalPrice}</td>
                                <td>{participant.persons}</td>
                                <td>{discountPercentage}%</td>
                                <td className="text-end">
                                  €{participant.totalFee}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center justify-content-center">
                    <div className="col-lg-6 col-md-6">
                      <div className="invoice-terms">
                        <h6>Note:</h6>
                        <p className="mb-0">
                          Please pay within 15 days. Thank you for your business.
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="invoice-total-card">
                        <div className="invoice-total-box">
                          <div className="invoice-total-inner">
                            <p>
                              Total <span>€{participant.originalPrice}</span>
                            </p>
                            <p>
                              Discount <span>- €{discount.toFixed(2)}</span>
                            </p>
                            <p className="mb-0">
                              Sub total <span>€{participant.totalFee}</span>
                            </p>
                          </div>
                          <div className="invoice-total-footer">
                            <h4>
                              Total Amount <span>€{participant.totalFee}</span>
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-end mt-4 no-print">
                    <div className="col-auto">
                      <button
                        className="btn btn-primary me-2"
                        onClick={handlePrint}
                      >
                        <i className="fas fa-print"></i> Print
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={handleDownloadPDF}
                      >
                        <i className="fas fa-download"></i> Download PDF
                      </button>
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

export default Invoice_Details;
