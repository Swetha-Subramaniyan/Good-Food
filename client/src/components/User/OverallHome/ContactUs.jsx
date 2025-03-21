import React from "react";
import "./ContactUs.css";
import { ImFacebook2 } from "react-icons/im";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { GrLinkedin } from "react-icons/gr";
import { FaTwitterSquare } from "react-icons/fa";
import { FaYoutubeSquare } from "react-icons/fa";
import logo from "../../../assets/Foodlogo.jpg";
 
const ContactUs = () => {
  return (
    <>
      <div className="contact-last">
        <div id="contact-section">
          <div className="contact-button">
            <h1>Contact Us</h1>
          </div>
          <br /> <br />
          <div className="footer-down">
            <div className="name-foot">
              <img className="foot" src={logo} alt="food" />
              <div>
                To nourish humanity with <br /> wholesome food and spread
                <br /> the joy of well-being.
              </div>
            </div>
 
            <div className="name-foot">
              <div className="bold-word">Good Food App</div>
              <div>Terms and Conditions</div>
              <div>Privacy Policy</div>
              <div>Refund & Cancellation</div>
              <div>FAQ</div>
              <div>Our Team</div>
            </div>
 
            <div className="name-foot">
              <div className="bold-word">Get in Touch</div>
              <div>contact@goodfood.in</div>
              <div>+91 9459383445</div>
            </div>
 
            <div className="name-foot">
              <div className="bold-word">Follow us on</div>
              <div className="icon-footer">
                <div>
                  <ImFacebook2 size={24} /> <FaWhatsappSquare size={27} />
                  <FaInstagramSquare size={27} />
                </div>
                <div>
                  <GrLinkedin size={24} /> <FaTwitterSquare size={27} />
                  <FaYoutubeSquare size={27} />
                </div>
              </div>
            </div>
          </div>
          <div className="copyright-section">
            <p> Copyright &copy; Good Foods - 2025  All rights Reserved. </p>
          </div>
        </div>
      </div>
    </>
  );
};
 
export default ContactUs;