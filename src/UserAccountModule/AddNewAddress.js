import React,{useState} from 'react';
import {useForm} from "react-hook-form";
import classNames from "classnames";
import axios from "axios"
import {useHistory} from "react-router-dom"
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


toast.configure();

 /**
 * @author Aakash Rajput
 * @description this method is used to add a new addres
 * @param this method doesn't accept any parameter
 * @returns returns the JSX of the add address page
 */

function AddNewAddress() {

  const history=useHistory();


    const [count,setCount]=useState(0);
    
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      mode: "onChange",
    });
  
    function handleChange(e){
      setCount(e.target.value.length)
    
    }
    const sendData=async(data)=>{
       const token=localStorage.getItem("token");
       const config={
         method:"post",
         url:"https://neostore-api.herokuapp.com/api/user/address",
         headers:{
           "Authorization":`${token}`
         },
         data:data
       }
       try{
        const response= await axios(config)
        console.log(response)
        if(response.status===200){
          toast.success("Address added successfully !",{position:'bottom-center'})
          history.push("/address")
        }
       }catch(error){
         
        toast.error(error.response.data.message,{position:"bottom-center"})
       }
      
    }
    const onSubmit=(data)=>{
      console.log(data)
      sendData(data)

    }
    return (
        <div style={{ boxShadow: "0px 0px 3px 0px gray" }} className="container py-3">
            <h3>Add New Address</h3>
            <hr></hr>
            <form onSubmit={handleSubmit(onSubmit)}>
  <div class="form-row">
    <div class="form-group col-md-4">
        <textarea name="addressLine" placeholder="Address" maxLength="100" 
        
       className={classNames("form-control", {
        "is-invalid": errors.addressLine,
      })}
      {...register("addressLine", {
        required: "This field is required",
        minLength: {
          value: 6,
          message: "Addres should have minimum 6 characters",
        },
      })}
      onChange={handleChange}
      
    />
    {errors.addressLine && (
      <div className="invalid-feedback">{errors.addressLine.message}</div>
    )}
        <div className=" text-muted">
            <span>Max 100 Character</span>
            <span className="ml-4">{count}/100</span>
        </div>
    </div>
    
  </div>
  <div style={{width:"200px"}} class="form-group">
    <input type="text" name="pincode" class="form-control"  placeholder="Pincode"
     className={classNames("form-control", {
      "is-invalid": errors.pincode,
    })}
    {...register("pincode", {
      required: "This field is required",
      minLength: {
        value: 6,
        message: "Pin should have 6 digits",
      },
    })}
    
  />
  {errors.pincode && (
    <div className="invalid-feedback">{errors.pincode.message}</div>
  )}
  </div>
 
  <div class="form-row">
    <div class="form-group col-md-4">
    
      <input type="text" class="form-control" name="city" placeholder="City"
     className={classNames("form-control", {
      "is-invalid": errors.city,
    })}
    {...register("city", {
      required: "This field is required",
      pattern: {
        value: /^[a-zA-Z ]+$/,
        message: "Please enter a valid City name",
      },
    })}
    
  />
  {errors.city && (
    <div className="invalid-feedback">{errors.city.message}</div>
  )}
    </div>
    <div class="form-group col-md-4">
    <input type="text" name="state" class="form-control" placeholder="State"
    className={classNames("form-control", {
      "is-invalid": errors.state,
    })}
    {...register("state", {
      required: "This field is required",
      pattern: {
        value: /^[a-zA-Z ]+$/,
        message: "Please enter a valid State name",
      },
    })}
    
  />
  {errors.state && (
    <div className="invalid-feedback">{errors.state.message}</div>
  )}
    </div>
    
  </div>
  <div style={{width:"200px"}} class="form-group">
   
      <input class="form-control" name="country" type="text" placeholder="Country"
       className={classNames("form-control", {
        "is-invalid": errors.country,
      })}
      {...register("country", {
        required: "This field is required",
        pattern: {
          value: /^[a-zA-Z ]+$/,
          message: "Please enter a valid Country name",
        },
      })}
      
    />
    {errors.country && (
      <div className="invalid-feedback">{errors.country.message}</div>
    )}
     
    
  </div>
 
  <div >
    <button type="submit" className="btn btn-secondary mr-2"><i class="fa fa-save mr-2"></i>Save</button>
    <button className="btn btn-secondary"><i class="fa fa-times mr-2"></i>Cancel</button>
</div>
</form>

<hr></hr>
  </div>
 )
}

export default AddNewAddress
