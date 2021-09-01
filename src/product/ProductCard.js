import React,{useState,useEffect} from 'react'

import "./productCard.css"
import Rating from '@material-ui/lab/Rating';
import {useHistory,Link} from "react-router-dom"
import axios from "axios"
import {CartContext} from "../context/Context"
import { useContext } from 'react';

function ProductCard(props) {
    
    const {cartState,dispatch}=useContext(CartContext);

    const history=useHistory();
    const cardClicked=()=>{
     history.push("/productDetail")
    }
  
    const addToCart= async ()=>{
        if(!localStorage.getItem("token")){
            alert("Login First")
            history.replace("/login")
        }
            const token=localStorage.getItem("token");
            const productData={
                productId:props.data.id,
                quantity:1
            }
            const config={
                method:'post',
                url: 'https://neostore-api.herokuapp.com/api/cart',
                data:productData,
                headers:{
                    'Authorization':`${token}`
                }

            }
            console.log("This is Add product",productData)
            const response= await axios(config)
            console.log(response)
            if(response.status===200){
                dispatch({type:"ADD_TO_CART",payload:productData})
               
                alert("Product Added Successfully")
            }
            // dispatch({type:"ADD_TO_CART",payload:productData})

        

    }
    return (
        // <div className="card" style={{width: "18rem"}}>
        //     <img style={{ height: "200px" }} className="card-img-top" src={img1} alt={img1}/>
        //     <div className="card-body">
        //         <h5 className="card-title">This is my card</h5>
        //         <p className="card-body">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        //        <button className="btn btn-danger">Add to Cart</button>
        //     </div>
        // </div>
        //  <div className="container">

        /* <div className="row"> */
            <div className="col-md-4 mb-2 mt-1 " >
        <div className="card" style={{ width: "18rem" }}>
            <Link to={`/productDetail/${props.data._id}`}>
             <img style={{ height: "200px"}} src={props.data.mainImage} className="card-img-top" alt={props.data.mainImage}/>
            </Link>
           
          <div className="card-body bg-light text-center">
                <div className="mb-2">
                    <h6 className="font-weight-semibold mb-2">{props.data.name}</h6>
                </div>
                <h3 className="mb-0 font-weight-semibold">{props.data.price}</h3>
                <div> 
                <Rating name="read-only" value={props.data.avgRating} readOnly />
               </div>
               {cartState.some((p)=>p.productId===props.data._id)?
                 (  <button  className="btn btn-danger bg-cart"><i  className="fa fa-shopping-cart mr-2"></i>"Go To Cart</button>):
                 (<button onClick={addToCart} className="btn btn-danger bg-cart"><i  className="fa fa-shopping-cart mr-2"></i>"Add To Cart</button>)
                 }
                
            </div>
        </div>
    </div>

    
       

    
   
    
   
    // </div>
// </div>
    )}

export default ProductCard
