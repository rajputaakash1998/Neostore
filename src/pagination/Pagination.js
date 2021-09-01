import React,{useState,useEffect} from 'react'

function Pagination({showPerPage,onPaginationChange,total}) {
const[counter,setCounter]=useState(1);

const val=Math.ceil(total/showPerPage)
//const [noOfButtons,setNoOfButtons]=useState(val);
const arr = new Array(val).fill(0);

useEffect(()=>{
  const value=showPerPage*counter;
  onPaginationChange(value-showPerPage,value)
},[counter])

console.log(arr);
//console.log("number od buttons",noOfButtons)
console.log('val',val)

const onButtonClick=(type)=>{
if(type === "prev"){
    if(counter === 1){
        setCounter(1)
    }else{
        setCounter(counter-1)
    }
}else if(type=== "next"){
  if(val=== counter){
      setCounter(counter)
  }else{
      setCounter(counter+1)
  }
}
}

    return (
    <div className="d-flex justify-content-center">
    <nav style={{border:"none"}} class=" navbar-light bg-light" >
   <ul className="pagination">
    <li class="page-item"><a class="page-link" href="#" onClick={()=>onButtonClick("prev")}>Previous</a></li>
   
     {
        arr.map((el,index)=>(
            <li class={`page-item ${index+1 ===counter ? "active" : null}`} key={index}>
            <a class="page-link" href="#" onClick={()=>setCounter(index+1)}>
                {index+1}
            </a>
            </li>
        ))
    } 
     {/* <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li> */}
     <li class="page-item"><a class="page-link" href="#" onClick={()=>onButtonClick("next")}>Next</a></li>
  </ul>
</nav> 

              
            {/* <button className="btn btn-primary" onClick={()=>onButtonClick("prev")}>Previous</button>
            <button className="btn btn-primary" onClick={()=>onButtonClick("next")}>Next</button> */}
        </div>
    )
}

export default Pagination
