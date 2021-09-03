import React from 'react';
import img from "../images/aston.jpg";
import AccountCard from "./AccountCard";
import AddNewAddress from "./AddNewAddress";


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
