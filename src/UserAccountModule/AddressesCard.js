import axios from 'axios';
import React,{useEffect,useState} from 'react'

import { useHistory } from 'react-router' 
import {AddressContext, CartContext} from "../context/Context"
import { useContext } from 'react';
import {BeatLoader} from "react-spinners"

function AddressesCard(props) {
    const {cartState,dispatch}=useContext(CartContext);

    const{addressState,addressDispatch}=useContext(AddressContext);

    const [cartLength,setCartLength]=useState(0);

    const [loading,setloading]=useState(false)

    const fetchCartData= async ()=>{
        setloading(true)
        const token=localStorage.getItem("token");
        const config={
          method:'get',
          url:"https://neostore-api.herokuapp.com/api/cart",
          headers:{
            'Authorization':`${token}`
          }
        }
        const response=await axios(config);
        setloading(false)
        console.log("Cart REsponse in address",response)
        console.log("cart data",response.data.data.products)
        setCartLength(response.data.data.products.length)
       }
      useEffect(()=>{
          fetchCartData()
      },[cartState])

console.log("CartLength",cartLength)

 const addressObj={
     addressId:props.address._id,
     addressLine:props.address.addressLine,
     pincode:props.address.pincode,
     city:props.address.city,
     state:props.address.state,
     country:props.address.country
 }
  const onCheckOut=async()=>{
      if(!localStorage.getItem("token")){
         history.push("/login")
      }
      else{

     
    const token=localStorage.getItem("token");

    const orderObj={
        addressId:props.address._id
    }
    const config={
        method:"POST",
        url:`https://neostore-api.herokuapp.com/api/order/place`,
        headers:{
            "Authorization":`${token}`
        },
        data:orderObj
    }
    const response=await axios(config)
    console.log("Order Response",response)
    if(response.status===200){
        alert("Order Placed Successfully")
        dispatch({type:"REMOVE_ALL"})
        history.push("/order")
    }
      }
  }

   
    const onClickEdit =()=>{
        addressDispatch({type:"SET_ADDRESS",payload:addressObj});
        history.push("/editAddress")
    }
    const deleteAddress=async()=>{
      const token=localStorage.getItem("token");

      const config={
          method:"DELETE",
          url:`https://neostore-api.herokuapp.com/api/user/address/${props.address._id}`,
          headers:{
              "Authorization":`${token}`
          }
      }
      try{
        const response=await axios(config);
        alert("Successfully Deleted")
      }catch(error){
          alert("Can't Delete Address")
          console.log("Error",error)
      }
      
    }
    console.log(cartState.length)
    console.log("Cart State",cartState)
    const history=useHistory();
    return (
        <div  className="container p-2 " style={{ boxShadow: "0px 0px 3px 0px gray" }}>
           <div className="d-flex justify-content-between">
           <div>
            <p>{props.address.addressLine}</p>
             <span>{props.address.city}</span><span>-</span><span>{props.address.pincode}</span>
             <p>{props.address.country}</p>
            </div>
             
           <div><i onClick={deleteAddress} style={{color:"red"}} class="fa fa-times"></i></div>
           </div>
           <button onClick={onClickEdit} className="btn btn-primary">Edit Address</button>

          {loading ?(<div className="text-center"><BeatLoader size={30} color="red"/></div>):(
              cartLength >0?( <button onClick={onCheckOut}className="btn btn-danger btn-block mt-4">Checkout</button>):("")
          )}
           
              
    
               
           

            
        </div>
    )
}

export default AddressesCard
