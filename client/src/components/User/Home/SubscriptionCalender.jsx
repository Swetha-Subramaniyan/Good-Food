

















// import React, { useState, useEffect } from "react";
// import "./SubscriptionCalender.css";
// import Checkbox from "@mui/material/Checkbox";
// import { pink } from "@mui/material/colors";
// import axios from "axios";

// const label = { inputProps: { "aria-label": "Checkbox demo" } };

// const SubscriptionCalender = () => {
//   const [reports, setReports] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserReports = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         // Fetch the latest user subscription details
//         const subResponse = await axios.get(
//           `${process.env.REACT_APP_BACKEND_SERVER_URL}/userSubscription/getUserDetails`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         const latestSubscription =
//           subResponse.data.userSubscriptions?.slice(-1)[0]; // Get last subscription

//         if (!latestSubscription) {
//           setError("No active subscription found.");
//           return;
//         }

//         const user_subscription_id = latestSubscription.id;

//         // Fetch user food reports based on user_subscription_id
//         const reportResponse = await axios.post(
//           `${process.env.REACT_APP_BACKEND_SERVER_URL}/foodReport/createReport`,
//           { user_subscription_id },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         setReports(reportResponse.data.reports);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch reports.");
//       }
//     };

//     fetchUserReports();
//   }, []);

//   return (
//     <>
//       <div className="order-header">Subscription Details</div>

//       {error ? <p style={{ color: "red" }}>{error}</p> : null}

//       <div className="sub-status">
//         <div>
//           <Checkbox {...label} defaultChecked /> Pending
//         </div>
//         <div>
//           <Checkbox {...label} /> Cancelled
//         </div>
//         <div>
//           <Checkbox
//             {...label}
//             defaultChecked
//             sx={{
//               color: pink[800],
//               "&.Mui-checked": {
//                 color: pink[600],
//               },
//             }}
//           />
//           Delivered
//         </div>
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
//             {reports.length > 0 ? (
//               reports.map((report, index) => (
//                 <tr key={index}>
//                   <td>{new Date(report.created_at).toLocaleDateString()}</td>
//                   <td>
//                     <Checkbox {...label} defaultChecked={report.breakfast_qty > 0} />
//                   </td>
//                   <td>
//                     <Checkbox {...label} defaultChecked={report.lunch_qty > 0} />
//                   </td>
//                   <td>
//                     <Checkbox {...label} defaultChecked={report.dinner_qty > 0} />
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" style={{ textAlign: "center" }}>
//                   No reports found.
//                 </td>
//               </tr>
//             )}
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
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserReports = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/foodReport/getUserReport`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        console.log("Fetched Reports:", response.data.reports);
        setReports(response.data.reports);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch reports.");
      }
    };

    fetchUserReports();
  }, []);

  const formatQuantity = (breakfast, lunch, dinner, type) => {
    switch (type) {
      case "breakfast": return breakfast > 0 ? 1 : 0;
      case "lunch": return lunch > 0 ? 1 : 0;
      case "dinner": return dinner > 0 ? 1 : 0;
      default: return 0;
    }
  };

  return (
    <>
      <div className="order-header">Subscription Details</div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="sub-status">
        <div><FontAwesomeIcon icon={faClock} size="lg" /> Pending</div>
        <div><FontAwesomeIcon icon={faSquareXmark} color="red" size="lg" /> Cancelled</div>
        <div><FontAwesomeIcon icon={faCircleCheck} color="green" size="lg" /> Delivered</div>
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
                  <td>{new Date(report.ordered_date).toLocaleDateString()}</td>
                  <td>{formatQuantity(report.breakfast_qty, 0, 0, "breakfast")}</td>
                  <td>{formatQuantity(0, report.lunch_qty, 0, "lunch")}</td>
                  <td>{formatQuantity(0, 0, report.dinner_qty, "dinner")}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>No reports found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SubscriptionCalender;





