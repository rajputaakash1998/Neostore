import React,{useEffect,useState} from 'react'
import './Header.css'
import {NavLink,Link} from "react-router-dom"
import {Badge} from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {CartContext} from "../context/Context"
import { SearchContext } from '../context/Context';
import { useContext } from 'react';


import {LoginContext} from "../context/Context"
import axios from "axios"
import {useHistory} from "react-router-dom"


function Header() {

  const history=useHistory();

  const {cartState,dispatch}=useContext(CartContext);
  const{searchState,searchDispatch}=useContext(SearchContext);

  const {login,loginDispatch}=useContext(LoginContext);

  const[badgeCount, setBadgeCout]=useState(cartState.length);
  const[searchQuery,setSearchQuery]=useState("");

  console.log("Badgecount before",badgeCount)
  console.log("Cart length Before",cartState.length)
  useEffect(()=>{
    if(localStorage.getItem("token")){
      fetchCartData()
    }
   
  },[login,cartState])

  const fetchCartData= async ()=>{
   const token=localStorage.getItem("token");
    const config={
      method:'get',
      url:"https://neostore-api.herokuapp.com/api/cart",
      headers:{
        'Authorization':`${token}`
      }
    }
    
    const response=await axios(config);
    console.log(response)
    console.log(response.data.data.products)
    
    setBadgeCout(response.data.data.products.length)
  }
  
  const onLogoutClick=()=>{
    loginDispatch({type:"AUTH",payload:false})
    localStorage.removeItem("token");
    // localStorage.removeItem('fname');
    
    dispatch({type:"REMOVE_ALL"})
    loginDispatch({type:"AUTH",payload:false})
    setBadgeCout(0)
    history.push("/home")

  }
  console.log("Login state",login)
  console.log("Cart state length",cartState.length)
  console.log("Badge Count",badgeCount)
  




 const onSearchChange=(e)=>{
  setSearchQuery(e.target.value)
 
 }

 const onSearchClick=()=>{
  searchDispatch({type:"SEARCH",payload:searchQuery})
  setSearchQuery("")
  history.push("/products")
 }
 console.log(searchQuery)

    return (
        <nav>
            <ul>
               <li className="logo">Neo<span className="logo-red">STORE</span></li>
                <div className="itemss">
                    {/* <li><a href="#">Home</a></li>
                    <li><a href="#">Products</a></li>
                    <li><a href="#">Order</a></li> */}

                    <li><NavLink to="home">Home</NavLink></li>
                    <li><NavLink to="products">Products</NavLink></li>
                    <li><NavLink to="order">Order</NavLink></li>
                </div>
                <li className="search-icon">
                    <input type="search" placeholder="Search" value={searchQuery} onChange={onSearchChange}/>
                    <label className="icon">
                    <i onClick={onSearchClick}className="fa fa-search"></i>
                    </label>
                </li>

    <div className="cart" onClick={onclick}>
    <div className="cartdiv">
    <NavLink style={{textDecoration:"none",color:"black"}}to="cart">Cart
    <IconButton aria-label="cart">
     
      <Badge badgeContent={badgeCount} color="secondary">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>

    </NavLink>
    
    
    </div>
   
  </div>
 <div className="dropdownn">
    <div className="dropdiv">
    <i className="fa fa-user"></i>
    <i className="fa fa-caret-down"></i>
    </div>
    <div className="dropdownn-content">
      {/* <a href="#">Login</a>
      <a href="#">Register</a> */}
      {localStorage.getItem("token") ?( <a onClick={onLogoutClick}>Logout</a>):( <NavLink to="login">Login</NavLink>)}
     
      {localStorage.getItem("token")?(""):(<NavLink to="register">Register</NavLink>)}
      {localStorage.getItem("token") ? ( <NavLink to="profile">Account</NavLink>):("")}
     

      
    </div>
  </div>
            </ul>
        </nav>
    )
}

export default Header
