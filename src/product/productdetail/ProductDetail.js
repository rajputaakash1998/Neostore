import React, { useState, useEffect } from "react";

import { useParams } from "react-router";
import axios from "axios";
import ProductDetailCard from "./ProductDetailCard";
import { BeatLoader } from "react-spinners";
/**
 * @author Aakash Rajput
 * @description this method renders the data of product details page
 * @param this method doesn't take any parameter
 * @returns returns the JSX of the product details page
 */
function ProductDetail(props) {
  const [products, setProducts] = useState([]);

  const { id } = useParams();

  async function fetchProduct() {
    const response = await axios.get(
      "https://neostore-api.herokuapp.com/api/product?limit=20"
    );
    console.log("Response", response);
    setProducts(response.data.data.docs);
  }
  useEffect(() => {
    fetchProduct();
  }, []);
  console.log("products", products);

  const details = products.filter((product, index) => {
    return product._id === id;
  });
  console.log("details", details);
  console.log("This is the Id", id);
  console.log("These are the props", props);

  return (
    <div className="custom-container">
      {products.length === 0 ? (
        <div style={{ textAlign: "center" }}>
          <BeatLoader size={72} color="red" />
        </div>
      ) : (
        <div>
          {details.map((item) => {
            return <ProductDetailCard item={item} />;
          })}
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
