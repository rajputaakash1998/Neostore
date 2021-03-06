import React from "react";

import Rating from "@material-ui/lab/Rating";
import { useHistory, NavLink } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/Context";
import { useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img from "../images/sofa.jpeg";
toast.configure();
/**
 * @author Aakash Rajput
 * @description this method renders the data of every individual card
 * @param this method takes mainImage,name,price,avgRating as props from the parent component
 * @returns returns the JSX of the product card
 */
function ProductCard(props) {
  const { cartState, dispatch } = useContext(CartContext);

  const history = useHistory();
  let mainImage = "";
  let image = props.data.mainImage;
  if (image === undefined) {
    mainImage = img;
  } else {
    mainImage = props.data.mainImage;
  }
  const addToCart = async () => {
    if (!localStorage.getItem("token")) {
      toast.info("Please Login Frist", { position: "top-center" });
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

    try {
      const response = await axios(config);

      if (response.status === 200) {
        dispatch({ type: "ADD_TO_CART", payload: productData });
        toast.success("Product Added Successfully", {
          position: "bottom-center",
        });
      }
    } catch (error) {
      toast.error(error.response.data.message, { position: "bottom-center" });
    }
  };

  return (
    <div className="col-4 mb-3 mt-1 ">
      <div className="card" style={{ width: "18rem", height: "25rem" }}>
        <NavLink to={`products/${props.data._id}`}>
          <img
            style={{ height: "200px" }}
            src={mainImage}
            className="card-img-top"
            alt={mainImage}
          />
        </NavLink>

        <div className="card-body bg-light text-center">
          <div className="mb-2">
            <h6 className="font-weight-semibold mb-2">{props.data.name}</h6>
          </div>
          <h3 className="mb-0 font-weight-semibold">{props.data.price}</h3>
          <div>
            <Rating name="read-only" value={props.data.avgRating} readOnly />
          </div>
          {cartState.some((p) => p.productId === props.data._id) ? (
            <button
              className="btn btn-danger bg-cart"
              onClick={() => history.replace("/cart")}
            >
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
