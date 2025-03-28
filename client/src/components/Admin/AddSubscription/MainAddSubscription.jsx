import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MainAddSubscription.css";
import MainSidebar from "../AdminSidebar/MainSidebar";

const MainAddSubscription = () => {
  const [orderDetails, setOrderDetails] = useState({
    orders: [],
    grouped_by_meal_type: {},
  });
  const [viewMode, setViewMode] = useState("chef");
  const [selectedMealType, setSelectedMealType] = useState("all");
  const [isDelivery, setIsDelivery] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
    }

    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/getOrderDetails`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrderDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };
    fetchOrderDetails();

    const verifyUserPosition = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/verifyUserPosition`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIsDelivery(response.data.isDelivery);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };
    verifyUserPosition();
  }, []);

  const filteredOrders =
    selectedMealType === "all"
      ? orderDetails.orders
      : orderDetails.orders.filter(
          (order) => order.subscription.meal_type.name === selectedMealType
        );

  const totalFilteredOrders = filteredOrders.length;
  const pendingCount = filteredOrders.filter(
    (o) => o.order_status === "PENDING"
  ).length;
  const preparingCount = filteredOrders.filter(
    (o) => o.order_status === "PREPARING"
  ).length;
  const deliveredCount = filteredOrders.filter(
    (o) => o.order_status === "DELIVERED"
  ).length;

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/updateOrderStatus`,
        { order_id: orderId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Refresh orders after status update
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/getOrderDetails`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrderDetails(response.data.data);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitDeliveryProof = async () => {
    if (!imagePreview || !selectedOrder) return;

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/submitDeliveryProof`,
        {
          order_id: selectedOrder.order_id,
          image: imagePreview,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Refresh orders after submission
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/admin/getOrderDetails`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrderDetails(response.data.data);
      setImagePreview(null);
      setSelectedOrder(null);
    } catch (error) {
      console.error("Error submitting delivery proof:", error);
    }
  };

  return (
    <>
      <MainSidebar />

      {isDelivery ? (
        <div className="delivery-management-container">
          <h1 className="page-title">Delivery Management</h1>

          <div className="filter-section">
            <select
              value={selectedMealType}
              onChange={(e) => setSelectedMealType(e.target.value)}
            >
              <option value="all">All Meal Types</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Combo">Combo</option>
            </select>
          </div>

          {selectedOrder ? (
            <div className="delivery-detail-view">
              <div className="customer-info-card">
                <div className="customer-header">
                  <img
                    src={selectedOrder.customer.profile_picture}
                    alt={selectedOrder.customer.name}
                    className="customer-avatar-large"
                  />
                  <div>
                    <h2>{selectedOrder.customer.name}</h2>
                    <p>{selectedOrder.customer.email}</p>
                  </div>
                </div>

                <div className="delivery-info">
                  <h3>Delivery Information</h3>
                  <p>
                    <strong>Recipient:</strong>{" "}
                    {selectedOrder.delivery_details.recipient_name}
                  </p>
                  <p>
                    <strong>Address:</strong>{" "}
                    {selectedOrder.delivery_details.full_address}
                  </p>
                  <p>
                    <strong>Phone:</strong>{" "}
                    {selectedOrder.delivery_details.phone}
                  </p>
                  {selectedOrder.delivery_details.alternate_phone && (
                    <p>
                      <strong>Alternate Phone:</strong>{" "}
                      {selectedOrder.delivery_details.alternate_phone}
                    </p>
                  )}
                  <p>
                    <strong>Special Instructions:</strong>{" "}
                    {selectedOrder.delivery_details.special_instructions ||
                      "None"}
                  </p>
                </div>

                <div className="order-items">
                  <h3>Order Items</h3>
                  <ul>
                    {selectedOrder.items.map((item) => (
                      <li key={item.id}>
                        {item.name} ({item.type}) - Qty: {item.quantity || 1}
                        {item.description && (
                          <div className="item-description">
                            {item.description}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="status-controls">
                  <h3>Update Status</h3>
                  <select
                    value={selectedOrder.order_status}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      setSelectedOrder({
                        ...selectedOrder,
                        order_status: newStatus,
                      });
                      handleStatusChange(selectedOrder.order_id, newStatus);
                    }}
                  >
                    <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                    <option value="DELIVERED">Delivered</option>
                  </select>
                </div>

                {selectedOrder.order_status === "DELIVERED" && (
                  <div className="delivery-proof">
                    <h3>Delivery Proof</h3>
                    {imagePreview ? (
                      <div className="image-preview">
                        <img src={imagePreview} alt="Delivery proof" />
                        <button onClick={handleSubmitDeliveryProof}>
                          Submit Proof
                        </button>
                        <button onClick={() => setImagePreview(null)}>
                          Change Image
                        </button>
                      </div>
                    ) : (
                      <div className="image-upload">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          capture="environment"
                        />
                        <p>Take a photo of the food at the doorstep</p>
                      </div>
                    )}
                  </div>
                )}

                <button
                  className="back-button"
                  onClick={() => setSelectedOrder(null)}
                >
                  Back to Orders
                </button>
              </div>
            </div>
          ) : (
            <div className="delivery-orders-list">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Meal Type</th>
                    <th>Delivery Address</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.order_id}>
                      <td>{order.order_id}</td>
                      <td>
                        <div className="customer-info">
                          <img
                            src={order.customer.profile_picture}
                            alt={order.customer.name}
                            className="customer-avatar"
                          />
                          <span>{order.customer.name}</span>
                        </div>
                      </td>
                      <td>{order.subscription.meal_type.name}</td>
                      <td>{order.delivery_details.full_address}</td>
                      <td>
                        <span
                          className={`status-badge ${order.order_status
                            .toLowerCase()
                            .replace("_", "-")}`}
                        >
                          {order.order_status.replace("_", " ")}
                        </span>
                      </td>
                      <td>
                        <button
                          className="view-details-btn"
                          onClick={() => setSelectedOrder(order)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="stats-section">
            <div className="stat-card">
              <h3>Total Orders</h3>
              <p>{totalFilteredOrders}</p>
            </div>
            <div className="stat-card">
              <h3>Pending</h3>
              <p>{pendingCount}</p>
            </div>
            <div className="stat-card">
              <h3>Out for Delivery</h3>
              <p>{preparingCount}</p>
            </div>
            <div className="stat-card">
              <h3>Delivered</h3>
              <p>{deliveredCount}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="order-management-container">
          <div className="header-section">
            <h1 className="page-title">Order Management</h1>
            <div className="view-toggle">
              <button
                className={`toggle-btn ${viewMode === "chef" ? "active" : ""}`}
                onClick={() => setViewMode("chef")}
              >
                Chef View
              </button>
              <button
                className={`toggle-btn ${viewMode === "admin" ? "active" : ""}`}
                onClick={() => setViewMode("admin")}
              >
                Admin View
              </button>
            </div>
          </div>

          <div className="filter-section">
            <select
              value={selectedMealType}
              onChange={(e) => setSelectedMealType(e.target.value)}
            >
              <option value="all">All Meal Types</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Combo">Combo</option>
            </select>
          </div>

          {viewMode === "chef" ? (
            <div className="chef-view">
              <h2>Chef View - Meal Preparation</h2>
              <div className="orders-table">
                <table>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Meal Type</th>
                      <th>Items</th>
                      <th>Quantity</th>
                      <th>Special Instructions</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.order_id}>
                        <td>{order.order_id}</td>
                        <td>{order.subscription.meal_type.name}</td>
                        <td>
                          <ul className="items-list">
                            {order.items.map((item) => (
                              <li key={item.id}>
                                {item.name} ({item.type})
                                {item.description && (
                                  <span className="item-description">
                                    {" "}
                                    - {item.description}
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td>
                          {order.items.reduce(
                            (total, item) => total + (item.quantity || 1),
                            0
                          )}
                        </td>
                        <td>{order.delivery_details.special_instructions}</td>
                        <td>
                          <select defaultValue={order.order_status}>
                            <option value="PENDING">Pending</option>
                            <option value="PREPARING">Preparing</option>
                            <option value="READY">Ready</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="admin-view">
              <h2>Admin View - Delivery Management</h2>
              <div className="orders-table">
                <table>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Meal Type</th>
                      <th>Delivery Address</th>
                      <th>Contact</th>
                      <th>Items Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.order_id}>
                        <td>{order.order_id}</td>
                        <td>
                          <div className="customer-info">
                            <img
                              src={order.customer.profile_picture}
                              alt={order.customer.name}
                              className="customer-avatar"
                            />
                            <div>
                              <strong>{order.customer.name}</strong>
                              <div>{order.customer.email}</div>
                            </div>
                          </div>
                        </td>
                        <td>{order.subscription.meal_type.name}</td>
                        <td>
                          <div className="address-info">
                            <strong>
                              {order.delivery_details.recipient_name}
                            </strong>
                            <div>{order.delivery_details.full_address}</div>
                          </div>
                        </td>
                        <td>
                          <div className="contact-info">
                            <div>{order.delivery_details.phone}</div>
                            {order.delivery_details.alternate_phone && (
                              <div>
                                Alt: {order.delivery_details.alternate_phone}
                              </div>
                            )}
                          </div>
                        </td>
                        <td>{order.meta.total_items}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="stats-section">
            <div className="stat-card">
              <h3>Showing</h3>
              <p>{totalFilteredOrders} orders</p>
            </div>
            <div className="stat-card">
              <h3>Pending</h3>
              <p>{pendingCount}</p>
            </div>
            <div className="stat-card">
              <h3>In Progress</h3>
              <p>{preparingCount}</p>
            </div>
            <div className="stat-card">
              <h3>Completed</h3>
              <p>{deliveredCount}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainAddSubscription;
