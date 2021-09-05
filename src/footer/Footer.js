import React from "react";
import { NavLink } from "react-router-dom";
/**
 * @author Aakash Rajput
 * @description this method renders footer of the application
 * @returns returns the JSX of the footer bar
 */
function Footer() {
  return (
    <div className="footer-container row">
      <div className="col-md-4">
        <h2>About Company</h2>
        <a href="#">Neosoft Technologies</a>
        <br />
        <a href="#">Contact Information</a>
        <br />
        <a href="#">Email : conatct@neosofttech.com</a>
        <br />
        <a href="#">Phone : +91 22 40500600</a>
        <br />
        <a href="#">MUMBAI, INDIA</a>
        <br />
      </div>

      <div className="col-md-4">
        <h2>Information</h2>
        <a href="#">Terms and Conditions Gaurntee and Return Policy</a>
        <br />
        <a href="#">Contact Us</a>
        <br />
        <a href="#">Privacy Policy</a>
        <br />
        <NavLink to="loc">Locate Us</NavLink>
        <br />
      </div>

      <div className="col-md-4">
        <h2>Newsletter</h2>
        <p>Signup to our newsletter</p>
        <input type="email" placeholder="Enter your Email" id="footer-email" />
        <input
          style={{ marginLeft: "5px" }}
          type="submit"
          value="Subscribe"
          id="footer-email-btn"
        />
      </div>
    </div>
  );
}

export default Footer;
