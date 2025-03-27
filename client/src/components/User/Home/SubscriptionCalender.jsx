
// import React, { useState, useEffect } from "react";
// import "./SubscriptionCalender.css";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSquareXmark, faCircleCheck, faClock } from "@fortawesome/free-solid-svg-icons";

// const SubscriptionCalender = () => {
//   const [reports, setReports] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserReports = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const response = await axios.get(
//           `${process.env.REACT_APP_BACKEND_SERVER_URL}/foodReport/getUserFoodReport`,
//           {
//             headers: { Authorization: `Bearer ${token}` }
//           }
//         );

//         console.log("Fetched Reports:", response.data);
//         setReports(response.data);
//       } catch (err) {
//         setError(err.response?.data?.error || "Failed to fetch reports.");
//       }
//     };

//     fetchUserReports();
//   }, []);

 

//   return (
//     <>
//       <div className="order-header">Subscription Details</div>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <div className="sub-status">
//         <div><FontAwesomeIcon icon={faClock} size="lg" /> Pending</div>
//         <div><FontAwesomeIcon icon={faSquareXmark} color="red" size="lg" /> Cancelled</div>
//         <div><FontAwesomeIcon icon={faCircleCheck} color="green" size="lg" /> Delivered</div>
//       </div>
//       <br />

//       <div>
//         <table className="styled-table">
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Breakfast</th>
//               <th>Lunch</th>
//               <th>Dinner</th>
//             </tr>
//           </thead>
//           <tbody>
           
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default SubscriptionCalender;

import React, { useState, useEffect } from "react";
import "./SubscriptionCalender.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark, faCircleCheck, faClock } from "@fortawesome/free-solid-svg-icons";

const SubscriptionCalender = () => {
  const [subscription, setSubscription] = useState(null);
  const [foodData, setFoodData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserReports = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/foodReport/getUserFoodReport`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("Fetched Reports:", response.data);
        const { getReport } = response.data;

        // Get the latest subscription
        const latestSubscription = getReport.userSubscription[getReport.userSubscription.length - 1];
        setSubscription(latestSubscription);
        console.log("Latest Subscription:", latestSubscription);

        // Extract subscription details
        const startDate = new Date(latestSubscription.start_date);
        const endDate = new Date(latestSubscription.end_date);

        // Extract food details (or set default values)
        const foodDetails = latestSubscription.userSubscriptionFood?.[0] || { 
          breakfast_qty: 0, 
          lunch_qty: 0, 
          dinner_qty: 0 
        };

        // Generate rows from start_date to end_date
        const daysList = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
          const formattedDate = currentDate.toISOString().split("T")[0];

          daysList.push({
            date: formattedDate,
            breakfast: foodDetails.breakfast_qty,
            lunch: foodDetails.lunch_qty,
            dinner: foodDetails.dinner_qty
          });

          // Move to the next day
          currentDate.setDate(currentDate.getDate() + 1);
        }

        setFoodData(daysList);

      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch reports.");
      }
    };

    fetchUserReports();
  }, []);

  return (
    <>
      <div className="order-header">Subscription Details</div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {subscription && (
        <div className="sub-status">
          <div><FontAwesomeIcon icon={faClock} size="lg" /> Pending</div>
          <div><FontAwesomeIcon icon={faSquareXmark} color="red" size="lg" /> Cancelled</div>
          <div><FontAwesomeIcon icon={faCircleCheck} color="green" size="lg" /> Delivered</div>
          <div>Validity Days : {subscription.validity_days}</div>
          <div>Customer ID: {subscription.customer_id}</div>
        </div>
      )}

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
            {foodData.length > 0 ? (
              foodData.map((day, index) => (
                <tr key={index}>
                  <td>{day.date}</td>
                  <td>{day.breakfast}</td>
                  <td>{day.lunch}</td>
                  <td>{day.dinner}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No subscription data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SubscriptionCalender;


