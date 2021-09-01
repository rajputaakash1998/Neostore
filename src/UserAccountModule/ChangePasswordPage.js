

import React from 'react';
import img from "../images/aston.jpg";
import AccountCard from "./AccountCard";

import ChangePassword from "./ChangePassword";


function ChangePasswordPage() {
    return (
        <div className="container py-4">
        <h5>My Account</h5>
        <hr></hr>
        <div className="row">
          <AccountCard img={img} />
  
          <div className="col-md-8 ">
          
          <ChangePassword/>
          
           
            
          </div>
        </div>
      </div>
    )
}

export default ChangePasswordPage;
