import React, { useState, useEffect } from "react";

import CartCard from "./CartCard";
import axios from "axios";
import { CartContext } from "../context/Context";
import { useContext } from "react";
import img from "../images/emptycart.png";
import { useHistory } from "react-router-dom";
import { BeatLoader } from "react-spinners";
/**
 * @author Aakash Rajput
 * @description this method fetches the cart data from the api and then renders individual cart item
 * @param this method doesn't accept any parameters
 * @returns returns the JSX of the Cart page
 */
function Cart() {
  const { cartState } = useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [gst, setGst] = useState(0);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const fetchCartData = async () => {
    setLoading(true);

    const token = localStorage.getItem("token");
    const config = {
      method: "get",
      url: "https://neostore-api.herokuapp.com/api/cart",
      headers: {
        Authorization: `${token}`,
      },
    };

    console.log(gst);

    const response = await axios(config);
    setLoading(false);
    console.log(response);
    console.log(response.data.data.products);

    setGrandTotal(response.data.data.grandTotal);
    setCartItems(response.data.data.products);
  };
  useEffect(() => {
    const GST = Math.round((grandTotal * 5) / 100);
    setGst(GST);
  });
  useEffect(() => {
    fetchCartData();
  }, [cartState]);

  const onClickBuy = () => {
    if (localStorage.getItem("token")) {
      history.push("/address");
    } else {
      history.push("/login");
    }

  };

  return (
    
    
    <div className="p-4 custom-container">
      <div className="row">
        <div className="col-md-8">
          <div className="cart-box">
            <div className="container p-2 ">
              {loading ? (
                <div style={{ textAlign: "center" }}>
                  <BeatLoader size={72} color="red" />
                </div>
              ) : cartItems.length === 0 ? (
                <>
                  <div className="text-center">
                    <img
                      className="text-center"
                      style={{ width: "200px", height: "200px" }}
                      src={img}
                      alt={img}
                    />
                  </div>
                  <p
                    style={{ fontSize: "20px", fontWeight: "bold" }}
                    className="text-center  text-dark mt-4"
                  >
                    Your shopping cart Is empty !
                  </p>
                  <div className="text-center">
                    <button
                      onClick={() => history.push("/products")}
                      className="btn  btn-outline-secondary "
                    >
                      CONTINUE SHOPPING
                    </button>
                  </div>
                </>
              ) : (
                <div className="d-flex">
                  <p style={{ marginLeft: "5px" }}>Product</p>
                  <p style={{ marginLeft: "270px" }}>Quantity</p>
                  <div className="d-flex ">
                    <p style={{ marginLeft: "170px" }}>Price</p>
                    <p style={{ marginLeft: "100px" }}>Total</p>
                  </div>
                </div>
              )}
            </div>

            {cartItems.map((item) => {
              return <CartCard product={item} />;
            })}
          </div>
        </div>

        <div className="col-md-4">
          <div class="card" style={{ width: "18rem" }}>
            <div class="card-body">
              <h4 class="card-title">Review Order</h4>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex justify-content-between">
                <div>Subtotal</div>
                <div>{grandTotal}</div>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <div>GST(5%)</div>
                <div>{gst}</div>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <div>Order Total</div>
                <div>{grandTotal + gst}</div>
              </li>
            </ul>
            <div class="card-body">
              <button
                onClick={onClickBuy}
                className="btn btn-primary btn-block"
              >
                Proceed To Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default Cart;
