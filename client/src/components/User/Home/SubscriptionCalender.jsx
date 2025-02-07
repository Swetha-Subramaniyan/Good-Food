// import React from 'react';
// import './SubscriptionCalender.css';
// import Checkbox from '@mui/material/Checkbox'; 
// import { pink } from '@mui/material/colors';
// const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

// const SubscriptionCalender = () => {
//   return (
//     <>
//       <div className="order-header">Subscription Details</div>
//       <div className='sub-status'> 
//       <div> <Checkbox {...label} defaultChecked /> Pending  </div>
//       <div> <Checkbox {...label} /> Cancelled  </div>
//       <div> <Checkbox
//         {...label}
//         defaultChecked
//         sx={{
//           color: pink[800],
//           '&.Mui-checked': {
//             color: pink[600],
//           },
//         }}
//       /> Delivered  </div> </div>
//       <br/> 
      
//       <div> 
//         <table className='styled-table'> 
//           <tr> 
//             <th> Date </th>
//             <th> Breakfast </th>
//             <th> Lunch </th>
//             <th> Dinner </th>  
//           </tr>
//           <tr> 
//             <td> 1-2-2024 </td>
//             <td>  <Checkbox {...label} defaultChecked />  </td>
//             <td>  <Checkbox {...label} defaultChecked />  </td>
//             <td>  <Checkbox {...label} defaultChecked /> </td>           
//           </tr>
//         </table>
//       </div>
//     </>
//   );
// };

// export default SubscriptionCalender;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./SubscriptionCalender.css";
// import Checkbox from "@mui/material/Checkbox";

// const SubscriptionCalender = () => {
//   const [userReports, setUserReports] = useState([]);
//   const [userSubscriptionId, setUserSubscriptionId] = useState(null);

//   useEffect(() => {
//     const fetchUserSubscriptionId = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           `${process.env.REACT_APP_BACKEND_SERVER_URL}/userSubscription/getUserDetails`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         const latestSubscription = response.data.userSubscriptions[0]; // Get the latest subscription
//         if (latestSubscription) {
//           setUserSubscriptionId(latestSubscription.id); // Set the correct subscription ID
//         }
//       } catch (error) {
//         console.error("Error fetching user subscription:", error);
//       }
//     };

//     fetchUserSubscriptionId();
//   }, []);

//   useEffect(() => {
//     const fetchUserReports = async () => {
//       if (!userSubscriptionId) return; // Wait until we get the subscription ID
    
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_BACKEND_SERVER_URL}/foodReport/getUserReport?user_subscription_id=${userSubscriptionId}`
//         );
//         console.log("Fetched Reports :",response.data)
//         setUserReports(response.data.reports);
//       } catch (error) {
//         console.error("Error fetching user reports:", error);
//       }
//     };
    

//     if (userSubscriptionId) {
//       fetchUserReports();
//     }
//   }, [userSubscriptionId]);

//   return (
//     <>
//       <div className="order-header">Subscription Details</div>
//       <div className="sub-status">
//         <div>
//           <Checkbox defaultChecked /> Pending
//         </div>
//         <div>
//           <Checkbox /> Cancelled
//         </div>
//         <div>
//           <Checkbox defaultChecked sx={{ color: "pink" }} /> Delivered
//         </div>
//       </div>
//       <br />

//       <div>
//         <table className="styled-table">
//           <thead>
//             <tr>
//               <th> Date </th>
//               <th> Breakfast </th>
//               <th> Lunch </th>
//               <th> Dinner </th>
//             </tr>
//           </thead>
//           <tbody>
//             {userReports.map((report) => (
//               <tr key={report.id}>
//                 <td>{new Date(report.created_at).toLocaleDateString()}</td>
//                 <td>
//                   <Checkbox defaultChecked={report.breakfast_qty > 0} />
//                 </td>
//                 <td>
//                   <Checkbox defaultChecked={report.lunch_qty > 0} />
//                 </td>
//                 <td>
//                   <Checkbox defaultChecked={report.dinner_qty > 0} />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default SubscriptionCalender;











import React, { useState, useEffect } from "react";
import "./SubscriptionCalender.css";
import Checkbox from "@mui/material/Checkbox";
import { pink } from "@mui/material/colors";
import axios from "axios";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const SubscriptionCalender = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserReports = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch the latest user subscription details
        const subResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/userSubscription/getUserDetails`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const latestSubscription =
          subResponse.data.userSubscriptions?.slice(-1)[0]; // Get last subscription

        if (!latestSubscription) {
          setError("No active subscription found.");
          return;
        }

        const user_subscription_id = latestSubscription.id;

        // Fetch user food reports based on user_subscription_id
        const reportResponse = await axios.post(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/foodReport/createReport`,
          { user_subscription_id },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setReports(reportResponse.data.reports);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch reports.");
      }
    };

    fetchUserReports();
  }, []);

  return (
    <>
      <div className="order-header">Subscription Details</div>

      {error ? <p style={{ color: "red" }}>{error}</p> : null}

      <div className="sub-status">
        <div>
          <Checkbox {...label} defaultChecked /> Pending
        </div>
        <div>
          <Checkbox {...label} /> Cancelled
        </div>
        <div>
          <Checkbox
            {...label}
            defaultChecked
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
          />
          Delivered
        </div>
      </div>
      <br />

      <div>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Breakfast</th>
              <th>Lunch</th>
              <th>Dinner</th>
            </tr>
          </thead>
          <tbody>
            {reports.length > 0 ? (
              reports.map((report, index) => (
                <tr key={index}>
                  <td>{new Date(report.created_at).toLocaleDateString()}</td>
                  <td>
                    <Checkbox {...label} defaultChecked={report.breakfast_qty > 0} />
                  </td>
                  <td>
                    <Checkbox {...label} defaultChecked={report.lunch_qty > 0} />
                  </td>
                  <td>
                    <Checkbox {...label} defaultChecked={report.dinner_qty > 0} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SubscriptionCalender;
