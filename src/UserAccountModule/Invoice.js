import React from 'react'
import { Document, Page, Text, View,PDFViewer} from '@react-pdf/renderer';



function Invoice() {
    const invoice=JSON.parse(localStorage.getItem("invoice"));
    return (
        <PDFViewer style={{width:"100%",height:"600px"}}>
        <Document>
        <Page size="A4">
        <View >
        <Text style={{fontSize:"25px",marginLeft:"250px",padding:"5px"}}>InVoice</Text>
        </View>

      <View style={{marginTop:"10%",marginLeft:"100px"}}>
          <Text style={{marginLeft:"10px",marginTop:"25px"}}>Name :           {invoice.productName}</Text>
          <Text style={{marginLeft:"10px",marginTop:"25px"}}>Description :   {invoice.productDescription}</Text>
          <Text style={{marginLeft:"10px",marginTop:"25px"}}>Order Id :        {invoice.orderId}</Text>
          <Text style={{marginLeft:"10px",marginTop:"25px"}}>Order Date :    {invoice.orderDate}</Text>
          <Text style={{marginLeft:"10px",marginTop:"25px"}}>Quantity :        {invoice.productQuantity}</Text>
          <Text style={{marginLeft:"10px",marginTop:"25px"}}>Price :            {invoice.productPrice}</Text>
          <Text style={{marginLeft:"10px",marginTop:"25px"}}>SubTotal :       {invoice.productTotal}</Text>
      </View>
      
        </Page>
      </Document>
     </PDFViewer> 
    )
}

export default Invoice
