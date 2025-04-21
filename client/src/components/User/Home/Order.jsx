import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Order.css";
import { useSidebar } from "../../Sidebar/SidebarContext";
import PaginationControls from "../../Utils/PaginationControls";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import SearchIcon from "@mui/icons-material/Search";

const Order = () => {
  const { isOpen } = useSidebar();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    entriesPerPage: 10,
    totalEntries: 0,
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/orders/userorders`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("afbkguyew", response.data.data.orders);

        if (response.data.data?.orders) {
          setOrders(response.data.data?.orders);
        }
        setFilteredOrders(response.data.data.orders);
        setPagination((prev) => ({
          ...prev,
          totalEntries: response.data.data.orders.length,
        }));
      } catch (error) {
        console.error("Error fetching user orders:", error);
      }
    };
    fetchUserOrders();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredOrders(orders);
      setPagination((prev) => ({
        ...prev,
        totalEntries: orders.length,
        currentPage: 1,
      }));
    } else {
      const filtered = orders.filter(
        (order) =>
          order.order_id.toString().includes(searchTerm) ||
          order.items.some((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          order.order_status.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOrders(filtered);
      setPagination((prev) => ({
        ...prev,
        totalEntries: filtered.length,
        currentPage: 1,
      }));
    }
  }, [searchTerm, orders]);

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

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.price);
      const quantity = parseFloat(item.quantity) || 1;
      if (isNaN(price)) return total;
      return total + price * quantity;
    }, 0);
  };

  const getSortedData = () => {
    if (!sortConfig.key) return filteredOrders;

    return [...filteredOrders].sort((a, b) => {
      if (sortConfig.key === "total_price") {
        const aValue = calculateTotalPrice(a.items);
        const bValue = calculateTotalPrice(b.items);

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      }

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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`main-content ${isOpen ? "shifted" : ""}`}>
      <div className="order-management-container">
        <div className="order-header-section">
          <h1 className="page-title">My Orders</h1>

          <div className="search-bar">
            <SearchIcon className="search-icon" />
            <input
              type="text"
              placeholder="Search ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="pagination-headers">
          <div className="entries-per-page">
            <span>Show:</span>
            <select
              value={pagination.entriesPerPage}
              onChange={(e) =>
                handleEntriesPerPageChange(Number(e.target.value))
              }
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span>entries</span>
          </div>
        </div>

        <div className="orders-table">
          <table className="styled-table">
            <thead>
              <tr>
                <th
                  className="sortable-header"
                  onClick={() => requestSort("order_date")}
                >
                  Date {getSortIcon("order_date")}
                </th>
                <th>Items</th>
                <th
                  className="sortable-header"
                  onClick={() => requestSort("meta.total_items")}
                >
                  Quantity {getSortIcon("meta.total_items")}
                </th>
                <th
                  className="sortable-header"
                  onClick={() => requestSort("total_price")}
                >
                  Total Price {getSortIcon("total_price")}
                </th>
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
                  <td>{formatDate(order.order_date)}</td>
                  <td>
                    <ul className="items-list">
                      {order.items.map((item) => (
                        <li key={item.id} className="order-item">
                          <span>{item.name}</span>{" "}
                          <span className="item-type">({item.type})</span> -{" "}
                          {isNaN(item.price) ? (
                            <span className="item-price-missing">
                              Price Not Updated
                            </span>
                          ) : (
                            <span className="item-price">₹{item.price}</span>
                          )}
                          {item.quantity > 1 && !isNaN(item.quantity) && (
                            <span className="item-quantity">
                              × {item.quantity}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{order.meta.total_items}</td>
                  <td>
                    {isNaN(calculateTotalPrice(order.items))
                      ? "-"
                      : `₹${calculateTotalPrice(order.items)}`}
                  </td>
                  <td>
                    <div
                      className={`timeline ${
                        !Array.isArray(order.status) || order.status.length <= 1
                          ? "single-item"
                          : ""
                      }`}
                    >
                      {Array.isArray(order.status) &&
                      order.status.length > 0 ? (
                        order.status.map((status, index) => (
                          <div key={status.id} className="timeline-item">
                            {order.status.length <= 1 ? (
                              <></>
                            ) : (
                              <div className="timeline-dot"></div>
                            )}
                            <div className="timeline-content">
                              <div className="status-text">
                                <span
                                  className={`status-badge ${status.status.toLowerCase()}`}
                                >
                                  {status.status.replace("_", " ")}
                                </span>
                              </div>
                              <div className="status-time">
                                {new Date(status.updatedAt)
                                  .toLocaleString("en-GB", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                  })
                                  .replace(",", " -")}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="timeline-item">
                          <div className="timeline-content">
                            <div className="status-text">
                              <span
                                className={`status-badge ${order.order_status.toLowerCase()}`}
                              >
                                {order.order_status.replace("_", " ")}
                              </span>
                            </div>
                            <div className="status-time">
                              {new Date()
                                .toLocaleString("en-GB", {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                  hour: "numeric",
                                  minute: "2-digit",
                                  hour12: true,
                                })
                                .replace(",", " -")}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
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

        {selectedOrder && (
          <div className="order-detail-modal">
            <div className="order-detail-content">
              <div className="modal-header">
                <h2>Order Details</h2>
                <button
                  className="close-modal"
                  onClick={() => setSelectedOrder(null)}
                >
                  ×
                </button>
              </div>

              <div className="order-detail-grid">
                <div className="order-summary">
                  <h3 className="section-title">Order Summary</h3>
                  <div className="summary-item">
                    <span className="summary-label">Date:</span>
                    <span className="summary-value">
                      {formatDate(selectedOrder.order_date)}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Status:</span>
                    <span
                      className={`status-badge ${selectedOrder.order_status.toLowerCase()}`}
                    >
                      {selectedOrder.order_status.replace("_", " ")}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Meal Type:</span>
                    <span className="summary-value">
                      {selectedOrder.subscription.meal_type.name}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Total Items:</span>
                    <span className="summary-value">
                      {selectedOrder.meta.total_items}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Total Price:</span>
                    <span className="summary-value">
                      {isNaN(calculateTotalPrice(selectedOrder.items))
                        ? "-"
                        : `₹${calculateTotalPrice(selectedOrder.items)}`}
                    </span>
                  </div>
                </div>

                <div className="delivery-info">
                  <h3 className="section-title">Delivery Information</h3>
                  <div className="info-item">
                    <span className="info-label">Recipient:</span>
                    <span className="info-value">
                      {selectedOrder.delivery_details.recipient_name}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Address:</span>
                    <span className="info-value">
                      {selectedOrder.delivery_details.full_address}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Phone:</span>
                    <span className="info-value">
                      {selectedOrder.delivery_details.phone}
                    </span>
                  </div>
                  {selectedOrder.delivery_details.alternate_phone && (
                    <div className="info-item">
                      <span className="info-label">Alternate Phone:</span>
                      <span className="info-value">
                        {selectedOrder.delivery_details.alternate_phone}
                      </span>
                    </div>
                  )}
                  <div className="info-item">
                    <span className="info-label">Instructions:</span>
                    <span className="info-value">
                      {selectedOrder.delivery_details.special_instructions ||
                        "None"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="order-items-section">
                <h3 className="section-title">Order Items</h3>
                <div className="items-table-container">
                  <table className="order-items-table">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className="item-name">
                              {item.name}
                              {item.description && (
                                <div className="item-description">
                                  {item.description}
                                </div>
                              )}
                            </div>
                          </td>
                          <td>{item.type}</td>
                          <td>{isNaN(item.price) ? "-" : item.price}</td>
                          <td>{item.quantity || 1}</td>
                          <td>
                            {isNaN(item.price * (item.quantity || 1))
                              ? "-"
                              : `₹${item.price * (item.quantity || 1)}`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
