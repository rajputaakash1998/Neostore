import React, { useEffect, useState } from "react";

import { NavLink} from "react-router-dom";
import { Badge } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { CartContext } from "../context/Context";
import { SearchContext } from "../context/Context";
import { useContext } from "react";
import { LoginContext } from "../context/Context";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Autosuggest from "react-autosuggest";
import { defaultTheme } from "react-autosuggest/dist/theme";
import ModalComponent from "../ModalComponent";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const useStyles = makeStyles((theme) => ({
  react_autosuggest__input: {
    width: "240px",
    height: "30px",
    padding: "10px 20px",
    fontFamily: "Helvetica, sans-serif",
    fontWeight: "300",
    fontSize: "16px",
    border: "1px solid #aaa",
    borderRadius: "4px",
    textAlign:"left"
  },
  react_autosuggest__input__focused: {
    outline: "none",
  },
  react_autosuggest__input__open: {
    borderBottomLeftRadius: "0",
    borderBottomRightRadius: "0",
  },
  react_autosuggest__suggestions_container__open: {
    display: "block",
    position: "absolute",
    top: "51px",
    width: "180px",
    border: "1px solid #aaa",
    backgroundColor: "#fff",
    fontFamily: "Helvetica, sans-serif",
    fontWeight: "300",
    fontSize: "16px",
    borderBottomLeftRadius: "4px",
    borderBottomRightRadius: "4px",
    zIndex: "2",
  
    
    
  },
  react_autosuggest__suggestions_list: {
    marginLeft: "0",
    padding: "0",
    listStyleType: "none",
   
    
    
   
  },
  react_autosuggest__suggestion: {
    cursor: "pointer",
    padding: "10px 20px",
    textAlign:"left",
    
    
  },
  react_autosuggest__suggestion__highlighted: {
    backgroundColor: "#ddd",
  },
}));

/**
 * @author Aakash Rajput
 * @description this method renders header of the application like products ,orders,home etc
 * @param this method doesn't accept any parameters
 * @returns returns the JSX of the Header bar
 */
function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const classes = useStyles();

  const history = useHistory();

  const { cartState, dispatch } = useContext(CartContext);
  const { searchState, searchDispatch } = useContext(SearchContext);

  const { login, loginDispatch } = useContext(LoginContext);

  const [badgeCount, setBadgeCout] = useState(cartState.length);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setDropdownOpen(true)
  }
  function confirmDelete() {
    onLogoutClick();
    
  }
  

  console.log("Badgecount before", badgeCount);
  console.log("Cart length Before", cartState.length);

  const fetchData = async () => {
    const response = await axios.get(
      "https://neostore-api.herokuapp.com/api/product?limit=20"
    );

    setOptions(response.data.data.docs);
  };

  const fetchCartData = async () => {
    const token = localStorage.getItem("token");
    const config = {
      method: "get",
      url: "https://neostore-api.herokuapp.com/api/cart",
      headers: {
        Authorization: `${token}`,
      },
    };

    const response = await axios(config);
    console.log(response);
    console.log(response.data.data.products);

    setBadgeCout(response.data.data.products.length);
  };

  const onLogoutClick = () => {
    loginDispatch({ type: "AUTH", payload: false });
    localStorage.removeItem("token");
    localStorage.removeItem("fname");
    localStorage.removeItem("lname");
    localStorage.removeItem("gender");
    localStorage.removeItem("mobile");
    localStorage.removeItem("email");
   
    toast("Logged Out", { type: "success", position: "bottom-center" });
    closeModal();
    dispatch({ type: "REMOVE_ALL" });
    loginDispatch({ type: "AUTH", payload: false });

    setBadgeCout(0);
    history.push("/home");
  };

  const onSearchChange = (e) => {
    let matches = [];
    let text = e.target.value;
    if (text.length > 0) {
      matches = options.filter((option) => {
        const regex = new RegExp(`${text}`, "gi");
        return option.name.match(regex);
      });
    }
    console.log("Matches", matches);
    setSuggestions(matches);
    setSearchQuery(text);
  };

  const onSearchClick = () => {
    //fetchData();
    const filteredResponse = options.filter((product) => {
      return product.name === searchQuery;
    });
    searchDispatch({ type: "SEARCH", payload: searchQuery });
    //setSearchQuery("");
    const id = filteredResponse[0].id;

    history.push(`/products/${id}`);
  };
  console.log(searchQuery);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchCartData();
    }
  }, [login, cartState, searchState]);

  console.log("Optionss", options);
  console.log("SUggestions", suggestions);
  //console.log("filtered response",filteredResponse)

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const inputProps = {
    placeholder: "Search Product",
    value: searchQuery,
    onChange: onChange,
  };
  return (
    <nav>
      <ul>
        <li className="logo">
          Neo<span className="logo-red">STORE</span>
        </li>
        <div className="itemss">
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          <li>
            <NavLink to="/order">Orders</NavLink>
          </li>
        </div>

        <li className="search-icon" onChange={onSearchChange}>
          <Autosuggest
            inputProps={inputProps}
            suggestions={suggestions}
            onSuggestionsFetchRequested={() => setSuggestions(suggestions)}
            onSuggestionsClearRequested={() => setSuggestions([])}
            getSuggestionValue={(suggestion) => suggestion.name}
            renderSuggestion={(suggestion) => <div style={{textAlign:"left",marginLeft:"0"}}>{suggestion.name}</div>}
            onSuggestionSelected={(event, { suggestion, method }) => {
              setSearchQuery(suggestion.name);
            }}
            theme={{
              ...defaultTheme,
              container: classes.react_autosuggest__container,
              input: classes.react_autosuggest__input,
              inputOpen: classes.react_autosuggest__input__open,
              inputFocused: classes.react_autosuggest__input__focused,
              suggestionsContainer:
                classes.react_autosuggest__suggestions_container,
              suggestionsContainerOpen:
                classes.react_autosuggest__suggestions_container__open,
              suggestionsList: classes.react_autosuggest__suggestions_list,
              suggestion: classes.react_autosuggest__suggestion,
              suggestionHighlighted:
                classes.react_autosuggest__suggestion__highlighted,
            }}
          />
          <label className="icon">
            <i onClick={onSearchClick} className="fa fa-search"></i>
          </label>
        </li>

        <div className="cart" onClick={onclick}>
          <div className="cartdiv">
            <NavLink
              style={{ textDecoration: "none", color: "black" }}
              to="/cart"
            >
              Cart
              <IconButton aria-label="cart">
                <Badge badgeContent={badgeCount} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </NavLink>
          </div>
        </div>

        <Dropdown
          isOpen={dropdownOpen}
          toggle={toggle}
          style={{ marginLeft: "5px", color: "white", height: "40px" }}
        >
          <DropdownToggle caret color="light">
            <i className="fa fa-user" style={{ fontSize: "24px" }}></i>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem style={{ backgroundColor: "white" }}>
              {localStorage.getItem("token") ? (
                <a
                  //  href=""
                  style={{ textDecoration: "none", color: "black" }}
                  onClick={() => openModal()}
                >
                  Logout
                </a>
              ) : (
                <NavLink
                  style={{ textDecoration: "none", color: "black" }}
                  to="/login"
                >
                  Login
                </NavLink>
              )}
            </DropdownItem>
            <DropdownItem style={{ backgroundColor: "white" }}>
              {" "}
              {localStorage.getItem("token") ? (
                ""
              ) : (
                <NavLink
                  style={{ textDecoration: "none", color: "black" }}
                  to="/register"
                >
                  Register
                </NavLink>
              )}
            </DropdownItem>
            <DropdownItem style={{ backgroundColor: "white" }}>
              {localStorage.getItem("token") ? (
                <NavLink
                  style={{ textDecoration: "none", color: "black" }}
                  to="/profile"
                >
                  Account
                </NavLink>
              ) : (
                ""
              )}
              <ModalComponent
                openModal={openModal}
                closeModal={closeModal}
                modalIsOpen={modalIsOpen}
                confirmDelete={confirmDelete}
                text="Are you sure you want to Logout?"
              />
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </ul>
    </nav>
  );
}

export default Header;
