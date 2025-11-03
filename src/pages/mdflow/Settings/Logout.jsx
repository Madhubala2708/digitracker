import React from 'react'
import { TopNav } from "./TopNav"
import {email, logout, phone, profile_pic } from '../../assets/images'



const Logout = () => {
  return (
    <div>
    <TopNav />
    <div className="container mt-4">
      <div className="p-4 profile-cont">
        <h3 className='profile-det'>Profile Details</h3>
        <div className="card-body text-start">
          <div className="d-flex align-items-center img-box">
            <img
              src={profile_pic}
              alt="profile"
              className="rounded-circle me-3"
              width="120"
              height="120"
            />
            <div>
              <h4 className="card-title mb-1">Courtney Henry</h4>
              <h5 className="text-muted">Managing Director</h5>
            </div>
          </div>
          <p className="card-text fw-bold mt-3 datas"> <img src={email}/> courtneyhenry@construction.com</p>
          <p className="card-text text-secondary datas"><img src={phone}/> +91 89756 32541</p>
<button className="btn btn-danger mt-3 Logout d-flex align-items-center justify-content-center">
  <img src={logout}/> Logout</button>
        </div>
      </div>
    </div>
  </div>
  
  )
}

export default Logout
