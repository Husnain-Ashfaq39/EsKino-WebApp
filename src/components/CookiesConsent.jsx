import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Button } from "antd";

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const Wrapper = styled.div`
  position: fixed;
  bottom: 50px;
  right: 20px;
  max-width: 345px;
  width: 100%;
  background: #fff;
  border-radius: 8px;
  padding: 15px 25px 22px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.3s ease;
  z-index: 1000;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  column-gap: 15px;
`;

const Icon = styled.i`
  color: #4070f4;
  font-size: 32px;
`;

const Title = styled.h2`
  color: #4070f4;
  font-weight: 500;
`;

const Data = styled.div`
  margin-top: 16px;
`;

const Text = styled.p`
  color: #333;
  font-size: 16px;

  a {
    color: #4070f4;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Buttons = styled.div`
  margin-top: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  padding: 8px 0;
  border-radius: 4px;
  cursor: pointer;
  width: calc(50% - 10px);
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  &.accept {
    background: #4070f4;
    color: #fff;
    border: none;

    &:hover {
      background-color: #034bf1;
    }
  }

  &.decline {
    background-color: #fff;
    color: #4070f4;
    border: 2px solid #4070f4;

    &:hover {
      background-color: #4070f4;
      color: #fff;
    }
  }
`;

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setVisible(false);
  };

  const handleDecline = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <Wrapper>
      <Header>
        <Icon className="bx bx-cookie" />
        <Title>Cookies Consent</Title>
      </Header>
      <Data>
        <Text>
          This website uses cookies to help you have a superior and more
          relevant browsing experience on the website.{" "}
        </Text>
      </Data>
      <Buttons>
        <StyledButton className="accept" onClick={handleAccept}>
          Accept
        </StyledButton>
        <StyledButton className="decline" onClick={handleDecline}>
          Decline
        </StyledButton>
      </Buttons>
    </Wrapper>
  );
};

export default CookieConsent;
