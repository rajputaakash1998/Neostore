import React from 'react'
import { useForm } from "react-hook-form";
import classNames from "classnames";
import axios from 'axios';
import {useHistory} from "react-router-dom"

function ChangePassword() {
const history=useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  
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
    const response=await axios(config)
    console.log(response)
    if(response.status===200){
      alert("Password Changed Successfully")
      history.push("/login")
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
                    {...register("confirmPassword", { required:"Password is Required" ,minLength:{
                        value:6,
                        message:"Password must be 6 digits"
                    } })}
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
