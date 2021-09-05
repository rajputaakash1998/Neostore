import React from 'react'
import { useForm } from "react-hook-form";
import classNames from "classnames";
import axios from 'axios';
import {useHistory} from "react-router-dom"
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

 /**
 * @author Aakash Rajput
 * @description this method takes the old ad new passwords ad updates the password
 * @returns returns the JSX of the change password form
 */ 
function ChangePassword() {
const history=useHistory();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const currentPassword=watch("newPassword")
  
  const changePassword=async(data)=>{
    const token=localStorage.getItem("token");
  
    const config={
      method:"POST",
      url:"https://neostore-api.herokuapp.com/api/user/change-password",
      headers:{
        "Authorization":`${token}`
      },
      data:data
      
    }
    try{
    const response=await axios(config)
    console.log(response)
    if(response.status===200){
      toast.success("Password Changed Successfully",{position:'top-center'})
      history.push("/login")
    }
  }catch(error){
    toast.error(error.response.data.message,{position:'top-center'})
  }
  }
  const onSubmit=(data)=>{
    console.log(data)
    changePassword(data)
  }
    return (
        <div className="container py-2" style={{ boxShadow: "0px 0px 3px 0px gray" }}>
            <h3 className="text-center">Change Password</h3>
            <hr></hr>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    
                    <div className="form-group">
                    
                      <input style={{width:"350px",margin:"auto"}} type="text" name="password" placeholder="Old Password"
                     className={classNames("form-control", {
                      "is-invalid": errors.password,
                    })}
                    {...register("password", { required:"Password is Required" ,minLength:{
                        value:6,
                        message:"Password must be 6 digits"
                    } })}
                  />
                  {errors.password && (<div style={{width:"350px",margin:"auto"}} className="invalid-feedback">{errors.password.message}</div>)}
                    </div>
                    <div className="form-group">
                      <input style={{width:"350px",margin:"auto"}} type="text" name="newPassword" placeholder="New Password"
                      className={classNames("form-control", {
                        "is-invalid": errors.newPassword,
                      })}
                      {...register("newPassword", { required:"Password is Required" ,minLength:{
                          value:6,
                          message:"Password must be 6 digits"
                      } })}
                    />
                    {errors.newPassword && (<div style={{width:"350px",margin:"auto"}} className="invalid-feedback">{errors.newPassword.message}</div>)}
                    </div>
                    <div className="form-group">
                      <input style={{width:"350px",margin:"auto"}} type="text" name="confirmPassword" placeholder="Confirm Password"
                     className={classNames("form-control", {
                      "is-invalid": errors.confirmPassword,
                    })}
                    {...register("confirmPassword", { required:"Password is Required" ,validate:value=>value===currentPassword || "Password Don't Match",})}
                  />
                  {errors.confirmPassword && (<div style={{width:"350px",margin:"auto"}} className="invalid-feedback">{errors.confirmPassword.message}</div>)}
                    </div>
                    <div className="text-center">
                        <button className="btn btn-primary ">Submit</button>
                    </div>
                  
                </form>
            </div>
        </div>
    )
}

export default ChangePassword
