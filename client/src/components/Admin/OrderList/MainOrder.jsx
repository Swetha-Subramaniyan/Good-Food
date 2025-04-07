import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MainOrder.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import PaginationControls from "../AddSubscription/PaginationControls";
import { useSidebar } from "../../Sidebar/SidebarContext";


const MainAddSubscription = () => {

  const token = localStorage.getItem("token");

  const { isOpen } = useSidebar();

  const [orderDetails, setOrderDetails] = useState({
    orders: [],
    grouped_by_meal_type: {},
  });
  const [viewMode, setViewMode] = useState("chef");
  const [selectedMealType, setSelectedMealType] = useState("all");
  const [isDelivery, setIsDelivery] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    entriesPerPage: 10,
    totalEntries: 0,
  });

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


const handleChefStatusChange = async (orderId, newStatus) => {
  try {
    const response = await axios.post(
      "/api/orders/chef-status",
      { order_id: orderId, status: newStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    console.error("Error updating status:", error);
  }
};

const handleAdminStatusChange = async (orderId, newStatus, deliveryUserId) => {
  try {
    const response = await axios.post(
      "/api/orders/admin-status",
      { order_id: orderId, status: newStatus, delivery_user_id: deliveryUserId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    console.error("Error updating status:", error);
  }
};

const handleDeliveryStatusChange = async (orderId, deliveryProof) => {
  try {
    const response = await axios.post(
      "/api/orders/delivery-status",
      { order_id: orderId, status: "DELIVERED", delivery_proof: deliveryProof },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    console.error("Error updating status:", error);
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

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <ArrowUpwardIcon fontSize="small" />
    ) : (
      <ArrowDownwardIcon fontSize="small" />
    );
  };

  const getSortedData = () => {
    if (!sortConfig.key) return filteredOrders;

    return [...filteredOrders].sort((a, b) => {
      const getValue = (obj, key) => {
        if (key.includes(".")) {
          return key.split(".").reduce((o, i) => o?.[i], obj);
        }
        return obj[key];
      };

      const aValue = getValue(a, sortConfig.key);
      const bValue = getValue(b, sortConfig.key);

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };
  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const handleEntriesPerPageChange = (size) => {
    setPagination((prev) => ({
      ...prev,
      entriesPerPage: size,
      currentPage: 1,
    }));
  };

  const getPaginatedData = () => {
    const sortedData = getSortedData();
    const { currentPage, entriesPerPage } = pagination;
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    return sortedData.slice(startIndex, endIndex);
  };

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

  const currentPageOrders = getPaginatedData();
  const currentPagePending = currentPageOrders.filter(
    (o) => o.order_status === "PENDING"
  ).length;
  const currentPagePreparing = currentPageOrders.filter(
    (o) => o.order_status === "PREPARING"
  ).length;
  const currentPageDelivered = currentPageOrders.filter(
    (o) => o.order_status === "DELIVERED"
  ).length;


  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      totalEntries: filteredOrders.length,
    }));
  }, [filteredOrders]);

  return (
    <div className={`main-content ${isOpen ? "shifted" : ""}`}>
      {isDelivery ? (
        <div className="delivery-management-container">
          <h1 className="page-title">Delivery Management</h1>

          <div className="pagination-header">
            <div className="entries-per-page">
              <span>Show:</span>
              <select
                value={pagination.entriesPerPage}
                onChange={(e) =>
                  handleEntriesPerPageChange(Number(e.target.value))
                }
              >
                {[5, 10, 20, 50, 100].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <span>entries</span>
            </div>
            <div className="filter-section">
              <select
                value={selectedMealType}
                onChange={(e) => {
                  setSelectedMealType(e.target.value);
                  setPagination((prev) => ({ ...prev, currentPage: 1 }));
                }}
              >
                <option value="all">All Meal Types</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Combo">Combo</option>
              </select>
            </div>
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
                      handleDeliveryStatusChange(selectedOrder.order_id, newStatus);
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
                    <th
                      className="sortable-header"
                      onClick={() => requestSort("order_id")}
                    >
                      Order ID {getSortIcon("order_id")}
                    </th>
                    <th>Customer</th>
                    <th
                      className="sortable-header"
                      onClick={() => requestSort("subscription.meal_type.name")}
                    >
                      Meal Type {getSortIcon("subscription.meal_type.name")}
                    </th>
                    <th>Delivery Address</th>
                    <th
                      className="sortable-header"
                      onClick={() => requestSort("order_status")}
                    >
                      Status {getSortIcon("order_status")}
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {getPaginatedData().map((order) => (
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
              <PaginationControls
                currentPage={pagination.currentPage}
                totalPages={Math.ceil(
                  pagination.totalEntries / pagination.entriesPerPage
                )}
                onPageChange={handlePageChange}
                entriesPerPage={pagination.entriesPerPage}
                totalEntries={pagination.totalEntries}
                onEntriesPerPageChange={handleEntriesPerPageChange}
              />
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

          <div className="pagination-header">
            <div className="entries-per-page">
              <span>Show:</span>
              <select
                value={pagination.entriesPerPage}
                onChange={(e) =>
                  handleEntriesPerPageChange(Number(e.target.value))
                }
              >
                {[5, 10, 20, 50, 100].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <span>entries</span>
            </div>
            <div className="filter-section">
              <select
                value={selectedMealType}
                onChange={(e) => {
                  setSelectedMealType(e.target.value);
                  setPagination((prev) => ({ ...prev, currentPage: 1 }));
                }}
              >
                <option value="all">All Meal Types</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Combo">Combo</option>
              </select>
            </div>
          </div>

          {viewMode === "chef" ? (
            <div className="chef-view">
              <h2>Chef View - Meal Preparation</h2>
              <div className="orders-table">
                <table>
                  <thead>
                    <tr>
                      <th
                        className="sortable-header"
                        onClick={() => requestSort("order_id")}
                      >
                        Order ID {getSortIcon("order_id")}
                      </th>
                      <th
                        className="sortable-header"
                        onClick={() =>
                          requestSort("subscription.meal_type.name")
                        }
                      >
                        Meal Type {getSortIcon("subscription.meal_type.name")}
                      </th>
                      <th>Items</th>
                      <th
                        className="sortable-header"
                        onClick={() => requestSort("meta.total_items")}
                      >
                        Quantity {getSortIcon("meta.total_items")}
                      </th>
                      <th>Special Instructions</th>
                      <th
                        className="sortable-header"
                        onClick={() => requestSort("order_status")}
                      >
                        Status {getSortIcon("order_status")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getPaginatedData().map((order) => (
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
                <PaginationControls
                  currentPage={pagination.currentPage}
                  totalPages={Math.ceil(
                    pagination.totalEntries / pagination.entriesPerPage
                  )}
                  onPageChange={handlePageChange}
                  entriesPerPage={pagination.entriesPerPage}
                  totalEntries={pagination.totalEntries}
                  onEntriesPerPageChange={handleEntriesPerPageChange}
                />
              </div>
            </div>
          ) : (
            <div className="admin-view">
              <h2>Admin View - Delivery Management</h2>
              <div className="orders-table">
                <table>
                  <thead>
                    <tr>
                      <th
                        className="sortable-header"
                        onClick={() => requestSort("order_id")}
                      >
                        Order ID {getSortIcon("order_id")}
                      </th>
                      <th>Customer</th>
                      <th
                        className="sortable-header"
                        onClick={() =>
                          requestSort("subscription.meal_type.name")
                        }
                      >
                        Meal Type {getSortIcon("subscription.meal_type.name")}
                      </th>
                      <th>Delivery Address</th>
                      <th
                        className="sortable-header"
                        onClick={() => requestSort("order_status")}
                      >
                        Status {getSortIcon("order_status")}
                      </th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getPaginatedData().map((order) => (
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
                <PaginationControls
                  currentPage={pagination.currentPage}
                  totalPages={Math.ceil(
                    pagination.totalEntries / pagination.entriesPerPage
                  )}
                  onPageChange={handlePageChange}
                  entriesPerPage={pagination.entriesPerPage}
                  totalEntries={pagination.totalEntries}
                  onEntriesPerPageChange={handleEntriesPerPageChange}
                />
              </div>
            </div>
          )}

          <div className="stats-section">
            <div className="stat-card">
              <h3>Total Orders</h3>
              <p>{totalFilteredOrders}</p>
              <span>{pagination.entriesPerPage} per page</span>
            </div>
            <div className="stat-card">
              <h3>Pending</h3>
              <p>{pendingCount}</p>
              <span>({currentPagePending} on this page)</span>
            </div>
            <div className="stat-card">
              <h3>Out for Delivery</h3>
              <p>{preparingCount}</p>
              <span>({currentPagePreparing} on this page)</span>
            </div>
            <div className="stat-card">
              <h3>Delivered</h3>
              <p>{deliveredCount}</p>
              <span>({currentPageDelivered} on this page)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainAddSubscription;
