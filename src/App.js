import './App.css';
import Footer from './footer/Footer';
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Header from './Header/Header';
import ForgetPassword from './userModule/forgetPassword/ForgetPassword';
import Register from './userModule/register/Register';

import Home from './home/Home'
import Login from './userModule/login/Login';
import ProductCard from './product/ProductCard';
import Products from './product/Products';
import ProductDetail from './product/productdetail/ProductDetail';
import Cart from './cartModule/Cart';

import Forgot from './userModule/forgetPassword/Forgot';
import {useReducer} from "react"

import {AddressContext, CartContext, ImageContext, LoginContext, SearchContext} from "./context/Context";
import {addressReducer, cartReducer, imageReducer, loginReducer, searchReducer} from "./context/reducer"
import AddressPage from './UserAccountModule/AddressPage';
import OrderPage from './UserAccountModule/OrderPage';
import AddAddressPage from './UserAccountModule/AddAddressPage';
import EditAddressPage from './UserAccountModule/EditAddressPage';
import ChangePassword from './UserAccountModule/ChangePassword';
import ProfilePage from './UserAccountModule/ProfilePage';
import Locate from './footer/Locate';
import Invoice from './UserAccountModule/Invoice';
import EditProfilePage from './UserAccountModule/EditProfilePage';
import ProtectedRoute from './ProtectedRoute';




function App() {

  const initialState=[];
  const [cartState, dispatch] = useReducer(cartReducer,initialState);
  const [addressState, addressDispatch] = useReducer(addressReducer,[]);
  const [searchState,searchDispatch]=useReducer(searchReducer,"");
  const [login, loginDispatch] = useReducer(loginReducer, false)
  const [image, imageDispatch] = useReducer(imageReducer, "")


  return (
    <div>
      <CartContext.Provider value={{cartState,dispatch}}>
        <AddressContext.Provider value={{addressState,addressDispatch}}>
          <SearchContext.Provider value={{searchState,searchDispatch}}>
            <LoginContext.Provider value={{login,loginDispatch}}>
              <ImageContext.Provider value={{image,imageDispatch}}>
       <Router>
       <Header/>
      <Switch>
      <Route exact path="/"  component={Home}/>
      <Route path="/home"  component={Home}/>
     
      <Route path="/login" component={Login}/>
      <Route path="/products" component={Products}/>
      
      <Route path="/register" component={Register}/>
      <ProtectedRoute path="/cart" component={Cart}/>
      <Route path="/forgotPassword" component={ForgetPassword}/>
      <Route path="/forgot" component={Forgot}/>
      <ProtectedRoute path="/order" component={OrderPage}/>
      <ProtectedRoute path="/address" component={AddressPage}/>
      <ProtectedRoute path="/addAddress" component={AddAddressPage}/>
      <ProtectedRoute path="/editAddress" component={EditAddressPage}/>
      <ProtectedRoute path="/changePassword" component={ChangePassword}/>
      <ProtectedRoute path="/profile" component={ProfilePage}/>
      <Route path="/loc" component={Locate}/>
      <ProtectedRoute path="/invoice" component={Invoice}/>
      <ProtectedRoute path="/editProfile" component={EditProfilePage}/>
      <Route exact path="/productDetail/:id"  component={ProductDetail}/>

      </Switch>
      <Footer/>
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
