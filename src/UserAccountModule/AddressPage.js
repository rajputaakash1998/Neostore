import React from "react";
import img from "../images/aston.jpg";
import "./account.css";
import AccountCard from "./AccountCard";

import AddressesComponent from "./AddressesComponent";





export default function AddressPage() {



  return (
    <div className="container py-4">
      <h5>My Account</h5>
      <hr></hr>
      <div className="row">
        <AccountCard img={img} />

        <div className="col-md-8 ">
        
           <AddressesComponent/> 
        
         
          
        </div>
      </div>
    </div>
  );
}