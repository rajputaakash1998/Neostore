import React from "react";
import img from "../images/aston.jpg";
import AccountCard from "./AccountCard";
 /**
 * @author Aakash Rajput
 * @description this method renders the account and the edit address component
 * @returns returns the JSX of the edit address page
 */
import EditAddress from "./EditAddress";

function EditAddressPage() {
  return (
    <div className="container py-4">
      <h5>My Account</h5>
      <hr></hr>
      <div className="row">
        <AccountCard img={img} />

        <div className="col-md-8 ">
          <EditAddress />
        </div>
      </div>
    </div>
  );
}

export default EditAddressPage;
