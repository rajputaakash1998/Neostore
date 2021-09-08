import React from 'react';
import img from "../images/aston.jpg";
import AccountCard from "./AccountCard";
import AddNewAddress from "./AddNewAddress";
 /**
 * @author Aakash Rajput
 * @description this method renders the account and the add address component
 * @param this method doesn't accept any parameter
 * @returns returns the JSX of the add address page
 */

function AddAddressPage() {
    return (
        <div className="container py-4">
        <h5>My Account</h5>
        <hr></hr>
        <div className="row">
          <AccountCard img={img} />
  
          <div className="col-md-8 ">
          
           <AddNewAddress/>
          
           
            
          </div>
        </div>
      </div>
    )
}

export default AddAddressPage;
