import React,{useState,useEffect} from 'react'
import img from "../../images/aston.jpg"
import "./productDetail.css"
import { useParams } from 'react-router';
import axios from "axios"
import ProductDetailCard from './ProductDetailCard';
import {BeatLoader} from "react-spinners"


function ProductDetail() {
   
    const [products,setProducts]=useState([]);
    const {id}=useParams();

async function fetchProduct(){
  const response=await  axios.get('https://neostore-api.herokuapp.com/api/product?limit=20')
  console.log("Response",response)
  setProducts(response.data.data.docs)

}
  useEffect(()=>{
   fetchProduct()
 },[])
 console.log("products",products)

 const details=products.filter((product,index)=>{
     return product._id===id
 })
  console.log("details",details)


  
 
    return (
        <>
        {products.length===0?(
          <div style={{textAlign:"center"}}><BeatLoader size={72} color="red"/></div>
            ):(
                <div>
                  {
                     details.map((item)=>{
                         return <ProductDetailCard item={item}/>
                     })
                 }
                </div>
                  
            )}
            </>
        
    )
}

export default ProductDetail
