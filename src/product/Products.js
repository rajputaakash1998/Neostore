import React, { useState, useEffect } from "react";
import Pagination from "../pagination/Pagination";
import ProductCard from "./ProductCard";
import axios from "axios";

import { BeatLoader } from "react-spinners";
import { SearchContext } from "../context/Context";

import { ImageContext } from "../context/Context";
import { useContext } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
 /**
 * @author Aakash Rajput
 * @description this method fetches the products data from the api and the renders individual product
 * @returns returns the JSX of the products page
 */
function Products() {
  const { image } = useContext(ImageContext);

  const { searchState, searchDispatch } = useContext(SearchContext);

  const [data, setData] = useState([]);

  const [color, setColor] = useState([]);
  const [category, setCateory] = useState([]);

  const [sort, setSort] = useState("");

  const [fetchByColor, setFetchByColor] = useState("");
  const [fetchByCategory, setFetchByCategory] = useState("");
  const [fetchByOrder, setFetchByOrder] = useState("");
  const [fetchBySort, setFetchBySort] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPerPage] = useState(6);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  const onImageClick = () => {
    if (image === "Table") setFetchByCategory("6065c425f45ada6429eb42c9");
    else if (image === "Sofa") setFetchByCategory("6065c3a524fe1963df4f2d16");
    else if (image === "Bed") setFetchByCategory("6065c425f45ada6429eb42c7");
    else if (image === "Cupboard")
      setFetchByCategory("6065c425f45ada6429eb42c7");
  };

  const listCategory = async () => {
    const response = await axios.get(
      "https://neostore-api.herokuapp.com/api/category"
    );
    console.log(response);
    setCateory(response.data.data);
  };

  const listColor = async () => {
    const response = await axios.get(
      "https://neostore-api.herokuapp.com/api/color"
    );
    console.log(response);
    setColor(response.data.data);
    console.log("color", color);
  };

  const onCategoryChange = (e) => {
    console.log("Select", e.target.value);
    if (e.target.value === "select") {
      setFetchByCategory("");
    } else {
      searchDispatch({ type: "SEARCH", payload: "" });
      console.log(e.target.value);
      setFetchByCategory(e.target.value);
    }
  };
  const onColorChange = (e) => {
    if (e.target.value === "select") {
      setFetchByColor("");
    } else {
      searchDispatch({ type: "SEARCH", payload: "" });
      console.log(e.target.value);
      setFetchByColor(e.target.value);
    }
  };

  const onSortChange = (e) => {
    searchDispatch({ type: "SEARCH", payload: "" });
    setSort(e.target.value);
    if (e.target.value === "rating high to low") {
      setFetchBySort("rating");
      setFetchByOrder("desc");
    } else if (e.target.value === "rating low to high") {
      setFetchBySort("rating");
      setFetchByOrder("asc");
    } else if (e.target.value === "low to high") {
      setFetchBySort("price");
      setFetchByOrder("asc");
    } else if (e.target.value === "high to low") {
      setFetchBySort("price");
      setFetchByOrder("desc");
    }

  };

  const fetchData = async () => {
    setLoading(true);
    if (searchState) {
      
      let url = "https://neostore-api.herokuapp.com/api/product?limit=20";
      const response = await axios.get(url);
      setLoading(false);

      const filteredResponse = response.data.data.docs.filter((product) => {
        return product.name === searchState;
      });
      setData(filteredResponse);
    } else {
      let url = "https://neostore-api.herokuapp.com/api/product?limit=20";

      if (fetchByCategory !== "" || fetchByCategory !== "Select") {
        url = url + `&category=${fetchByCategory}`;
      }
      if (fetchByColor !== "") {
        url = url + `&color=${fetchByColor}`;
      }
      if (fetchBySort !== "") {
        url = url + `&sortby=${fetchBySort}&orderby=${fetchByOrder}`;
      }
      console.log(url);
      const response = await axios.get(url);
      setLoading(false);
      console.log("This is Api response", response);
      setData(response.data.data.docs);
      console.log(data.length);
    }
  };
  const allProducts = () => {
    setFetchByCategory("");
    setFetchByColor("");
    setFetchBySort("");
    setFetchByOrder("");
    setSort("");
    searchDispatch({ type: "SEARCH", payload: "" });
  };

  useEffect(() => {
    fetchData();
    listCategory();
    listColor();
  }, [fetchByColor, fetchByOrder, fetchBySort, fetchByCategory, searchState]);

  useEffect(() => {
    onImageClick();
  }, [image]);

  useEffect(() => {
    fetchData();
  }, [searchState]);

  console.log("Fitered Product", data);

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };
  console.log("searchState", searchState);
  console.log("category", category);
  console.log("Image", image);

  console.log(data);
  console.log(color);
  console.log(category);
  console.log(fetchByOrder);
  console.log(fetchBySort);
  console.log("category", fetchByCategory);
  console.log("color", fetchByColor);
  return (
    <div className="m-4">
      <div className="row ">
        <div className="col-md-3">
          <div className="container  d-flex flex-column">
            <button className="btn btn-dark mt-3" onClick={allProducts}>
              All Products
            </button>

            <label className="form-label">
              Category
              <select
                className="form-control custom-select"
                value={fetchByCategory}
                onChange={onCategoryChange}
              >
                <option value="select"> Select</option>
                <i
                  className="fa fa-caret-down"
                  style={{ fontSize: "30px" }}
                ></i>
                {category.map((category) => {
                  return <option value={category.id}>{category.name}</option>;
                })}
              </select>
            </label>
            <label className="form-label">
              Color
              <select
                className="form-control custom-select"
                value={fetchByColor}
                onChange={onColorChange}
              >
                <option value="select">Select</option>
                {color.map((color) => {
                  return <option value={color.id}>{color.name}</option>;
                })}
              </select>
            </label>

            <label className="form-label">
              Order by
              <select
                className="form-control custom-select"
                value={sort}
                onChange={onSortChange}
              >
                <option value="select">Select</option>
                <option value="rating high to low">Highest Rated</option>
                <option value="rating low to high">Lowest Rated</option>
                <option value="low to high">Lowest Price</option>
                <option value="high to low">Highest Price</option>
              </select>
            </label>
          </div>
        </div>

        <div className="col-md-9">
          <div className="container">
            {loading ? (
              <div style={{ textAlign: "center" }}>
                <BeatLoader size={72} color="red" />
              </div>
            ) : (
              ""
            )}
            <div className="row">
              {data.slice(pagination.start, pagination.end).map((item) => (
                <ProductCard data={item} key={item.id} />
              ))}
            </div>
            <Pagination
              total={data.length}
              showPerPage={showPerPage}
              onPaginationChange={onPaginationChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
