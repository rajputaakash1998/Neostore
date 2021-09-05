import React from 'react';
import img from "../images/aston.jpg";
import AccountCard from "./AccountCard";

/**
 * @author Aakash Rajput
 * @description this method renders the account and the profile component
 * @returns returns the JSX of the user Profile
 */
import UserProfile from "./UserProfile";

function ProfilePage() {
    return (
        <div className="container py-4">
        <h5>My Account</h5>
        <hr></hr>
        <div className="row">
          <AccountCard img={img} />
  
          <div className="col-md-8 ">
          
           <UserProfile/>
          
           
            
          </div>
        </div>
      </div>
    )
}

export default ProfilePage
