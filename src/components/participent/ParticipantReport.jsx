import React, { useRef } from 'react';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { logo } from '../imagepath'; // Adjust the path as necessary

const ReportContainer = styled.div`
  padding: 20px;
  border-radius: 15px;
  background-color: #fff;
  max-width: 700px;
  margin: 0 auto;
  border: 1px solid #ccc;
`;

const ReportHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const PrintButton = styled(Button)`
  background-color: #2E7D32;
  color: #fff;
  &:hover {
    background-color: #1B5E20;
  }
`;

const BackButton = styled(Button)`
  background-color: #d32f2f;
  color: #fff;
  &:hover {
    background-color: #b71c1c;
  }
`;

const ReportContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 35px; /* Adjust the width as necessary */
  height: auto;
  margin-right: 10px;
`;

const ParticipantReport = () => {
  const printRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const participant = location.state?.participant;

  if (!participant) {
    navigate('/meetinglist/participantlist');
    return null;
  }

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <ReportContainer ref={printRef}>
      <ReportHeader>
        <LogoContainer>
          <Logo src={logo} alt="Company Logo" />
          <span className='text-3xl'>Eskino</span>
        </LogoContainer>
        <div>
          <PrintButton icon={<FontAwesomeIcon icon={faPrint} />} onClick={handlePrint}>
            Print
          </PrintButton>
          <BackButton onClick={handleBack} style={{ marginLeft: '10px' }}>
            Back
          </BackButton>
        </div>
      </ReportHeader>
      <ReportContent>
        <h2>Participant Report</h2>
        <p><strong>First Name:</strong> {participant.firstName}</p>
        <p><strong>Last Name:</strong> {participant.lastName}</p>
        <p><strong>Email:</strong> {participant.email}</p>
        <p><strong>Persons:</strong> {participant.persons}</p>
        <p><strong>Plan:</strong> {participant.plan}</p>
        <p><strong>Total Fee:</strong> €{participant.totalFee}</p>
        <p><strong>Name of Participants:</strong> {participant.personNames}</p>
        <p><strong>Owner Address:</strong> {participant.address}</p>
        <p><strong>Gender:</strong> {participant.gender}</p>
      </ReportContent>
    </ReportContainer>
  );
};

export default ParticipantReport;
