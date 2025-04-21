import React, { useState } from "react";
import logo from '../../../assets/Goodfood.png'
import "./LandingPage.css";
import { FaListCheck } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa";
import { PiCertificateBold } from "react-icons/pi";
import { PiChefHatBold } from "react-icons/pi";
import SignIn from "./SignIn";
import Header from "./Header";
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';

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
            <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleLogin("USER")}
            >
              Login
            </Button>
            {/* <Button
              variant="contained"
              color="primary"
              onClick={() => handleLogin("ADMIN")}
            >
              Admin Login
            </Button> */}
          </Stack>
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
          <div style={{ backgroundColor: "rgb(241, 102, 52)" }}>
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
          <div style={{ backgroundColor: "#6b3135" }}>
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
