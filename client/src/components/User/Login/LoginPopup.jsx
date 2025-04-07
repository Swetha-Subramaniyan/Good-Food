import React, { useEffect, useState } from "react";
import "./LoginPopup.css";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPopup = ({ onClose }) => {
  const navigate = useNavigate();

  const landingPage = () => {
    navigate("/user/OverallHome");
  };

  const [customerId, setCustomerId] = useState("Fetching...");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const role = urlParams.get("role");
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    
    console.log("Token : ", role, token);
  }, []);

  useEffect(() => {
    const fetchCustomerID = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found in localStorage.");
          setCustomerId("Token not available");
          return;
        }

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/getID`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCustomerId(response.data.getID[0]?.customer_id || "Not Found");
      } catch (error) {
        console.error(
          "Error fetching customer ID:",
          error.response?.data || error.message
        );
        setCustomerId("Error Fetching ID");
      }
    };

    fetchCustomerID();
  }, []);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setErrorMessage("Token not found.");
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/phone/createPhone`,
        {
          phone_number: phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage(response.data.message);
      setPhoneNumber("");
      alert("Phone number created successfully!");

      navigate("/user/OverallHome");
    } catch (error) {
      setErrorMessage(
        error.response?.data.error || "Failed to create phone number"
      );
      console.error("Error submitting phone number:", error);
    }
  };

  return (
    <div className="pop">
      <button className="close-btn" onClick={onClose}>
        <FaTimes />
      </button>
      <h2 onClick={landingPage} className="login">
        Sign In
      </h2>
      <div>
        <label>Customer ID</label>
        <input value={customerId} readOnly />
      </div>
      <br />
      <div>
        <label>Phone Number</label>
        <input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter your phone number"
        />
      </div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <button onClick={handleSubmit} className="submit-btn">
        Submit
      </button>
    </div>
  );
};
export default LoginPopup;
