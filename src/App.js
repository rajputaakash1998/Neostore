import "./App.css";
import Footer from "./footer/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header/Header";
import ForgetPassword from "./userModule/forgetPassword/ForgetPassword";
import Register from "./userModule/register/Register";

import Home from "./home/Home";
import Login from "./userModule/login/Login";
import ProductCard from "./product/ProductCard";
import Products from "./product/Products";
import ProductDetail from "./product/productdetail/ProductDetail";
import Cart from "./cartModule/Cart";

import Forgot from "./userModule/forgetPassword/Forgot";
import { useReducer } from "react";

import {
  AddressContext,
  CartContext,
  ImageContext,
  LoginContext,
  SearchContext,
} from "./context/Context";
import {
  addressReducer,
  cartReducer,
  imageReducer,
  loginReducer,
  searchReducer,
} from "./context/reducer";
import AddressPage from "./UserAccountModule/AddressPage";
import OrderPage from "./UserAccountModule/OrderPage";
import AddAddressPage from "./UserAccountModule/AddAddressPage";
import EditAddressPage from "./UserAccountModule/EditAddressPage";
import ChangePassword from "./UserAccountModule/ChangePassword";
import ProfilePage from "./UserAccountModule/ProfilePage";
import Locate from "./footer/Locate";
import Invoice from "./UserAccountModule/Invoice";
import EditProfilePage from "./UserAccountModule/EditProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import PageNotFound from "./PageNotFound";

function App() {
  const initialState = [];
  const [cartState, dispatch] = useReducer(cartReducer, initialState);
  const [addressState, addressDispatch] = useReducer(addressReducer, []);
  const [searchState, searchDispatch] = useReducer(searchReducer, "");
  const [login, loginDispatch] = useReducer(loginReducer, false);
  const [image, imageDispatch] = useReducer(imageReducer, "");

  return (
    <div>
      <CartContext.Provider value={{ cartState, dispatch }}>
        <AddressContext.Provider value={{ addressState, addressDispatch }}>
          <SearchContext.Provider value={{ searchState, searchDispatch }}>
            <LoginContext.Provider value={{ login, loginDispatch }}>
              <ImageContext.Provider value={{ image, imageDispatch }}>
                <Router>
                  <Header />
                  <Switch>
                  <Route exact path="/" component={Home} />
                    <Route exact path="/home" component={Home} />

                    <Route exact path="/login" component={Login} />
                    <Route exact path="/products" component={Products} />

                    <Route exact path="/register" component={Register} />
                    <ProtectedRoute exact path="/cart" component={Cart} />
                    <Route
                      exact
                      path="/forgotPassword"
                      component={ForgetPassword}
                    />
                    <Route exact path="/forgot" component={Forgot} />
                    <ProtectedRoute exact path="/order" component={OrderPage} />
                    <ProtectedRoute
                      exact
                      path="/address"
                      component={AddressPage}
                    />
                    <ProtectedRoute
                      exact
                      path="/addAddress"
                      component={AddAddressPage}
                    />
                    <ProtectedRoute
                      exact
                      path="/editAddress"
                      component={EditAddressPage}
                    />
                    <ProtectedRoute
                      exact
                      path="/changePassword"
                      component={ChangePassword}
                    />
                    <ProtectedRoute
                      exact
                      path="/profile"
                      component={ProfilePage}
                    />
                    <Route exact path="/loc" component={Locate} />
                    <ProtectedRoute exact path="/invoice" component={Invoice} />
                    <ProtectedRoute
                      exact
                      path="/editProfile"
                      component={EditProfilePage}
                    />

                    <Route exact path="/products/:id" component={ProductDetail} />
                    <Route exact component={PageNotFound} />
                 
                  </Switch>
                  <Footer />
                </Router>
              </ImageContext.Provider>
            </LoginContext.Provider>
          </SearchContext.Provider>
        </AddressContext.Provider>
      </CartContext.Provider>
    </div>
  );
}

export default App;
