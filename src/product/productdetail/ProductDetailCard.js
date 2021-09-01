import React,{useState} from 'react'
import Rating from '@material-ui/lab/Rating';
import img from "../../images/aston.jpg"
import {useHistory} from "react-router-dom"

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import {CartContext} from "../../context/Context"
import { useContext } from 'react';
import axios from "axios"


import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailShareButton,
    PinterestShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    EmailIcon,
    PinterestIcon
    } from "react-share";
import { CodeSharp } from '@material-ui/icons';

function ProductDetailCard(props) {
    const{cartState,dispatch}=useContext(CartContext);
    const[starValue,setStarValue]=useState(0);
    const[rateClicked,setRateClicked]=useState(false);
    console.log(cartState)
    const history=useHistory();

    const addToCart= async ()=>{
        if(!localStorage.getItem("token")){
            alert("Please Login First")
            history.push("/login")
        }else{
            const token=localStorage.getItem("token");
            const productData={
                productId:props.item.id,
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
    
            const response= await axios(config)
            console.log(response)
            if(response.status===200){
                dispatch({type:"ADD_TO_CART",payload:productData})
                
                alert("Product Added Successfully")
            }
            // dispatch({type:"ADD_TO_CART",payload:productData})
            console.log("Add cart state",cartState)
    
        }
    
    }

   
    const image=props.item.mainImage;
    const subImage1=props.item.subImages[0];
    const subImage2=props.item.subImages[1];

    const[mainImage,setMainImage]=useState(image)

    const changePhoto = (e)=>{
        if(e.target.src === image){
          setMainImage(image)
        }else if(e.target.src === subImage1){
          setMainImage(subImage1)
        }else if(e.target.src === subImage2){
          setMainImage(subImage2)
        }
    }
    const removeFromCart=()=>{
        dispatch({type:"REMOVE_FROM_CART",payload:props.item.id})
        console.log("remove cart state",cartState)
    }
    return (
        <div className="container py-5">
        <div className="row">
            <div className="col-md-6">
                <div >
                <img onClick={changePhoto} className="image-container" style={{width:"400px",height:"250px"}}src={mainImage} alt={mainImage}/>
                </div>
                <div className="d-flex justify-content-space-between mt-5">
                    <div className="px-3 img-main">
                <img onClick={changePhoto} className="image-container" style={{width:"100px",height:"50px"}}src={subImage1} alt={subImage1}/>
                    </div>
                    <div className="px-3">
                    <img onClick={changePhoto} className="image-container" style={{width:"100px",height:"50px"}}src={subImage2} alt={subImage2}/>
                    </div>
                   
               
                </div>
                <div className="py-5">
                  <ul className="nav nav-tabs">
                      <li className="nav-item"><a href="#description" className="nav-link active"  data-toggle="tab" >Description</a></li>
                      <li className="nav-item"><a href="#features" className="nav-link" data-toggle="tab" >Features</a></li>
                  </ul>
                  <div className="tab-content">
                      <div className="tab-pane active" id="description">{props.item.description}</div>
                      <div className="tab-pane show" id="features">{props.item.features}</div>
                  </div>
                </div>
             </div>
            <div className="col-md-6">
              <h3>{props.item.name}</h3>
              <div> 
                  {/* <i className="fa fa-star star px-2"></i> 
                  <i className="fa fa-star star px-2"></i>
                   <i className="fa fa-star star px-2"></i> 
                   <i className="fa fa-star star px-2"></i> */}
                   <Rating name="read-only" value={props.item.avgRating} readOnly />
             </div>
             <hr></hr>
             <div>
                 <h6>Price:Rs {props.item.price}</h6>
                 <h6>Color: {props.item.color.name}</h6>
             </div>

             <div className="mt-5">
                 <h5>Share<i class="fa fa-share-alt"></i></h5>
                 <FacebookShareButton url="https://www.neosofttech.com" quote={"Hey check this out"} hashtag="#REact">
                     <FacebookIcon size={45} logoFillColor="white" round={true}></FacebookIcon>
                 </FacebookShareButton>

                 <WhatsappShareButton url="https://www.neosofttech.com" title="This is My Page">
                     <WhatsappIcon size={45} logoFillColor="white" round={true}></WhatsappIcon>
                 </WhatsappShareButton>

                 <TwitterShareButton url="https://www.neosofttech.com">
                     <TwitterIcon size={45} logoFillColor="white" round={true}></TwitterIcon>
                 </TwitterShareButton>

                 <EmailShareButton url="https://www.neosofttech.com">
                     <EmailIcon size={45}  logoFillColor="white" round={true}></EmailIcon>
                 </EmailShareButton>

                 <PinterestShareButton url="https://www.neosofttech.com" media={img}>
                     <PinterestIcon size={45}  logoFillColor="white" round={true}></PinterestIcon>
                 </PinterestShareButton>

             </div>
             <div className="container py-4">
                 {cartState.some((p)=>p.productId===props.item.id)?
                 (  <button onClick={removeFromCart} className="btn btn-info mr-2">Remove From Cart</button>):
                 (<button onClick={addToCart} className="btn btn-secondary">Add To Cart</button>)
                 }
                
             <button onClick={()=>setRateClicked(true)} className="btn btn-info ml-2">Rate Product</button>
             {
                 rateClicked?(
                    <Box component="fieldset" mb={3} borderColor="transparent">
                    <Typography component="legend">Rate Product</Typography>
                    <Rating
                      name="simple-controlled"
                      value={starValue}
                      onChange={(event, newValue) => {
                        setStarValue(newValue);
                      }}
                    />
                  </Box>
                 ):("")
             }
            
               
             </div>
             

            </div>
        </div>
    </div>
    )
}

export default ProductDetailCard
