import React from 'react';
import img from "../images/aston.jpg";
import AccountCard from "./AccountCard";
import AddNewAddress from "./AddNewAddress";
import AddressesComponent from "./AddressesComponent";
import ChangePassword from "./ChangePassword";
import EditAddress from "./EditAddress";
import OrderCard from "./OrderCard";
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
