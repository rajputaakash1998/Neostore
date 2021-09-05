import React from 'react';
import img from "../images/aston.jpg";
import AccountCard from "./AccountCard";

/**
 * @author Aakash Rajput
 * @description this method is used to change the user details
 * @returns returns the JSX of the user profile edit Form
 */

import EditProfile from './EditProfile';
function EditProfilePage() {
    return (
        <div className="container py-4">
        <h5>My Account</h5>
        <hr></hr>
        <div className="row">
          <AccountCard img={img} />
  
          <div className="col-md-8 ">
          
         <EditProfile/>
          
           
            
          </div>
        </div>
      </div>
    )
}

export default EditProfilePage
