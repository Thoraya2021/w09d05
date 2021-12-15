import React from "react";
import { Link } from "react-router-dom";

import './style.css';

const NavBar = () => {
  return (
  
    
    
    <div className="nav">

    <ul>

    <Link to="">
        <li className="li1">Tweet`s</li>
      </Link>
    
  
      <Link to="/Posts">
        <li>posts</li>
      </Link>
  
      <Link to="/Login">
        <li>Log in</li>
      </Link>
      <Link to="/Registration">
        <li>SignUp</li>
      </Link>
    </ul>
    </div>
  );
};

export default NavBar;