import React from "react";
import styled, { keyframes } from "styled-components";

// Define keyframes for the animation
const load = keyframes`
  0% { left: 0; height: 30px; width: 15px }
  50% { height: 8px; width: 40px }
  100% { left: 235px; height: 30px; width: 15px }
`;

// Define styled components
const LoaderWrapper = styled.div`
  width: 250px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: helvetica, arial, sans-serif;
  text-transform: uppercase;
  font-weight: 900;
  color: #5c97d6;
  letter-spacing: 0.2em;

  &::before,
  &::after {
    content: "";
    display: block;
    width: 15px;
    height: 15px;
    background: #5c97d6;
    position: absolute;
    animation: ${load} 0.7s infinite alternate ease-in-out;
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }
`;

const BodyWrapper = styled.div`
  background: white;
  width: 100vw;
  height: 100vh;
`;

const Preloader = () => {
  return (
    <BodyWrapper>
      <LoaderWrapper>Loading...</LoaderWrapper>
    </BodyWrapper>
  );
};

export default Preloader;
