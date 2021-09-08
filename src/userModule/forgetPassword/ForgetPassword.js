import React, { useState } from "react";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();


/**
 * @author Aakash Rajput
 * @description this method is takes the form inputs from the user and reset the password
 *  @param this method doesn't accept any parameter
 * @returns returns the JSX of the Forgot Password Page
 */
function ForgetPassword() {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  const currentPassword =watch("newPassword")

  const onSubmit = (data) => {
    console.log(data);
    const userObj = {
      token: data.code,
      password: data.newPassword,
      repeatPassword: data.confirmPassword,
    };
    axios
      .post("https://neostore-api.herokuapp.com/api/auth/set-password", userObj)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Password Changed successfully", {
            position: "top-center",
          });
          history.push("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container py-5">
      <div className="boxx">
        <div className="container">
          <h2 className="text-center h22">Recover Password</h2>
        </div>

        <hr class="solid"></hr>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              type="text"
              name="code"
              className="form-control custom"
              placeholder="Enter Verification Code"
              {...register("code", { required: true })}
            />
            <div className="form-text text-danger">
              {errors.code && "Verification code is required"}
            </div>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="newPassword"
              className="form-control custom"
              placeholder="New Password"
              {...register("newPassword", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password should be 6 digits long",
                },
              })}
              
            />
            {errors.newPassword && (
              <div className="form-text text-danger">
                {errors.newPassword.message}
              </div>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              name="confirmPassword"
              className="form-control custom"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Password is required",
                validate:value=>value===currentPassword || "Password Don't Match",
              })}

             
              
            />
            {errors.confirmPassword && (
              <div className="form-text text-danger">
                {errors.confirmPassword.message}
              </div>
            )}
           
           
          </div>
          <div>
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
