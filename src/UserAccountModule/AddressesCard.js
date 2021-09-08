import axios from "axios";
import React, { useEffect, useState } from "react";

import { useHistory } from "react-router";
import { AddressContext, CartContext } from "../context/Context";
import { useContext } from "react";
import { BeatLoader } from "react-spinners";
import ModalComponent from "../ModalComponent";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
/**
 * @author Aakash Rajput
 * @description this method renders the data of each address
 *  @param this method accepts addressLine,city,country,pincoe,state as props from parent
 * @returns returns the JSX of the individual address card
 */
function AddressesCard(props) {
  const { cartState, dispatch } = useContext(CartContext);

  const { addressDispatch } = useContext(AddressContext);

  const [cartLength, setCartLength] = useState(0);

  const [loading, setloading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function confirmDelete() {
    deleteAddress();
  }
  const load = props.onLoad;
  const fetchCartData = async () => {
    setloading(true);
    const token = localStorage.getItem("token");
    const config = {
      method: "get",
      url: "https://neostore-api.herokuapp.com/api/cart",
      headers: {
        Authorization: `${token}`,
      },
    };
    const response = await axios(config);
    setloading(false);

    setCartLength(response.data.data.products.length);
  };
  useEffect(() => {
    fetchCartData();
  }, [cartState]);

  const addressObj = {
    addressId: props.address._id,
    addressLine: props.address.addressLine,
    pincode: props.address.pincode,
    city: props.address.city,
    state: props.address.state,
    country: props.address.country,
  };
  const onCheckOut = async () => {
    if (!localStorage.getItem("token")) {
      history.push("/login");
    } else {
      const token = localStorage.getItem("token");

      const orderObj = {
        addressId: props.address._id,
      };
      const config = {
        method: "POST",
        url: `https://neostore-api.herokuapp.com/api/order/place`,
        headers: {
          Authorization: `${token}`,
        },
        data: orderObj,
      };
      const response = await axios(config);

      if (response.status === 200) {
        toast.success("Order Placed Successfully", { position: "top-center" });
        dispatch({ type: "REMOVE_ALL" });
        history.push("/order");
      }
    }
  };

  const onClickEdit = () => {
    addressDispatch({ type: "SET_ADDRESS", payload: addressObj });
    history.push("/editAddress");
  };

  const deleteAddress = async () => {
    const token = localStorage.getItem("token");

    const config = {
      method: "DELETE",
      url: `https://neostore-api.herokuapp.com/api/user/address/${props.address._id}`,
      headers: {
        Authorization: `${token}`,
      },
    };
    try {
      const response = await axios(config);
      load();
      toast.success("Successfully Deleted", { position: "bottom-center" });
    } catch (error) {
      toast.error("Can't Delete Address", { position: "bottom-center" });
      console.log("Error", error);
    }
  };

  const history = useHistory();
  return (
    <div
      className="container mb-3 py-2 "
      style={{ boxShadow: "0px 0px 3px 2px gray" }}
    >
      <div className="d-flex justify-content-between">
        <div>
          <p>{props.address.addressLine}</p>
          <span>{props.address.city}</span>
          <span>-</span>
          <span>{props.address.pincode}</span>
          <p>{props.address.country}</p>
        </div>

        <div>
          <i
            onClick={openModal}
            style={{ color: "red" }}
            class="fa fa-times"
          ></i>
        </div>
      </div>
      <ModalComponent
        openModal={openModal}
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
        confirmDelete={confirmDelete}
      />
      <button onClick={onClickEdit} className="btn btn-primary">
        Edit Address
      </button>

      {loading ? (
        <div className="text-center">
          <BeatLoader size={30} color="red" />
        </div>
      ) : cartLength > 0 ? (
        <button onClick={onCheckOut} className="btn btn-danger btn-block mt-2">
          Checkout
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default AddressesCard;
