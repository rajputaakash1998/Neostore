import React from "react";

import { useForm } from "react-hook-form";
import classNames from "classnames";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import TwitterLogin from "react-twitter-login/dist/";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();


/**
 * @author Aakash Rajput
 * @description this method is takes the form inputs from the user and regiters the user
 * @returns returns the JSX of the registration Form
 */

function Register() {
  const history = useHistory();

  const responseGoogle = (response) => {
    console.log(response);
  };

  const responseFacebook = (response) => {
    console.log(response);
  };
  const authHandler = (err, data) => {
    console.log(err, data);
  };

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  const currentPassword = watch("password");

  const onSubmit = (data) => {
    console.log(data.firstName);

    const userObj = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      mobile: data.mobile,
      gender: data.gender,
      password: data.password,
      confirm_password: data.confirm_password,
    };

    console.log(userObj);
    axios
      .post("https://neostore-api.herokuapp.com/api/auth/register", userObj)
      .then((response) => {
        console.log(response);

        if (response.status === 200) {
          toast.success("Registration Successful", { position: "top-center" });
          history.push("/login");
        }
      })
      .catch((error) => {
        toast.info(error.response.data.message, { position: "top-center" });
      });
  };

  console.log(errors);
  return (
    <>
      <div className="container py-5 ">
        <div className="socials">
          <GoogleLogin
            clientId="366024336343-003ajte9itopgka1ee3bv4fhg0qe3hi8.apps.googleusercontent.com"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="btn btn-danger btn-lg btn-block socials"
              >
                <i
                  style={{ marginRight: "5px" }}
                  className="fa fa-google icon"
                ></i>
                Login with Google
              </button>
            )}
          />
          <FacebookLogin
            appId="560717078454282"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="btn btn-primary btn-lg btn-block socials"
              >
                <i
                  style={{ marginRight: "5px" }}
                  className="fa fa-facebook icon"
                ></i>
                Login with Facebook
              </button>
            )}
          />

          <TwitterLogin
            authCallback={authHandler}
            consumerKey="fARIugutAH0edNvaHLeF9Zoch"
            consumerSecret="dbKkHi8MW2DIBMgthnxV2VzLtIlsjuKB3jDmKHTK1l35kJuF5A"
            className="btn btn-info btn-lg btn-block"
          >
            <i
              style={{ marginRight: "5px" }}
              className="fa fa-twitter icon"
            ></i>
            Login With Twitter
          </TwitterLogin>
        </div>
        <div className="box">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="text-center">
              <h2 className="py-4">Register to NeoStore</h2>
            </div>
            <div className="form-group ">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className={classNames("form-control", {
                  "is-invalid": errors.firstName,
                })}
                {...register("firstName", {
                  required: "This field is required",
                  minLength: {
                    value: 4,
                    message: "Minimum 4 characters required",
                  },
                })}
              />
              {errors.firstName && (
                <div className="invalid-feedback">
                  {errors.firstName.message}
                </div>
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className={classNames("form-control", {
                  "is-invalid": errors.lastName,
                })}
                {...register("lastName", {
                  required: "Lastname is required",
                  minLength: {
                    value: 3,
                    message: "Length should be greater than 3",
                  },
                })}
              />
              {errors.lastName && (
                <div className="invalid-feedback">
                  {errors.lastName.message}
                </div>
              )}
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className={classNames("form-control", {
                  "is-invalid": errors.email,
                })}
                {...register("email", {
                  required: "This field is required",
                  pattern: {
                    value:
                      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={classNames("form-control", {
                  "is-invalid": errors.password,
                })}
                {...register("password", {
                  required: "Password is Required",
                  minLength: {
                    value: 6,
                    message: "Password must be 6 digits",
                  },
                })}
              />
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </div>
            <div className="form-group wrapper">
              <input
                type="password"
                name="confirm-password"
                placeholder="Confirm Password"
                className={classNames("form-control", {
                  "is-invalid": errors.confirm_password,
                })}
                {...register("confirm_password", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === currentPassword || "The Password do no match",
                })}
              />
              <i class="fa fa-eye"></i>
              {errors.confirm_password && (
                <div className="invalid-feedback">
                  {errors.confirm_password.message}
                </div>
              )}
            </div>
            <div className="form-group">
              <input
                type="number"
                name="mobile"
                placeholder="Phone Number"
                className={classNames("form-control", {
                  "is-invalid": errors.mobile,
                })}
                {...register("mobile", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Please Enter a valid 10 digit phone number",
                  },
                })}
              />
              {errors.mobile && (
                <div className="invalid-feedback">{errors.mobile.message}</div>
              )}
              <p
                style={{ marginLeft: "10px" }}
                className="form-label text-muted"
              >
                Max 10
              </p>
            </div>
            <div class="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="male"
                {...register("gender", { required: "This is required" })}
              />
              <label className="form-check-label">Male</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="female"
                {...register("gender", { required: "This is required" })}
              />
              <label className="form-check-label">Female</label>
            </div>
            {errors.gender && (
              <div
                style={{ marginLeft: "5px" }}
                className="form-text text-danger"
              >
                {errors.gender.message}
              </div>
            )}

            <div className="mt-2">
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
