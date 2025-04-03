import React, { useEffect } from "react";
import "./SignIn.css";
import { FaGoogle } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
 
const SignIn = ({ isVisible, onClose, role }) => {
  console.log(isVisible);
  const navigate = useNavigate();

  useEffect(() => {
    
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      const pendingSubscription = localStorage.getItem("pendingSubscription");
      if (pendingSubscription) {
        localStorage.removeItem("pendingSubscription");
        navigate(`/user/Payment/${pendingSubscription}`);
      } else {
        const redirectTo = localStorage.getItem("Redirect_Link");
        if(redirectTo){
        localStorage.removeItem("Redirect_Link"); 
        navigate(redirectTo);
        }else{
          if(role === "USER"){
          navigate('/user/SubscriptionCalender')
          }else{
            navigate('/admin/addsubscription')
          }
        }
      }
    }
  }, [navigate]);

  if (!isVisible) return null;

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
    <div className="sign-in-modal">
      <div className="sign-in-content">
        <button className="close-bttnn" onClick={onClose}>
          X
        </button>
        <h3 className="sigin"> Please Sign In to Subscribe </h3>
        <div className="sign-google">
          <button onClick={handleGoogleSignIn}>
            <FaGoogle /> Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
