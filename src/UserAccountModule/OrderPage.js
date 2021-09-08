import React, { useState, useEffect } from "react";
import img from "../images/aston.jpg";
import AccountCard from "./AccountCard";

import axios from "axios";
import { BeatLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import IndividualOrder from "./IndividualOrder";

/**
 * @author Aakash Rajput
 * @description this method fetces the orders data from the apis and show it on the order page
 *  @param this method doesn't accept any parameter
 * @returns returns the JSX of the Order Page
 */
function OrderPage() {
  const history = useHistory();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("please log in first!");
      return history.replace("/login");
    }
    setLoading(true);
    const config = {
      method: "GET",
      url: "https://neostore-api.herokuapp.com/api/order",
      headers: {
        Authorization: `${token}`,
      },
    };

    const response = await axios(config);
    setLoading(false);
    console.log("Orders", response.data.data.orders);
    setOrders(response.data.data.orders);
  };

  const setInvoiceData = (order) => {
    const invoiceObj = {
      items: order.items,
      orderId: order.id,
      createdAt: order.createdAt,
    };
    localStorage.setItem("invoiceObj", JSON.stringify(invoiceObj));
    history.push("/invoice");
  };

  useEffect(() => {
    fetchOrders();
  }, []);


  return (
    <div className="container py-4">
      <h5>My Account</h5>
      <hr></hr>
      <div className="row">
        <AccountCard img={img} />

        <div className="col-md-8 ">
          {loading ? (
            <div style={{ textAlign: "center" }}>
              <BeatLoader size={72} color="red" />
            </div>
          ) : (
            ""
          )}

          {orders.map((order, index) => {
            const result = order.items.reduce(function (tot, item) {
              return tot + item.productId.price * item.quantity;
            }, 0);
            const subTotal = Math.round(result + result * 0.05);
            console.log("Result", result);
            return (
              <div
                className="py-2 mb-2"
                style={{ boxShadow: "0px 0px 3px 0px gray" }}
              >
                <div className="ml-2">
                  <h5>Trasnsit Ordered By Order Id : {order.id}</h5>
                  <p>Placed on : {order.createdAt}</p>
                </div>
                <hr></hr>
                {order.items.map((item, index) => {
                  return (
                    <>
                      {" "}
                      <IndividualOrder
                        data={item}
                        orderId={order.id}
                        createdAt={order.createdAt}
                      />
                      <hr></hr>
                    </>
                  );
                })}

                <div className="p-2">
                  <h4>Total:{subTotal}</h4>
                </div>
                <div>
                  <button
                    onClick={() => setInvoiceData(order)}
                    className="btn btn-primary mb-2 ml-2"
                  >
                    Download invoice as PDF
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
