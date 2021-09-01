import React,{useState,useEffect} from "react";
import axios from "axios";
import {CartContext} from "../context/Context"
import { useContext } from 'react';

function CartCard(props) {

const[count,setCount]=useState(props.product.quantity);
const {cartState,dispatch}=useContext(CartContext);


const incrementCount= async()=>{

   const quantityObj={
     quantity:count+1
   }
   const token=localStorage.getItem("token");
    const config={
      method:'put',
      url:`https://neostore-api.herokuapp.com/api/cart/${props.product.id}`,
      data:quantityObj,
      headers:{
        'Authorization':`${token}`
      }
    }

    const response=await axios(config);
    console.log(response)
    setCount(count+1);
    dispatch({type:"UPDATE_QUANTITY"})
   
}
const decrementCount= async()=>{

  const quantityObj={
    quantity:count-1
  }
  const token=localStorage.getItem("token");
   const config={
     method:'put',
     url:`https://neostore-api.herokuapp.com/api/cart/${props.product.id}`,
     data:quantityObj,
     headers:{
       'Authorization':`${token}`
     }
   }

   const response=await axios(config);
   console.log(response)
   setCount(count-1);
   dispatch({type:"UPDATE_QUANTITY"})
   
}
const deleteFromCart=async ()=>{
  const token=localStorage.getItem("token");
  const config={
    method:"delete",
    url:`https://neostore-api.herokuapp.com/api/cart/${props.product._id}`,
    headers:{
      'Authorization':`${token}`
    }
    
  }
  
  const response= await axios(config);
  console.log(response);
  console.log("THis is delete product id",props.product.productId.id)
  dispatch({type:"REMOVE_FROM_CART",payload:props.product.productId.id})

}
  return (
   

   
      <div className="card p-2" style={{maxWidth: "100%"}}>
      <div className="row">
        <div className="col-md-4 d-flex">
        <img
            style={{ width: "70px", height: "70px" }}
            src={props.product.productId.mainImage}
            alt={props.product.productId.mainImage}
          />
          <span>
            <div className="ml-2">{props.product.productId.name}</div>
            {/* <div className="ml-2">By Nilkamal Pvt. Ltd.</div> */}
            <div className="ml-2">Status: Available</div>
          </span>
        </div>
        <div className="col-md-8">
          <div className="card-body">

         
          <span className="col-1">
          <span onClick={incrementCount}><i className="px-2 fa fa-plus"></i></span>
        <input className="text-center" style={{ width: "10%" }} value={count} type="text" />
        <span onClick={decrementCount}><i className=" px-2 fa fa-minus"></i></span>
          </span>
          <span className="col-md-3 ml-5">{props.product.productId.price}</span>
          <span className="col-md-3 ml-5">{props.product.totalAmount}</span>
          <span onClick={deleteFromCart} className="fa fa-trash col-md-1 ml-5"></span>
        </div>
        </div>
      

      </div>
      </div>
   
  );
}

export default CartCard;
