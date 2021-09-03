import React from 'react'
import { Document, Page, Text, View,PDFViewer} from '@react-pdf/renderer';
import { ToastContainer } from 'react-bootstrap';



function Invoice() {
    const invoice=JSON.parse(localStorage.getItem("invoiceObj"));
    console.log("Invoice",invoice)
    let total=0;
    invoice.items.forEach((item)=>{
      total=total+item.quantity*item.productId.price
    })
    return (
        <PDFViewer style={{width:"100%",height:"600px"}}>
        <Document>
        <Page size="A4">
        <View >
        <Text style={{fontSize:"25px",marginLeft:"250px",padding:"5px",marginTop:"5px"}}>INVOICE</Text>
        
        
        </View>
       
      {invoice.items.map((item)=>(
           <View style={{marginTop:"5%",marginLeft:"100px"}}>
           <Text style={{marginLeft:"10px",marginTop:"25px"}}>Name :           {item.productId.name}</Text>
          <Text style={{marginLeft:"10px",marginTop:"25px"}}>Description :   {item.productId.description}</Text>
          <Text style={{marginLeft:"10px",marginTop:"25px"}}>Order Id :        {invoice.orderId}</Text>
          <Text style={{marginLeft:"10px",marginTop:"25px"}}>Order Date :    {invoice.createdAt}</Text>
          <Text style={{marginLeft:"10px",marginTop:"25px"}}>Quantity :        {item.quantity}</Text>
          <Text style={{marginLeft:"10px",marginTop:"25px"}}>Price :            {item.productId.price}</Text>
          <Text style={{marginLeft:"10px",marginTop:"25px"}}>SubTotal :       {item.productId.price*item.quantity}</Text> 
      </View>

      ))}
      <View style={{marginTop:"5%",marginLeft:"100px"}}>
      <Text style={{marginLeft:"10px",marginTop:"25px",fontSize:"30px",fontWeight:"bold"}}>Grand Total(5% GST) : {Math.round(total+total*0.05)}</Text> 
      </View>
     
      
        </Page>
      </Document>
     </PDFViewer> 
    )
}

export default Invoice
