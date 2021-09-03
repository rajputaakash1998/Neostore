

import React from 'react'



function IndividualOrder(props) {
  
    
    const price=props.data.productId.price;
    const quantity=props.data.quantity;
  
    const total=Math.round((price +price*0.05)*quantity)
  
    
       
        
       
    return (
        <>
        <div className="ml-2">
        <img style={{ width: "100px", height: "100px" }} src={props.data.productId.mainImage} alt={props.data.productId.mainImage}/>
      </div>
      <div className="p-2">
      <h6>Price :{props.data.productId.price}</h6>
      </div>
      <div className="p-2">
        <h6>Name :{props.data.productId.name}</h6>
      </div>
      <div className="p-2">
        <h6>Quantity :{props.data.quantity}</h6>
      </div>
      <div className="p-2">
        <h6>Description :{props.data.productId.description}</h6>
      </div>
      <div className="p-2">
          <h6>Total :{total}</h6>
      </div>
     
        </>
    )
}

export default IndividualOrder
