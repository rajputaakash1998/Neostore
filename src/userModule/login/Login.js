import React,{useEffect} from "react";

import { NavLink, useHistory ,Redirect} from "react-router-dom";
import { useForm } from "react-hook-form";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import TwitterLogin from "react-twitter-login/dist/";
import axios from "axios";
import { useContext } from "react";
import { LoginContext } from "../../context/Context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

/**
 * @author Aakash Rajput
 * @description this method is takes the form inputs from the user and logs in the user
 * @param this method doesn't accept any parameter
 * @returns returns the JSX of the login Form
 */

function Login() {
  const history = useHistory();
  const { loginDispatch } = useContext(LoginContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://neostore-api.herokuapp.com/api/auth/login",
        data
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("fname", response.data.data.firstName);
        localStorage.setItem("lname", response.data.data.lastName);
        localStorage.setItem("email", response.data.data.email);
        localStorage.setItem("mobile", response.data.data.mobile);
        localStorage.setItem("gender", response.data.data.gender);
        loginDispatch({ type: "AUTH", payload: true });
        toast.success("Login SuccessFull", { position: "bottom-center" });
        history.push("/home");
      }
    } catch (error) {
      toast.error(error.response.data.message, { position: "bottom-center" });
      console.log(error.response.data.message);
    }
  };

  const responseGoogle = (response) => {
    console.log(response);
  };

  const responseFacebook = (response) => {
    console.log(response);
  };
  const authHandler = (err, data) => {
    console.log(err, data);
  };

  useEffect(() => {
    if(localStorage.getItem("token")){
       history.push("/home")
     }
  }, [])

  return (
    <div className="container heading ">
     
      <section className="vh-70">
        <div className="row d-flex jusitfy-content-center align-items-center">
          <div className="col-md-6 ">
            <div className="icons">
              <FacebookLogin
                appId=""
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="btn btn-primary btn-lg btn-block "
                  >
                    <i
                      style={{ marginRight: "5px" }}
                      className="fa fa-facebook icon"
                    ></i>
                    Sign in with Facebook
                  </button>
                )}
              />

              <TwitterLogin
                authCallback={authHandler}
                consumerKey=""
                consumerSecret=""
                className="btn btn-info btn-lg btn-block"
              >
                <i
                  style={{ marginRight: "5px" }}
                  className="fa fa-twitter icon"
                ></i>
                Sign in With Twitter
              </TwitterLogin>

              <GoogleLogin
                clientId=""
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="btn btn-danger btn-lg btn-block"
                  >
                    <i
                      style={{ marginRight: "5px" }}
                      className="fa fa-google icon"
                    ></i>
                    Sign in with Google
                  </button>
                )}
              />
            </div>
          </div>
          <div className="col-md-6 ">
            <div className="container py-5 h-100">
              <h1>Login</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form1Example13"
                    className="form-control form-control-lg"
                    placeholder="Email address"
                    name="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <div className="form-text text-danger">
                      {errors.email.message}
                    </div>
                  )}
                </div>
                <div class="form-outline mb-4">
                  <input
                    type="password"
                    id="form1Example23"
                    class="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password should be 6 digits long",
                      },
                    })}
                  />
                  {errors.password && (
                    <div className="form-text text-danger">
                      {errors.password.message}
                    </div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
            <div className="anchor ml-4">
              <span className="a1">
                <NavLink to="register">Register Now</NavLink>
              </span>
              <span>|</span>
              <span className="a2">
                <NavLink to="forgot">Forgot Password</NavLink>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
