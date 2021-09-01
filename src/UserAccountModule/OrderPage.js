import React,{useState,useEffect} from 'react'
import img from "../images/aston.jpg";
import AccountCard from "./AccountCard";

import OrderCard from "./OrderCard";
import axios from "axios"
import {BeatLoader} from "react-spinners"
import {useHistory} from "react-router-dom"

function OrderPage() {
  const history=useHistory()
  const[orders,setOrders]=useState([]);
  const[loading,setLoading]= useState(false);

  const fetchOrders=async()=>{
    const token=localStorage.getItem("token")
    if(!token){
      alert("please log in first!");
            return history.replace("/login");
    }
    setLoading(true);
    const config={
      method:"GET",
      url:"https://neostore-api.herokuapp.com/api/order",
      headers:{
        "Authorization":`${token}`
      }
    }

    const response=await axios(config);
    setLoading(false);
    console.log(response);
    setOrders(response.data.data.orders)

  }
useEffect(()=>{
  fetchOrders()
},[])
    return (
        <div className="container py-4">
        <h5>My Account</h5>
        <hr></hr>
        <div className="row">
          <AccountCard img={img} />
  
          <div className="col-md-8 ">
            {loading ?( <div style={{textAlign:"center"}}><BeatLoader size={72} color="red" /></div>):("")}
           
          {orders.map((order)=>{
            return order.items.map((item,index)=>(
              <OrderCard data={item} createdAt={order.createdAt} id={order.id} key={index}/>
            ))
          }
        )}
           </div>
        </div>
      </div>
    )
}

export default OrderPage
