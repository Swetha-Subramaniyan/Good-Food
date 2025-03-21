// import React from 'react'
// import './MoneyTransfer.css'
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import { Link } from 'react-router-dom';

// const MoneyTransfer = () => {
//   return (
//     <>
//     <div className='paymentpage'> 
//      <div className="subscription-detailss">                            
// <div className="payment-method">
//           <div style={{fontSize:'1.5rem'}}>Select Payment Method</div>
//         </div>   
//         <br/>     
//     <FormControl>
//       <RadioGroup
//         aria-labelledby="demo-radio-buttons-group-label"
//         defaultValue="female"
//         name="radio-buttons-group">
//         <FormControlLabel value="fGoogle Pay" control={<Radio />}  label="Google Pay" sx={{ color: 'black' }} />
//         <FormControlLabel value="Phone Pay" control={<Radio />} label="Phone Pay" sx={{ color: 'black' }} />
//          <FormControlLabel value="Card" control={<Radio />} label="Card" sx={{ color: 'black' }} />
// <Link to={'/user/Home'}> 
// <div className='paycash'> 
//         <button> Pay </button>
//         </div>
//         </Link>
//       </RadioGroup>
//     </FormControl>  
//     </div> 
//     </div>
   
//     </>
//   )
// }

// export default MoneyTransfer



import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MoneyTransfer.css";

const MoneyTransfer = () => {
  const [amount, setAmount] = useState(null); // Store fetched price
  const [subscriptionId, setSubscriptionId] = useState(null); // Store Subscription ID

  useEffect(() => {
    const fetchSubscriptionAmount = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch subscription details
        const userResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/userSubscription/getUserDetails`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const subscriptions = userResponse.data.userSubscriptions;
        if (subscriptions.length === 0) {
          console.error("No subscription found");
          return;
        }

        const recentSubscription = subscriptions[subscriptions.length - 1];
        setSubscriptionId(recentSubscription.id);

        // Fetch price for that subscription ID
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/subPrice/getAmnt?id=${recentSubscription.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Extract the correct amount from the response
        const pricingDetails = data.getAmount.find(
          (item) => item.PricingDetails && item.PricingDetails.price
        );
console.log("Pricing Details",pricingDetails)
        if (pricingDetails) {
          setAmount(pricingDetails.PricingDetails.price);
        } else {
          console.error("Price not found in response");
        }
      } catch (error) {
        console.error("Error fetching subscription amount:", error);
      }
    };

    fetchSubscriptionAmount();
  }, []);

  const handlePayment = async () => {
    if (!amount) {
      alert("Amount not available");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/payment/razorPay`,
        { amount: amount * 100 }, // Convert to paisa (Razorpay uses smallest currency unit)
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!data.order) {
        console.error("Failed to create order.");
        return;
      }

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY, // Razorpay Key
        amount: data.order.amount,
        currency: "INR",
        name: "Your Company",
        description: "Payment Transaction",
        order_id: data.order.id,
        handler: function (response) {
          alert("Payment Successful!");
          console.log("Payment Response:", response);
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Error during payment:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="paymentpage">
      <div className="subscription-detailss">
        <div className="payment-method">
          <div style={{ fontSize: "1.5rem" }}>Select Payment Method</div>
        </div>
        <br />
        <div className="paycash">
          <button onClick={handlePayment}>
            Pay ₹{amount !== null ? amount : "Loading..."}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoneyTransfer;

