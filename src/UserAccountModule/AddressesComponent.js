import React, { useEffect, useState } from "react";
import AddressesCard from "./AddressesCard";
import { useHistory } from "react-router";
import axios from "axios";
import { BeatLoader } from "react-spinners";

/**
 * @author Aakash Rajput
 * @description this method fetches all the addresses from the api and render them to address acrd
 *  @param this method doesn't accept any parameter
 * @returns returns the JSX of the edit address page
 */

function AddressesComponent() {
  const history = useHistory();
  const [addresses, setAddresses] = useState([]);
  const [load, setLoad] = useState(false);

  const [loading, setLoading] = useState(false);

  const getAllAddress = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    const config = {
      method: "GET",
      url: "https://neostore-api.herokuapp.com/api/user/address",
      headers: {
        Authorization: `${token}`,
      },
    };
    try {
      const response = await axios(config);
      setLoading(false);

      setAddresses(response.data.data.address);
    } catch (error) {
      alert("Can't Load Addresses");
      console.log("Error", error);
    }
  };
  useEffect(() => {
    getAllAddress();
  }, [load]);
  console.log(addresses);

  const onLoad = () => {
    setLoad(!load);
  };
  return (
    <div
      style={{ boxShadow: "0px 0px 3px 0px gray" }}
      className="container p-2"
    >
      <h4>Addresses</h4>
      <hr></hr>
      <div>
        {loading ? (
          <div className="text-center">
            <BeatLoader size={50} color="red" />
          </div>
        ) : (
          addresses.map((address) => (
            <AddressesCard
              address={address}
              key={address._id}
              onLoad={onLoad}
            />
          ))
        )}
      </div>

      <hr></hr>
      <button
        onClick={() => history.push("/addAddress")}
        className="btn btn-secondary"
      >
        Add Address
      </button>
    </div>
  );
}

export default AddressesComponent;
