import React from "react";
import "./Preloader.scss";

const Preloader = () => {
  return (
    <div className="preloader">
      <div className="about">
        <a
          className="bg_links social portfolio"
          href="https://www.rafaelalucas.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="icon"></span>
        </a>
        <a
          className="bg_links social dribbble"
          href="https://dribbble.com/rafaelalucas"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="icon"></span>
        </a>
        <a
          className="bg_links social linkedin"
          href="https://www.linkedin.com/in/rafaelalucas/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="icon"></span>
        </a>
        <a className="bg_links logo"></a>
      </div>
      <div className="content">
        <div className="loading">
          <p>Loading</p>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
