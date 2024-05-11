import React from 'react'
import { Link } from 'react-router-dom';


const CCNavBar = () => {
  return (
    <div className="settings-menu-links">
    <ul className="nav nav-tabs menu-tabs">
      
      <li className="nav-item ">
        <Link className="nav-link" to="/landingpage/coursecontentheading">
          Course Content Heading 
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/landingpage/coursecontentbody">
        Course Content Body
        </Link>
      </li>

    </ul>
  </div>
  )
}

export default CCNavBar