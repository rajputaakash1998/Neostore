import React from 'react'
import img from "./assets/page.jpg"

function PageNotFound() {
    return (
        <div className="container" style={{marginLeft:"150px"}}>
            {/* <div className="text-center mt-5">
            <h3 style={{color:"red"}}>This Page Doesn't Exists..</h3>
            </div> */}
            <div className="mt-4 mb-4">
            <img src={img} atlt={img}/>
            </div>

         
            
        </div>
    )
}

export default PageNotFound
