import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {useHistory} from "react-router-dom"
/**
 * @author Aakash Rajput
 * @description this method is takes the form inputs from the user and reset the password
 *  @param this method doesn't accept any parameter
 * @returns returns the JSX of the Forgot Password Page
 */
function Forgot() {
 const history=useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) =>{
      console.log(data)
      const userObj={
        email:data.email
      }
      const config={
        method:'post',
        url:'https://neostore-api.herokuapp.com/api/auth/forgot-password',
        data:userObj
      }
      axios(config)
      .then((response=>{
        console.log(response)
        if(response.status===200){
           history.push('/forgotPassword')
        }
      }))
      .catch((error)=>{
        console.log(error)
      })
  }

  return (
    <div
      className="container mt-4 mb-4"
      style={{ boxShadow: "0px 0px 3px 0px", width: "600px" }}
    >
        <form onSubmit={handleSubmit(onSubmit)}>

      
      <div className="text-center py-2">
        <h3>Enter your email Address for verification code</h3>
      </div>
      <div className="form-group py-3 ">
      
        <input
          style={{ width: "400px", margin: "auto" }}
          type="email"
          name="email"
          placeholder="Email Address"
          className="form-control"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
              message: "Please enter a valid email address",
            },
          })}
        />
        {errors.email && (
          <div style={{marginLeft:"100px"}}className="form-text text-danger">{errors.email.message}</div>
        )}
       
      </div>
      <div className="text-center py-2">
        <button className="btn btn-primary">Submit</button>
      </div>
      </form>
    </div>
  );
}

export default Forgot;
