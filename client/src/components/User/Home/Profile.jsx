
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import './Profile.css'
// import MainUserSidebar from "../UserSidebar/MainUserSidebar";

// const Profile = () => {
//   const [userDetails, setUserDetails] = useState(null);
//   const [userAddresses, setUserAddresses] = useState([]);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
//   };

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           console.error("No token found.");
//           return;
//         }

//         // Fetch all user details and addresses from the new route
//         const response = await axios.get(
//           `${process.env.REACT_APP_BACKEND_SERVER_URL}/adrress/getNO`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         console.log("User Details and Addresses Fetched:", response.data);

//         // Extract user details
//         let subscriptions = response.data.userSubscriptions || [];
//         if (subscriptions.length > 0) {
//           subscriptions.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//           setUserDetails(subscriptions[0]);
//         } else {
//           setUserDetails(null);
//         }

//         // Extract addresses
//         setUserAddresses(response.data.getUser || []);
//       } catch (error) {
//         console.error("Error fetching user details or addresses:", error);
//       }
//     };

//     fetchUserDetails();
//   }, []);

//   const userAddress = userAddresses[0] || {};

//   return (
//     <>
//     <MainUserSidebar/>
     
//         <div className="form-container">
//           <h2>My Profile</h2>
//           <br />
//           <form>
//             <div className="subscription-details">
//               <div className="form-group">
//                 <label>Name:</label>
//                 <span>{userAddress?.name || "N/A"}</span>
//               </div>

//               <div className="form-group">
//                 <label>Email ID:</label>
//                 <span>{userAddress?.email || "N/A"}</span>
//               </div>

//               <div className="form-group">
//                 <label>Phone Number:</label>
//                 <span>{userAddress?.phone_number || "N/A"}</span>
//               </div>

//               {userAddresses.length > 0 && (
//                 <>
//                   <h3>Delivery Addresses</h3>
//                   {userAddresses.map((address, index) => (
//                     <div key={index} className="address-box">
//                       <div className="form-group">
//                         <label>Delivery Address {index + 1}:</label>
//                         <span>{address.landmark}, {address.street}, {address.city}, {address.pincode}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </>
//               )}

//               <div className="form-group">
//                 <label>Customer ID:</label>
//                 <span>{userDetails?.customer_id || "N/A"}</span>
//               </div>
//               <div className="form-group">
//                 <label>Subscription Plan:</label>
//                 <span>{userDetails?.Subscription?.parentPlan1?.plan_name || "N/A"}</span>
//               </div>
//               <div className="form-group">
//                 <label>Meal Type:</label>
//                 <span>{userDetails?.Subscription?.TierSub?.type || "N/A"}</span>
//               </div>
//               <div className="form-group">
//                 <label>Subscription Days:</label>
//                 <span>{userDetails?.Subscription?.DurationSubs?.actual_days || "N/A"} Days</span>
//               </div>
//               <div className="form-group">
//                 <label>Price:</label>
//                 <span>₹{userDetails?.Subscription?.PricingDetails?.price || "N/A"}</span>
//               </div>
//               <div className="form-group">
//                 <label>Start Date:</label>
//                 <span>{userDetails ? formatDate(userDetails.start_date) : "N/A"}</span>
//               </div>
//               <div className="form-group">
//                 <label>End Date:</label>
//                 <span>{userDetails ? formatDate(userDetails.end_date) : "N/A"}</span>
//               </div>
//               <div className="form-group">
//                 <label>Validity:</label>
//                 <span>{userDetails?.validity_days || "N/A"} Days</span>
//               </div>
//             </div>
//             <br />
//             <div className="subscription-details">
//               <div className="payment-method">
//                 <h4 style={{ fontWeight: "bold" }}>Refer Your Friend and Get Discount</h4>
//               </div>
//             </div>
//           </form>
//         </div>
     
//     </>
//   );
// };

// export default Profile;








import React from "react";
import MainUserSidebar from "../UserSidebar/MainUserSidebar";
import './Profile.css';
import Box from '@mui/material/Box';

const Profile = () => {
  return (
    <>
   
      <MainUserSidebar />
      <div className="Profile-backgrd"> 
      <h2 className="profile-name">Profile</h2>
    
      <form className="form-contaainer" >
        <div className="form-group">
          <label>Name</label>
          <input type="text" placeholder="Enter your Name" />
        </div>

        <div className="form-group">
          <label>Email Id</label>
          <input type="email" placeholder="Enter your Email Id" />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input type="number" placeholder="Enter your Number" />
        </div>

        <div className="form-group">
          <label>Customer ID</label>
          <input />
        </div>

        <div className="form-group">
          <label>Subscription Plan</label>
          <input />
        </div>

        <div className="form-group">
          <label>Meal Type</label>
          <input />
        </div>

        <div className="form-group">
          <label>Subscription Days</label>
          <input />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input />
        </div>

        <div className="form-group">
          <label>Start Date</label>
          <input type="date" />
        </div>

        <div className="form-group">
          <label>End Date</label>
          <input type="date" />
        </div>

        <div className="form-group">
          <label>Validity Days</label>
          <input />
        </div>

    <Box component="section" sx={{ p: 1, border: '2px dashed dodgerblue'}}>
        <h4 className="refer"> Refer Your Friend and Get Discount </h4>
    </Box>

      </form>
      </div>
     
    </>
  );
};

export default Profile;
