import React,{useState} from 'react'
import { useContext } from 'react'
import { ImageContext } from '../context/Context'
import { useHistory } from 'react-router'


import {Carousel} from "react-bootstrap"


/**
 * @author Aakash Rajput
 * @description this method is responsible for the image carousel filter functionality
 * @param this method accept props from the parent component,It accept the mainImage prop from parent
 * @returns it returns the JSX of the Image Carousel Component
 */
function CarouselPage(props) {
  
  const history=useHistory();

  const {image,imageDispatch}=useContext(ImageContext);
    
    function onCarouselImageClick(item){
      console.log(item.category.name)
      imageDispatch({type:"IMAGE_FILTER",payload:item.category.name})
      history.push("/products")
    }
    return (
    
    <>
    <Carousel>
      {props.data.map((product,index)=>(
        
        <Carousel.Item>
          <img
            style={{width:"100%"}}
            src={product.mainImage}
            alt={product.mainImage}
            onClick={()=>onCarouselImageClick(product)}
          />
         
        </Carousel.Item>
       
     
      ))}
       </Carousel>
    </>
        
    
    
    
    )
}

export default CarouselPage
