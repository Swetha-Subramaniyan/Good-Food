import React, { useState } from "react";
import logo from '../../../assets/Goodfood.png'
import "./LandingPage.css";
import { FaListCheck } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa";
import { PiCertificateBold } from "react-icons/pi";
import { PiChefHatBold } from "react-icons/pi";
import SignIn from "./SignIn";
import Header from "./Header";

const LandingPage = () => {

  const [isSignInVisible, setIsSignInVisible] = useState(false);
  const [role, setRole]= useState("");

  const handleCloseSignIn = () => {
    setIsSignInVisible(false);
  };

  const handleLogin = (roles) => {
    setIsSignInVisible(true);
    setRole(roles)
  };


 

  return (
    <>
      <section className="landing-header">
        <Header/>
        <div className="logo-pic">
          <img className="header-img" src={logo} alt="food" />
        </div>

        <div className="signing-in">
          <button className="login-button user-button" onClick={()=>handleLogin("USER")}>
            User Login
          </button>
          <button className="login-button admin-button" onClick={()=>handleLogin("ADMIN")}>
            Admin Login
          </button>
          {isSignInVisible && (
            <SignIn isVisible={isSignInVisible} onClose={handleCloseSignIn} role={role}  />
          )}
        </div>

        <div className="home-header">
          <h1 className="food-delivery">
            Freshly Made Home Cuisine
            <br /> Food Delivery Platform!
          </h1>
        </div>

        <div className="register">
          <div style={{ backgroundColor: "coral" }}>
            <FaListCheck /> 5.5L+ <span> Successful Orders </span>
          </div>
          <div>
            <FaDownload /> 3.5L+ <span>Registered Customers </span>
          </div>
        </div>

        <div className="regi">
          <div>
            <PiCertificateBold size={25} /> 5.5L+{" "}
            <span> Certified License </span>
          </div>
          <div style={{ backgroundColor: "orange" }}>
            <PiChefHatBold size={25} /> 3.5L+ <span> Sellers </span>
          </div>
        </div>

        <SignIn isVisible={isSignInVisible} onClose={handleCloseSignIn} role={role}  />
        {/* {isUpdateVisible && <UpdateComponent onClose={closeUpdatePopup} />} */}
      </section>
    </>
  );
};

export default LandingPage;
