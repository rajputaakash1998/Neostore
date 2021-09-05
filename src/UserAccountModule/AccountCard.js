import React from "react";
import {NavLink} from "react-router-dom"

 /**
 * @author Aakash Rajput
 * @description this method renders the user account like orders, addresses,change password,profile etc
 * @returns returns the JSX of the Account page
 */
function AccountCard(props) {

   const firstName=localStorage.getItem("fname");
   const lastName=localStorage.getItem("lname");

  return (
    <div className="col-md-4">
      <div className="card" style={{ width: "18rem", height: "400px" }}>
        <div className="text-center">
          <img
            style={{ width: "120px", height: "120px", borderRadius: "50%" }}
            className="card-img-top py-2  "
            src={props.img}
            alt={props.img}
          />
        </div>
        <div className="card-body text-center">
          <h6 className="card-title">{firstName+' '+lastName}</h6>
          <div className="d-flex justify-content-center flex-column">
            <div className="py-1">
              <i class="fa fa-bars mr-2"></i>
              <NavLink style={{textDecoration:"none"}} to="order">Order</NavLink>
            </div>
            <div className="py-1">
              <i class="fa fa-user mr-2"></i>
              <NavLink style={{textDecoration:"none"}} to="profile">Profile</NavLink>
            </div>
            <div className="py-1">
              <i class="fa fa-location-arrow mr-2"></i>
              <NavLink style={{textDecoration:"none"}} to="address" >Address</NavLink>
            </div>
            <div className="py-1">
              <i class="fa fa-key mr-2"></i>
              <NavLink style={{textDecoration:"none"}} to="changePassword">Change Password</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountCard;
