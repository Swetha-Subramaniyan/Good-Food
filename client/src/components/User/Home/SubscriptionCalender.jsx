import React, { useState, useEffect } from "react";
import "./SubscriptionCalender.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareXmark,
  faCircleCheck,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@mui/material/Tooltip";
import { faTrash, faForward } from "@fortawesome/free-solid-svg-icons";
import { useSidebar } from "../../Sidebar/SidebarContext";

const SubscriptionCalender = () => {

  const { isOpen } = useSidebar();

  const [subscription, setSubscription] = useState(null);
  const [foodData, setFoodData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchUserReports = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/foodReport/getUserFoodReport`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const { getReport } = response.data;
        const latestSubscription =
          getReport.userSubscription[getReport.userSubscription.length - 1];
        setSubscription(latestSubscription);

        const startDate = new Date(latestSubscription.start_date);
        const endDate = new Date(latestSubscription.end_date);

        const foodDetails = latestSubscription.userSubscriptionFood?.[0] || {
          breakfast_qty: 0,
          lunch_qty: 0,
          dinner_qty: 0,
        };

        const daysList = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
          const formattedDate = currentDate.toISOString().split("T")[0];
          daysList.push({
            date: formattedDate,
            breakfast: foodDetails.breakfast_qty,
            lunch: foodDetails.lunch_qty,
            dinner: foodDetails.dinner_qty,
          });
          currentDate.setDate(currentDate.getDate() + 1);
        }

        setFoodData(daysList);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch reports.");
      }
    };
    fetchUserReports();
  }, []);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = foodData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(foodData.length / rowsPerPage);

  return (
    <div className={`main-content ${isOpen ? "shifted" : ""}`}>
      <div className="sub-details">Subscription Details</div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {subscription && (
        <div className="sub-status">
          {/* <div><FontAwesomeIcon icon={faClock} size="lg" /> Pending</div>
          <div><FontAwesomeIcon icon={faSquareXmark} color="red" size="lg" /> Cancelled</div>
          <div><FontAwesomeIcon icon={faCircleCheck} color="green" size="lg" /> Delivered</div> */}
          <div >Validity Days: {subscription.validity_days}</div>
          {/* <div>Customer ID: {subscription.customer_id}</div> */}
         
        </div>
      )}
      <br />



      <table className="styled-table">
        <thead>
          <tr>
            <th>Date</th>
            {foodData.some((day) => day.breakfast > 0) && <th>Breakfast</th>}
            {foodData.some((day) => day.lunch > 0) && <th>Lunch</th>}
            {foodData.some((day) => day.dinner > 0) && <th>Dinner</th>}
            <th> Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.length > 0 ? (
            currentRows.map((day, index) => (
              <tr key={index}>
                <td>{day.date}</td>
                {day.breakfast > 0 && <td>{day.breakfast}</td>}
                {day.lunch > 0 && <td>{day.lunch}</td>}
                {day.dinner > 0 && <td>{day.dinner}</td>}
                <td>
                  
                <Tooltip title="Cancel" placement="left">
            <button style={{backgroundColor:'red'}} > <FontAwesomeIcon icon={faTrash} /> </button>
          </Tooltip> <span> 
          <Tooltip title="Skip" placement="right" >
              <button style={{backgroundColor:'dodgerblue'}} > <FontAwesomeIcon icon={faForward} /> </button>
            </Tooltip></span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No subscription data available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCalender;
