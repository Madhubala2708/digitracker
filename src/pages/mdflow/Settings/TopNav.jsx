import React from "react";
import { NavLink } from "react-router-dom";

export const TopNav = () => {
  return (
    <div className="container">
    <ul className="d-flex justify-content-start topNav-container" style={{marginLeft:"-60px"}}>
        <h1>
        <li className="nav-item general-Tab">
            <NavLink 
                to="/logout" 
                className="nav-link custom-tab"
            >
                General
            </NavLink>
        </li>
        </h1>
    
        <h1>
        <li className="nav-item Roles-and-man-Tab">
            <NavLink 
                to="/roles" 
                className="nav-link custom-tab"
            >
                Roles & Management
            </NavLink>
        </li>
        </h1>
    
    </ul>
</div>
  );
};
