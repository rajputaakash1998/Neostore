import React from "react";
import {useHistory} from "react-router-dom"

function OrderCard(props) {
  
  const history=useHistory()
  const price=props.data.productId.price;
  const quantity=props.data.quantity;

  const total=Math.round(price +price*0.05)

  const invoiceObj={
    productName:props.data.productId.name,
    productDescription:props.data.productId.description,
    productPrice:price,
    productQuantity:quantity,
    productTotal:total,
    orderId:props.id,
    orderDate:props.createdAt

  }

 const onInvoiceDownload=()=>{
  localStorage.setItem("invoice",JSON.stringify(invoiceObj));
   history.push("/invoice")
   
  }
  return (
    <div className="py-2 mb-2" style={{ boxShadow: "0px 0px 3px 0px gray" }}>
      <div className="ml-2">
        <h5>Trasnsit Ordered By Order Id : {props.id}</h5>
        <p>Placed on : {props.createdAt}</p>
        <p>Price :{price}</p>
      </div>
      <hr></hr>
      <div className="ml-2">
        <img style={{ width: "100px", height: "100px" }} src={props.data.productId.mainImage} alt={props.data.productId.mainImage}/>
      </div>
      <div className="p-2">
        <h6>{props.data.productId.name}</h6>
      </div>
      <div className="p-2">
        <h6>Quantity :{quantity}</h6>
      </div>
      <div className="p-2">
        <h6>Total :{total}</h6>
      </div>
      <hr></hr>
      <div>
        <button onClick={onInvoiceDownload} className="btn btn-primary mb-2 ml-2">
          Download invoice as PDF
        </button>
      </div>
    </div>
  );
}

export default OrderCard;
