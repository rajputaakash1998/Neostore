import React from 'react'
import { NavLink } from 'react-router-dom'


function Footer() {
    return (
        <div className="footer-container row">
            {/* <div className="footer">
                <div className="footer-heading footer-1">
                    <h2>About Company</h2>
                    <a href="#">Neosoft Technologies</a>
                    <a href="#">Contact Information</a>
                    <a href="#">Email : conatct@neosofttech.com</a>
                    <a href="#">Phone : +91 22 40500600</a>
                    <a href="#">MUMBAI, INDIA</a>
                </div>
                <div className="footer-heading footer-2">
                    <h2>Information</h2>
                    <a href="#">Terms and Conditions Gaurntee and Return Policy</a>
                    <a href="#">Contact Us</a>
                    <a href="#">Privacy Policy</a>
                    <NavLink to="loc">Locate Us</NavLink>
                   
                </div>
               
                <div className="footer-email-form">
                    <h2>Newsletter</h2>
                    <p>Signup to our newsletter</p>
                    <input type="email" placeholder="Enter your Email" id="footer-email"/>
                    <input type="submit" value ="Subscribe" id="footer-email-btn"/>
                </div>
                <p>Copyright 2021 @ NeoSoft Technologies</p>
            </div> */}
            <div className="col-md-4">
            <h2>About Company</h2>
                    <a href="#">Neosoft Technologies</a><br/>
                    <a href="#">Contact Information</a><br/>
                    <a href="#">Email : conatct@neosofttech.com</a><br/>
                    <a href="#">Phone : +91 22 40500600</a><br/>
                    <a href="#">MUMBAI, INDIA</a><br/>
            </div>

            <div className="col-md-4">
            <h2>Information</h2>
                    <a href="#">Terms and Conditions Gaurntee and Return Policy</a><br/>
                    <a href="#">Contact Us</a><br/>
                    <a href="#">Privacy Policy</a><br/>
                    <NavLink to="loc">Locate Us</NavLink><br/>
            </div>

            <div className="col-md-4">
            <h2>Newsletter</h2>
                    <p>Signup to our newsletter</p>
                    <input type="email" placeholder="Enter your Email" id="footer-email"/>
                    <input style={{marginLeft:"5px"}} type="submit" value="Subscribe" id="footer-email-btn"/>
            </div>

        </div>
    )
}

export default Footer
