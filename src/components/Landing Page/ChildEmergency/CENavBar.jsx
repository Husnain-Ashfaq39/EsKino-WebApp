import React from 'react'
import { Link } from 'react-router-dom';


const CENabBar = () => {
  return (
    <div className="settings-menu-links">
    <ul className="nav nav-tabs menu-tabs">
      
      <li className="nav-item ">
        <Link className="nav-link" to="/landingpage/childemergencyheader">
          Child Emergency Heading 
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/landingpage/childemergencybody">
        Child Emergency Body
        </Link>
      </li>

    </ul>
  </div>
  )
}

export default CENabBar