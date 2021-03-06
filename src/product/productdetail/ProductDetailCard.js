import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";
import img from "../../images/aston.jpg";
import { useHistory } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { CartContext } from "../../context/Context";
import { useContext } from "react";
import axios from "axios";
import ReactImageMagnify from "react-image-magnify";

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  PinterestShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
  PinterestIcon,
} from "react-share";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
 /**
 * @author Aakash Rajput
 * @description this method renders the details of individual product
 * @param this method takes mainImage, subImage, description,features,name,price,color,total,avgRating as props from the parent component
 * @returns returns the JSX of the individual product page
 */
function ProductDetailCard(props) {
  const { cartState, dispatch } = useContext(CartContext);
  const [starValue, setStarValue] = useState(0);
  const [rateClicked, setRateClicked] = useState(false);
  const [isZoom, setIsZoom] = useState(false);
  const [rating, setRating] = useState("");

  console.log(cartState);
  const history = useHistory();

  const addToCart = async () => {
    if (!localStorage.getItem("token")) {
      toast.info("Please Login First",{position:'top-center'});
      history.push("/login");
    } else {
      const token = localStorage.getItem("token");
      const productData = {
        productId: props.item.id,
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
        console.log(response);
        if (response.status === 200) {
          dispatch({ type: "ADD_TO_CART", payload: productData });
          toast.success("Product Added Successfully", {
            position: "bottom-center",
          });
        }
      } catch (error) {
        toast.error(error.response.data.message, { position: "bottom-center" });
      }
    }
  };

  const image = props.item.mainImage;
  const subImage1 = props.item.subImages[0];
  const subImage2 = props.item.subImages[1];

  const [mainImage, setMainImage] = useState(image);

  const changePhoto = (e) => {
    if (e.target.src === image) {
      setMainImage(image);
    } else if (e.target.src === subImage1) {
      setMainImage(subImage1);
    } else if (e.target.src === subImage2) {
      setMainImage(subImage2);
    }
  };
  const removeFromCart = () => {
    dispatch({ type: "REMOVE_FROM_CART", payload: props.item.id });
    console.log("remove cart state", cartState);
  };
  const zoomImage = () => {
    if (isZoom) setIsZoom(false);
    else setIsZoom(true);
  };

  const changeRating = (starValue) => {
    if (starValue === 1) {
      setRating("Poor");
    } else if (starValue === 2) {
      setRating("Bad");
    } else if (starValue === 3) {
      setRating("Average");
    } else if (starValue === 4) {
      setRating("Good");
    } else if (starValue === 5) {
      setRating("Excellent");
    }
  };

  
  
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6">
          <div onMouseEnter={zoomImage} onMouseLeave={zoomImage}>
          
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: `${mainImage}`,
                  width: 500,
                  height: 350,
                  src: `${mainImage}`,
                },
                largeImage: {
                  src: `${mainImage}`,
                  width: 720,
                  height: 1080,
                },
              }}
            />
          </div>
          <div className="d-flex justify-content-space-between mt-5">
            <div className="px-3 img-main">
              <img
                onClick={changePhoto}
                className="image-container"
                style={{ width: "100px", height: "50px" }}
                src={subImage1}
                alt={subImage1}
              />
            </div>
            <div className="px-3">
              <img
                onClick={changePhoto}
                className="image-container"
                style={{ width: "100px", height: "50px" }}
                src={subImage2}
                alt={subImage2}
              />
            </div>
          </div>
          <div className="py-5">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a
                  href="#description"
                  className="nav-link active"
                  data-toggle="tab"
                >
                  Description
                </a>
              </li>
              <li className="nav-item">
                <a href="#features" className="nav-link" data-toggle="tab">
                  Features
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane active" id="description">
                {props.item.description}
              </div>
              <div className="tab-pane show" id="features">
                {props.item.features}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          {isZoom ? (
            ""
          ) : (
            <>
              <h3>{props.item.name}</h3>
              <div>
                <Rating
                  name="read-only"
                  value={props.item.avgRating}
                  readOnly
                />
              </div>
              <hr></hr>
              <div>
                <h6>Price:Rs {props.item.price}</h6>
                <h6>Color: {props.item.color.name}</h6>
              </div>

              <div className="mt-5">
                <h5>
                  Share<i class="fa fa-share-alt ml-2"></i>
                </h5>
                <span>
                  <FacebookShareButton
                    url="https://www.neosofttech.com"
                    quote={"Hey check this out"}
                    hashtag="#REact"
                  >
                    <FacebookIcon
                      size={45}
                      logoFillColor="white"
                      round={true}
                    ></FacebookIcon>
                  </FacebookShareButton>
                </span>
                <span className="ml-2">
                  <WhatsappShareButton
                    url="https://www.neosofttech.com"
                    title="This is My Page"
                  >
                    <WhatsappIcon
                      size={45}
                      logoFillColor="white"
                      round={true}
                    ></WhatsappIcon>
                  </WhatsappShareButton>
                </span>
                <span className="ml-2">
                  <TwitterShareButton url="https://www.neosofttech.com">
                    <TwitterIcon
                      size={45}
                      logoFillColor="white"
                      round={true}
                    ></TwitterIcon>
                  </TwitterShareButton>
                </span>

                <span className="ml-2">
                  <EmailShareButton url="https://www.neosofttech.com">
                    <EmailIcon
                      size={45}
                      logoFillColor="white"
                      round={true}
                    ></EmailIcon>
                  </EmailShareButton>
                </span>

                <span className="ml-2">
                  <PinterestShareButton
                    url="https://www.neosofttech.com"
                    media={img}
                  >
                    <PinterestIcon
                      size={45}
                      logoFillColor="white"
                      round={true}
                    ></PinterestIcon>
                  </PinterestShareButton>
                </span>
              </div>
              <div className=" py-4">
                {cartState.some((p) => p.productId === props.item.id) ? (
                  <button onClick={removeFromCart} className="btn btn-info">
                    Remove From Cart
                  </button>
                ) : (
                  <button onClick={addToCart} className="btn btn-secondary">
                    Add To Cart
                  </button>
                )}

                <button
                  onClick={() => setRateClicked(true)}
                  className="btn btn-info ml-2"
                >
                  Rate Product
                </button>
                {rateClicked ? (
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <Typography
                      component="legend"
                      style={{ fontSize: "30px", color: "red" }}
                    >
                    {rating}
                    </Typography>
                    <Rating
                      name="simple-controlled"
                      value={starValue}
                      onChange={(event, newValue) => {
                        setStarValue(newValue);
                        changeRating(newValue)
                      }}
                      // onClick={changeRating}
                    />
                    
                  </Box>
                ) : (
                  ""
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailCard;
