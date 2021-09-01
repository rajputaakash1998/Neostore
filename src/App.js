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

import {AddressContext, CartContext, LoginContext, SearchContext} from "./context/Context";
import {addressReducer, cartReducer, loginReducer, searchReducer} from "./context/reducer"
import AddressPage from './UserAccountModule/AddressPage';
import OrderPage from './UserAccountModule/OrderPage';
import AddAddressPage from './UserAccountModule/AddAddressPage';
import EditAddressPage from './UserAccountModule/EditAddressPage';
import ChangePassword from './UserAccountModule/ChangePassword';
import ProfilePage from './UserAccountModule/ProfilePage';
import Locate from './footer/Locate';
import Invoice from './UserAccountModule/Invoice';
import EditProfilePage from './UserAccountModule/EditProfilePage';
import ProtectedRoutes from './ProtectedRoutes';




function App() {

  const initialState=[];
  const [cartState, dispatch] = useReducer(cartReducer,initialState);
  const [addressState, addressDispatch] = useReducer(addressReducer,[]);
  const [searchState,searchDispatch]=useReducer(searchReducer,"");
  const [login, loginDispatch] = useReducer(loginReducer, false)

  return (
    <div>
      <CartContext.Provider value={{cartState,dispatch}}>
        <AddressContext.Provider value={{addressState,addressDispatch}}>
          <SearchContext.Provider value={{searchState,searchDispatch}}>
            <LoginContext.Provider value={{login,loginDispatch}}>
       <Router>
       <Header/>
      <Switch>
      <Route exact path="/"  component={Home}/>
      <Route path="/home"  component={Home}/>
      <Route exact path="/productDetail/:id"  component={ProductDetail}/>
      <Route path="/login" component={Login}/>
      <Route path="/products" component={Products}/>
      
      <Route path="/register" component={Register}/>
      <Route path="/cart" component={Cart}/>
      <Route path="/forgotPassword" component={ForgetPassword}/>
      <Route path="/forgot" component={Forgot}/>
      <Route path="/order" component={OrderPage}/>
      <Route path="/address" component={AddressPage}/>
      <Route path="/addAddress" component={AddAddressPage}/>
      <Route path="/editAddress" component={EditAddressPage}/>
      <Route path="/changePassword" component={ChangePassword}/>
      <Route path="/profile" component={ProfilePage}/>
      <Route path="/loc" component={Locate}/>
      <Route path="/invoice" component={Invoice}/>
      <Route path="/editProfile" component={EditProfilePage}/>


      </Switch>
      <Footer/>
    </Router>
    </LoginContext.Provider>
    </SearchContext.Provider>
    </AddressContext.Provider>
    </CartContext.Provider>
    </div>
    
  );
}

export default App;
