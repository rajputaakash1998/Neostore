import React,{useState,useEffect} from "react";
import Pagination from "../pagination/Pagination";
import ProductCard from "./ProductCard";
import axios from "axios"
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {BeatLoader} from "react-spinners"
import {SearchContext} from "../context/Context"
import { useContext } from "react";

function Products() {
  const{searchState,searchDispatch}=useContext(SearchContext);

    const[data,setData]=useState([]);
    
    const [color,setColor]= useState([]);
    const [category,setCateory]= useState([]);

    const[sort,setSort]=useState("");

    const[fetchByColor,setFetchByColor]=useState("");
    const[fetchByCategory,setFetchByCategory]=useState("");
    const[fetchByOrder,setFetchByOrder]=useState("");
    const[fetchBySort,setFetchBySort]=useState("");

    const [loading,setLoading]= useState(false);



    const [showPerPage,setShowPerPage]=useState(6);
    const [pagination,setPagination]=useState({
        start:0,
        end:showPerPage
    });
     
    
    const onSearch=()=>{
      if(searchState === "table")
    setFetchByCategory("6065c425f45ada6429eb42c9")
    else if(searchState === "sofa")
     setFetchByCategory("6065c3a524fe1963df4f2d16")
    else if(searchState === "bed")
        setFetchByCategory("6065c425f45ada6429eb42c7")
    else if(searchState === "cupboard") 
        setFetchByCategory("6065c425f45ada6429eb42c7") 
          
      }
    
    const listCategory= async ()=>{
      const response=await axios.get('https://neostore-api.herokuapp.com/api/category');
      console.log(response)
      setCateory(response.data.data)
      
    }

    const listColor= async ()=>{
      const response=await axios.get('https://neostore-api.herokuapp.com/api/color');
      console.log(response)
      setColor(response.data.data)
      console.log("color",color)
    }

    const onCategoryChange=(e)=>{
      console.log(e.target.value)
      setFetchByCategory(e.target.value)
    }
    const onColorChange=(e)=>{
      console.log(e.target.value)
      setFetchByColor(e.target.value)

    }
    const onSortChange=(e)=>{
      setSort(e.target.value)
     if(e.target.value==="rating"){
       setFetchBySort("rating")
       setFetchByOrder("desc");
     }else if(e.target.value==="low to high"){
      setFetchBySort("price")
      setFetchByOrder("asc");
     }else if(e.target.value==="high to low"){
      setFetchBySort("price")
      setFetchByOrder("desc");
     }

      // sortProducts()
    }
    console.log(fetchByOrder);
    console.log(fetchBySort);
    console.log("category",fetchByCategory);
    console.log("color",fetchByColor);
    const fetchData=async()=>{
      setLoading(true);
      let url='https://neostore-api.herokuapp.com/api/product?limit=20';
      if(fetchByCategory!==""){
        url=url+`&category=${fetchByCategory}`
      }
      if(fetchByColor!==""){
       url=url+`&color=${fetchByColor}`
      }
      if(fetchBySort!==""){
        url=url+`&sortby=${fetchBySort}&orderby=${fetchByOrder}`
      }
      

      console.log(url)
      const response=await axios.get(url);
      setLoading(false)
      console.log("This is Api response",response)
      setData(response.data.data.docs);
      console.log(data.length)
      }
    const allProducts=()=>{
      setFetchByCategory("");
      setFetchByColor("");
      setFetchBySort("");
      setFetchByOrder("");
    }
    
    useEffect(()=>{
        fetchData();
        listCategory();
        listColor();
    },[fetchByColor,fetchByOrder,fetchBySort,fetchByCategory]);

    useEffect(()=>{
      onSearch()
    },[searchState])
const onPaginationChange=(start,end)=>{
   setPagination({start:start,end:end})
}
console.log("searchState",searchState)
console.log("category",category)

// const sortProducts=()=>{
  
//     if(sort!==''){
//      let sortedData= data.sort((a,b)=>(data.sort==='lowest')?(a.price>b.price?1:-1):(a.price<b.price?1:-1))
//      setData(sortedData)
//     }else{
//       let sortedData= data.sort((a,b)=>(a.avgRating>b.avgRating?1:-1))
//       setData(sortedData)
//     }
// }
// console.log(sort)
console.log(data)
console.log(color)
console.log(category)
  return (
    <div className="m-4">
      <div className="row ">
        <div className="col-md-3">
          <div className="container  d-flex flex-column">
            <button className="btn btn-dark mt-3" onClick={allProducts}>All Products</button>
            
            {/* <button className="btn btn-dark  mt-3">Colors</button> */}
            <label className="form-label">Category
              <select className="form-control" value={fetchByCategory} onChange={onCategoryChange}>
              <option value="select">Select</option>
                {category.map((category)=>{
                  return <option value={category.id}>{category.name}</option>
                })}

              </select> 
             </label>
             <label className="form-label">Color
              <select className="form-control" value={fetchByColor} onChange={onColorChange}>
                <option value="select">Select</option>
                {color.map((color)=>{
                  return <option value={color.id}>{color.name}</option>
                  
                })}

              </select>
            </label>
             
            <label className="form-label">Order by
              <select className="form-control" value={sort} onChange={onSortChange}>
                <option value="select">Select</option>
                <option value="rating">Rating</option>
                <option value="low to high">Low to high</option>
                <option value="high to low">High to low</option>

              </select>
            </label>
          </div>
        </div>

        <div className="col-md-9">
            <div className="container">
            {loading ?( <div style={{textAlign:"center"}}><BeatLoader size={72} color="red" /></div>):("")}
                <div className="row">
                {data.slice(pagination.start,pagination.end).map((item)=>(
               <ProductCard data={item} key={item.id} />
            ))}
                </div>
                <Pagination total={data.length} showPerPage={showPerPage} onPaginationChange={onPaginationChange}/>
            </div>
            
          
        </div>
      </div>
    </div>
  );
}

export default Products;
