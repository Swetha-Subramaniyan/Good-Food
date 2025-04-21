import React, { useEffect } from "react";
import { FaGoogle, FaTimes } from "react-icons/fa";
import { Dialog, DialogActions, DialogTitle, Button, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

import "./SignIn.css";
import goodfood from '../../../../src/assets/Goodfood.png';


const SignIn = ({ isVisible, onClose, role }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const role = params.get("role");

    console.log("roleeeeeeeeeee", role)

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("role", role)

      const pendingSubscription = localStorage.getItem("pendingSubscription");
      if (pendingSubscription) {
        localStorage.removeItem("pendingSubscription");
        navigate(`/user/Payment/${pendingSubscription}`);
      } else {
        const redirectTo = localStorage.getItem("Redirect_Link");
        if (redirectTo) {
          localStorage.removeItem("Redirect_Link");
          navigate(redirectTo);
        } else {
          if (role === "USER") {
            navigate("/user/SubscriptionCalender");
          } else {
            navigate("/admin/orderlist");
          }
        }
      }
    }
  }, [navigate, role]);

  const handleGoogleSignIn = () => {
    const backendUrl = process.env.REACT_APP_BACKEND_SERVER_URL;

    if (!backendUrl) {
      console.error("Backend URL is not set in environment variables.");
      alert("Configuration error: Backend URL is missing.");
      return;
    }

    try {
      window.location.href = `${backendUrl}/auth/google?role=${role}`;
    } catch (error) {
      console.error("Error redirecting to Google Sign-In:", error);
      alert("Failed to redirect to Google authentication.");
    }
  };

  return (
    <Dialog open={isVisible} onClose={onClose} maxWidth="xs" fullWidth     
    >
      <DialogTitle style={{ position: 'relative' }}>
        <IconButton
          onClick={onClose}   
          style={{
            position: 'absolute',
            right: '10px',
            top: '10px',
            color: 'red',
            fontSize:'1rem'
          }}
        >
          <FaTimes /> 
        </IconButton>
      </DialogTitle>

      <div className="sign-in-content" style={{padding:'1rem', paddingLeft:'2rem'}}>
        <div className="image-container">
          <img src={goodfood} alt="Good Food" className="sign-in-image" />
        </div>

        <div className="text-content">
          <Typography variant="h5" gutterBottom style={{ marginBottom: '5px', marginTop: '0rem', fontWeight: 'bold',  }}>
             Welcome to Good Foods
          </Typography>
          <Typography variant="body2" color="textSecondary" style={{ fontSize: '0.95rem', marginBottom: '15px' }}>
          Please Sign In to Subscribe
          </Typography>
        </div>
      </div>

      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<FaGoogle />}
          onClick={handleGoogleSignIn}
          style={{
            textTransform: 'none',
            fontWeight: 'bold',
            fontSize: '18px',
            marginBottom:'1.5rem',
            marginLeft:'1rem',
            marginRight:'1rem'
           
          }}
        >
          Sign in with Google
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignIn;
