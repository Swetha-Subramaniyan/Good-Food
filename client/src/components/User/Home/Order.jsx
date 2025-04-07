import React from "react";
import "./Order.css";
import { useSidebar } from "../../Sidebar/SidebarContext";

const Order = () => {

  const { isOpen } = useSidebar();

  
  return (
    <div className={`main-content ${isOpen ? "shifted" : ""}`}>
      <div className="order-header"> My Orders </div>
      <br />
      <div>
        <table className="styled-table">
          <tr>
            <th> Date</th>
            <th> Item </th>
            <th> Price </th>
            <th> Quantity </th>
            <th> Total Price </th>
            <th> Status </th>
          </tr>
          <tr>
            <td> 21-01-2025</td>
            <td> Chicken Biriyani </td>
            <td> ₹120 </td>
            <td> 1 </td>
            <td> ₹120 </td>
            <td> Delivered </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Order;
