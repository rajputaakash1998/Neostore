import React, { useEffect, useState } from "react";



import axios from "axios";
import ProductCard from "../product/ProductCard";
import { NavLink } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import CarouselPage from "./CarouselPage";

/**
 * 
 * @author Aakash Rajput
 * @description this method is responsible for the home page is displays the data on the home page
 * @param this method doesn't accept any parameters
 * @returns this method returns the JSX of the Home page
 */

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const response = await axios.get(
      "https://neostore-api.herokuapp.com/api/product"
    );

    setProducts(response.data.data.docs);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  console.log("Products",products)
  return (
    <div className="custom-container">
      <section>
        <CarouselPage data={products} />
      </section>
      <section>
        <h2 style={{ textAlign: "center" }}>Popular Products</h2>
        <NavLink
          style={{ textDecoration: "none", color: "black" }}
          to="/products"
        >
          <h4 className="text-center">Check All Products</h4>
        </NavLink>
        <div></div>
        {loading ? (
          <div style={{ textAlign: "center" }}>
            <BeatLoader size={50} color="red" />
          </div>
        ) : (
          ""
        )}
        <div className="container" style={{marginLeft:"140px"}}>
          <div className="row">
            {products.map((item) => {
              return <ProductCard data={item} key={item.id} />;
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
