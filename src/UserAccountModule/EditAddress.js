import React, { useState } from "react";
import { AddressContext } from "../context/Context";
import { useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();


 /**
 * @author Aakash Rajput
 * @description this method is use to update the address
 * @returns returns the JSX of the edit address page
 */
function EditAddress() {
  const history = useHistory();

  const [count, setCount] = useState(0);
  const { addressState } = useContext(AddressContext);

  const [address, setAddress] = useState(addressState.addressLine);
  const [pin, setPin] = useState(addressState.pincode);
  const [city, setCity] = useState(addressState.city);
  const [state, setState] = useState(addressState.state);
  const [country, setCountry] = useState(addressState.country);

  const id = addressState.addressId;

  function handleAddressChange(e) {
    setCount(e.target.value.length);
    setAddress(e.target.value);
  }
  function handlePinChange(e) {
    setPin(e.target.value);
  }
  function handleCityChange(e) {
    setCity(e.target.value);
  }
  function handleStateChange(e) {
    setState(e.target.value);
  }
  function handleCountryChange(e) {
    setCountry(e.target.value);
  }

  const updateAddress = async () => {
    const token = localStorage.getItem("token");
    const dataObj = {
      addressLine: address,
      pincode: pin,
      city: city,
      state: state,
      country: country,
    };
    const config = {
      method: "PUT",
      url: `https://neostore-api.herokuapp.com/api/user/address/${id}`,
      headers: {
        Authorization: `${token}`,
      },
      data: dataObj,
    };
    try {
      const response = await axios(config);
      if (response.status === 200) {
        toast.success("Address Updated", { position: "top-center" });
        history.push("/address");
      }
    } catch (error) {
      toast.error(error.response.data.message, { position: "top-center" });
    }
  };
  console.log(addressState);

  return (
    <div
      style={{ boxShadow: "0px 0px 3px 0px gray" }}
      className="container py-3"
    >
      <h4>Edit Address</h4>
      <hr></hr>
      <form>
        <div class="form-row">
          <div class="form-group col-md-4">
            <textarea
              className="form-control"
              placeholder="Address"
              maxLength="100"
              onChange={handleAddressChange}
              value={address}
            />
            <div className=" text-muted">
              <span>Max 100 Character</span>
              <span className="ml-4">{count}/100</span>
            </div>
          </div>
        </div>
        <div style={{ width: "200px" }} class="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="Pincode"
            value={pin}
            onChange={handlePinChange}
          />
        </div>

        <div class="form-row">
          <div class="form-group col-md-4">
            <input
              type="text"
              class="form-control"
              placeholder="City"
              value={city}
              onChange={handleCityChange}
            />
          </div>
          <div class="form-group col-md-4">
            <input
              type="text"
              class="form-control"
              placeholder="State"
              value={state}
              onChange={handleStateChange}
            />
          </div>
        </div>
        <div style={{ width: "200px" }} class="form-group">
          <input
            class="form-control"
            type="text"
            placeholder="Country"
            value={country}
            onChange={handleCountryChange}
          />
        </div>
      </form>

      <hr></hr>
      <div>
        <button onClick={updateAddress} className="btn btn-secondary mr-2">
          <i class="fa fa-save mr-2"></i>Save
        </button>
        <button className="btn btn-secondary">
          <i class="fa fa-times mr-2"></i>Cancel
        </button>
      </div>
    </div>
  );
}

export default EditAddress;
