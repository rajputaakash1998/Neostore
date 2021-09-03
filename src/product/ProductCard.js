import React, { useState, useEffect } from "react";

import Rating from "@material-ui/lab/Rating";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/Context";
import { useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function ProductCard(props) {
  const { cartState, dispatch } = useContext(CartContext);

  const history = useHistory();

  const addToCart = async () => {
    if (!localStorage.getItem("token")) {
      alert("Login First");
      history.replace("/login");
    }
    const token = localStorage.getItem("token");
    const productData = {
      productId: props.data.id,
      quantity: 1,
    };
    const config = {
      method: "post",
      url: "https://neostore-api.herokuapp.com/api/cart",
      data: productData,
      headers: {
        Authorization: `${token}`,
      },
    };
    console.log("This is Add product", productData);
    try {
      const response = await axios(config);
      console.log(response);
      if (response.status === 200) {
        dispatch({ type: "ADD_TO_CART", payload: productData });
        toast.success("Product Added Successfully", { position: "top-center" });
      }
    } catch (error) {
      toast.error(error.response.data.message, { position: "top-center" });
    }
  };
  return (
    <div className="col-md-4 mb-3 mt-1 ">
      <div className="card" style={{ width: "18rem", height: "25rem" }}>
        <Link to={`/productDetail/${props.data._id}`}>
          <img
            style={{ height: "200px" }}
            src={props.data.mainImage}
            className="card-img-top"
            alt={props.data.mainImage}
          />
        </Link>

        <div className="card-body bg-light text-center">
          <div className="mb-2">
            <h6 className="font-weight-semibold mb-2">{props.data.name}</h6>
          </div>
          <h3 className="mb-0 font-weight-semibold">{props.data.price}</h3>
          <div>
            <Rating name="read-only" value={props.data.avgRating} readOnly />
          </div>
          {cartState.some((p) => p.productId === props.data._id) ? (
            <button className="btn btn-danger bg-cart">
              <i className="fa fa-shopping-cart mr-2"></i>"Go To Cart
            </button>
          ) : (
            <button onClick={addToCart} className="btn btn-danger bg-cart">
              <i className="fa fa-shopping-cart mr-2"></i>"Add To Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
